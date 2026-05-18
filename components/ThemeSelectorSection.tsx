"use client";

import { motion } from "framer-motion";
import { Rocket, Shield, Lightbulb, Star } from "lucide-react";
import { useTheme, themes, type Theme } from "@/app/theme-context";

const TRACK_ICONS: Record<Theme, React.ElementType> = {
  aerospace:        Rocket,
  cyber:            Shield,
  entrepreneurship: Lightbulb,
  leadership:       Star,
};

const NAV_HEIGHT = 72;  // px — fixed navigation bar height
const BAR_HEIGHT = 56;  // px — fixed theme selector bar height

export default function ThemeSelectorSection() {
  const { theme, setTheme } = useTheme();

  return (
    <>
      {/* Spacer — reserves space for BOTH fixed bars so page content isn't hidden behind them */}
      <div style={{ height: NAV_HEIGHT + BAR_HEIGHT }} aria-hidden />

      {/* Fixed bar — sits immediately below the fixed nav (72px) */}
      <div
        id="pathway"
        className="fixed left-0 right-0 z-40 overflow-hidden"
        style={{
          top: 72,
          height: BAR_HEIGHT,
          background: "var(--bg-secondary)",
          borderBottom: "1px solid var(--border-subtle)",
        }}
      >
        <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />

        <div className="relative h-full max-w-5xl mx-auto px-6 flex items-center justify-between gap-6">
          {/* Copy */}
          <div className="flex-shrink-0 hidden sm:block">
            <p className="text-[9px] font-bold tracking-[0.28em] uppercase leading-none mb-0.5"
              style={{ color: `rgba(var(--accent-rgb), 0.55)` }}>
              A school journey like none other
            </p>
            <p className="text-xs font-semibold leading-none"
              style={{ color: "var(--text-muted)" }}>
              Choose how your CSST experience looks and feels.
            </p>
          </div>

          {/* Pathway pills */}
          <div className="flex items-center gap-2 flex-1 sm:flex-none justify-end sm:justify-normal flex-wrap sm:flex-nowrap">
            {themes.map((t, i) => {
              const Icon = TRACK_ICONS[t.id];
              const active = theme === t.id;
              return (
                <motion.button
                  key={t.id}
                  onClick={() => setTheme(t.id as Theme)}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[11px] font-semibold transition-all duration-200 cursor-pointer focus:outline-none"
                  style={{
                    borderColor: active ? `${t.accent}55` : "var(--border-subtle)",
                    background:  active ? `${t.accent}15` : "var(--bg-card)",
                    color:       active ? t.accent : "var(--text-muted)",
                    boxShadow:   active ? `0 0 12px ${t.accent}18` : "none",
                  }}
                  aria-pressed={active}
                  title={t.pathway}
                >
                  <Icon
                    className="w-3 h-3 flex-shrink-0"
                    strokeWidth={active ? 2 : 1.6}
                    style={{ color: active ? t.accent : "var(--text-muted)" }}
                  />
                  <span>{t.label}</span>
                  {active && (
                    <span className="w-1 h-1 rounded-full flex-shrink-0"
                      style={{ background: t.accent }} />
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
