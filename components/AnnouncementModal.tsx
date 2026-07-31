"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X } from "lucide-react";
import announcements from "@/data/announcements.json";

const AUTO_DISMISS_MS = 8000;
const STORAGE_KEY = "csst-seen-announcements";

type Announcement = {
  id: string;
  text: string;
  link?: string;
  linkLabel?: string;
  expires?: string;
};

function getActive(): Announcement[] {
  const now = new Date();
  return (announcements as Announcement[]).filter((a) =>
    !a.expires || new Date(a.expires) >= now
  );
}

// ── Rocket SVG ─────────────────────────────────────────────────────────────
function RocketIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      {/* Body */}
      <path d="M24 4C24 4 14 14 14 26H34C34 14 24 4 24 4Z" fill="currentColor" opacity="0.9" />
      {/* Nose cone */}
      <path d="M20 10C20 10 24 4 24 4C24 4 28 10 28 10H20Z" fill="currentColor" />
      {/* Wings */}
      <path d="M14 26L8 34H14V26Z" fill="currentColor" opacity="0.6" />
      <path d="M34 26L40 34H34V26Z" fill="currentColor" opacity="0.6" />
      {/* Bottom nozzle */}
      <rect x="20" y="33" width="8" height="4" rx="1" fill="currentColor" opacity="0.7" />
      {/* Window */}
      <circle cx="24" cy="22" r="3.5" fill="white" opacity="0.3" />
      <circle cx="24" cy="22" r="2" fill="white" opacity="0.5" />
    </svg>
  );
}

// ── Exhaust particles ───────────────────────────────────────────────────────
function ExhaustParticles({ active }: { active: boolean }) {
  const particles = Array.from({ length: 9 }, (_, i) => i);

  return (
    <div className="absolute left-1/2 -translate-x-1/2" style={{ bottom: -2, width: 1, height: 1 }}>
      {particles.map((i) => {
        const xSpread = (i - 4) * 5;
        const duration = 0.55 + (i % 3) * 0.12;
        const delay    = (i % 4) * 0.08;
        const size     = i % 3 === 0 ? 5 : i % 3 === 1 ? 3 : 2;

        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: size,
              height: size,
              left: -size / 2,
              top: -size / 2,
              background: i % 2 === 0 ? "var(--accent)" : "#fff",
              opacity: 0,
            }}
            animate={active ? {
              y:       [0, 28 + i * 4],
              x:       [0, xSpread],
              opacity: [0.9, 0],
              scale:   [1, 0.2],
            } : {}}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        );
      })}
    </div>
  );
}

// ── Main component ──────────────────────────────────────────────────────────
export default function AnnouncementModal() {
  const [seen, setSeen]       = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);
  const [closed, setClosed]   = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      setSeen(stored);
    } catch { /* ignore */ }
  }, []);

  const active = mounted ? getActive().filter((a) => !seen.includes(a.id)) : [];
  const item   = active[0] ?? null;
  const show   = mounted && !!item && !closed;

  // Auto-dismiss
  useEffect(() => {
    if (!show) return;
    const t = setTimeout(() => setClosed(true), AUTO_DISMISS_MS);
    return () => clearTimeout(t);
  }, [show]);

  const dismiss = () => {
    if (!item) return;
    setClosed(true);
    const next = [...seen, item.id];
    setSeen(next);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch { /* ignore */ }
  };

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[70] bg-black/55 backdrop-blur-sm"
            onClick={dismiss}
          />

          {/* Card wrapper — rocket launches from below this */}
          <div className="fixed inset-0 z-[71] flex items-center justify-center px-4 pointer-events-none">
            <div className="relative pointer-events-auto" style={{ maxWidth: 440, width: "100%" }}>

              {/* ── Rocket ── */}
              <motion.div
                key="rocket"
                initial={{ y: 180, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -120, opacity: 0 }}
                transition={{
                  y:       { type: "spring", stiffness: 220, damping: 18, delay: 0.15 },
                  opacity: { duration: 0.2, delay: 0.15 },
                }}
                className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center"
                style={{ top: -56, zIndex: 2 }}
              >
                <div style={{ color: "var(--accent)" }}>
                  <RocketIcon size={48} />
                </div>
                <ExhaustParticles active />
              </motion.div>

              {/* ── Card ── */}
              <motion.div
                key="card"
                initial={{ opacity: 0, scale: 0.92, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 8 }}
                transition={{ duration: 0.4, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="relative rounded-2xl overflow-hidden pt-16 px-8 pb-7"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-accent)",
                  boxShadow: `0 0 0 1px rgba(var(--accent-rgb),0.06),
                              0 8px 40px rgba(0,0,0,0.28),
                              0 0 60px rgba(var(--accent-rgb),0.12)`,
                }}
              >
                {/* Glow behind rocket landing spot */}
                <div
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-16 pointer-events-none"
                  style={{ background: "radial-gradient(ellipse, rgba(var(--accent-rgb),0.18) 0%, transparent 70%)" }}
                />

                {/* Dismiss button */}
                <button
                  onClick={dismiss}
                  aria-label="Close announcement"
                  className="absolute top-4 right-4 rounded-full w-7 h-7 flex items-center justify-center transition-opacity opacity-40 hover:opacity-80"
                  style={{ color: "var(--text-primary)" }}
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Content */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.5 }}
                  className="text-center"
                >
                  <p
                    className="text-[10px] font-bold tracking-[0.28em] uppercase mb-3"
                    style={{ color: "var(--accent)" }}
                  >
                    Announcement
                  </p>
                  <p
                    className="font-display text-xl md:text-2xl font-black leading-snug mb-2"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {item.text}
                  </p>
                </motion.div>

                {/* CTA + countdown */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="flex flex-col items-center gap-4 mt-6"
                >
                  {item.link ? (
                    <div className="flex items-center gap-3">
                      <Link
                        href={item.link}
                        onClick={dismiss}
                        className="px-6 py-2.5 rounded-xl text-sm font-bold transition-opacity hover:opacity-85"
                        style={{ background: "var(--accent)", color: "#fff" }}
                      >
                        {item.linkLabel ?? "Learn More"} →
                      </Link>
                      <button
                        onClick={dismiss}
                        className="px-4 py-2.5 rounded-xl text-sm font-medium border transition-opacity hover:opacity-70"
                        style={{ borderColor: "var(--border-subtle)", color: "var(--text-muted)" }}
                      >
                        Got it
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={dismiss}
                      className="px-7 py-2.5 rounded-xl text-sm font-bold transition-opacity hover:opacity-85"
                      style={{ background: "var(--accent)", color: "#fff" }}
                    >
                      Got it 🚀
                    </button>
                  )}

                  {/* Auto-dismiss countdown bar */}
                  <div className="w-full flex items-center gap-2.5">
                    <div className="flex-1 h-1 rounded-full overflow-hidden" style={{ background: "var(--bg-elevated)" }}>
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: "var(--accent)", opacity: 0.45 }}
                        initial={{ width: "100%" }}
                        animate={{ width: "0%" }}
                        transition={{ duration: AUTO_DISMISS_MS / 1000, ease: "linear" }}
                      />
                    </div>
                    <span className="text-[10px] shrink-0" style={{ color: "var(--text-muted)", opacity: 0.5 }}>
                      auto-closing
                    </span>
                  </div>
                </motion.div>
              </motion.div>

            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
