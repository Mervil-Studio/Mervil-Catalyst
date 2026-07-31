"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight, Rocket, Shield, Lightbulb, Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useTheme, themes, type Theme } from "@/app/theme-context";

const navLinks = [
  { label: "Programs",   href: "#programs" },
  { label: "Ecosystem",  href: "#ecosystem" },
  { label: "The Space",  href: "#the-space" },
  { label: "Team",       href: "#team" },
  { label: "FAQ",        href: "#faq" },
];

const THEME_ICONS: Record<Theme, React.ElementType> = {
  aerospace:        Rocket,
  cyber:            Shield,
  entrepreneurship: Lightbulb,
  leadership:       Star,
};

// ── Main Nav ──────────────────────────────────────────────────────────────────
export default function Navigation() {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { meta, theme, setTheme }   = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed left-0 right-0 z-50 transition-all duration-300"
        style={{
          top: "var(--announce-h, 0px)",
          background: scrolled ? "var(--bg-nav)" : `${meta.accent}04`,
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: `1px solid ${scrolled ? "var(--border-accent)" : "var(--border-subtle)"}`,
          boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.15)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between" style={{ height: 72 }}>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0 group">
            <Image
              src="/csst-logo.png"
              alt="Colorado Springs School of Technology"
              width={220} height={52}
              className="h-12 w-auto object-contain"
              priority
            />
            <div className="hidden md:block pl-3" style={{ borderLeft: "1px solid var(--border-accent)" }}>
              <div className="text-[10px] font-medium leading-snug whitespace-nowrap" style={{ color: "var(--text-muted)" }}>
                The only Colorado Springs School
              </div>
              <div className="text-[10px] font-semibold leading-snug whitespace-nowrap" style={{ color: "var(--text-primary)" }}>
                building&nbsp;<span style={{ color: "var(--accent)" }}>Future Ready Students</span>
              </div>
            </div>
          </Link>

          {/* Desktop links */}
          <div className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-lg group"
                style={{ color: "var(--text-muted)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-primary)";
                  (e.currentTarget as HTMLAnchorElement).style.background = `${meta.accent}0C`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-muted)";
                  (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right cluster */}
          <div className="flex items-center gap-2">
            <Link
              href="/apply"
              className="hidden md:flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-bold tracking-wide transition-all duration-200 group"
              style={{
                background: "var(--accent)",
                color: meta.dark ? "#000" : "#fff",
                boxShadow: `0 0 20px rgba(var(--accent-rgb), 0.3)`,
              }}
            >
              Apply Now — Free
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>

            {/* Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="xl:hidden w-9 h-9 flex items-center justify-center rounded-lg border transition-colors"
              style={{ borderColor: "var(--border-accent)", color: "var(--accent)" }}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm xl:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 flex flex-col xl:hidden"
              style={{ background: "var(--bg-card)", borderLeft: "1px solid var(--border-accent)" }}
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: "var(--border-subtle)" }}>
                <Image src="/csst-logo.png" alt="CSST" width={120} height={28} className="h-7 w-auto" />
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg border"
                  style={{ borderColor: "var(--border-accent)", color: "var(--accent)" }}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex-1 p-6 space-y-1 overflow-y-auto">
                {navLinks.map((link, i) => (
                  <motion.div key={link.href} initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.06 }}>
                    <a
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200"
                      style={{ color: "var(--text-muted)" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = `${meta.accent}10`; (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-primary)"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-muted)"; }}
                    >
                      <span className="text-sm font-medium">{link.label}</span>
                      <ChevronRight className="w-4 h-4 opacity-40" style={{ color: "var(--accent)" }} />
                    </a>
                  </motion.div>
                ))}

                {/* Mobile pathway switcher */}
                <div className="pt-5">
                  <p className="text-[9px] font-bold tracking-[0.25em] uppercase px-4 mb-3" style={{ color: "var(--text-muted)" }}>
                    Choose Pathway
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {([
                      { id: "aerospace",        Icon: Rocket,    label: "Aerospace",   accent: "#34D399" },
                      { id: "cyber",            Icon: Shield,    label: "Cyber",        accent: "#00D4FF" },
                      { id: "entrepreneurship", Icon: Lightbulb, label: "Venture",      accent: "#EA580C" },
                      { id: "leadership",       Icon: Star,      label: "Leadership",   accent: "#7C3AED" },
                    ] as const).map(({ id, Icon, label, accent }) => (
                      <button
                        key={id}
                        onClick={() => setTheme(id as Theme)}
                        className="flex flex-col items-center gap-1.5 p-3 rounded-xl border text-center transition-all"
                        style={{
                          borderColor: theme === id ? `${accent}50` : "var(--border-subtle)",
                          background:  theme === id ? `${accent}12` : "transparent",
                          color:       theme === id ? accent : "var(--text-muted)",
                        }}
                      >
                        <Icon className="w-4 h-4" strokeWidth={1.8} style={{ color: theme === id ? accent : "var(--text-muted)" }} />
                        <span className="text-[10px] font-semibold">{label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </nav>

              {/* Drawer footer */}
              <div className="p-6 border-t space-y-3" style={{ borderColor: "var(--border-subtle)" }}>
                <Link
                  href="/apply"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-lg text-sm font-bold tracking-wide"
                  style={{
                    background: "var(--accent)",
                    color: meta.dark ? "#000" : "#fff",
                    boxShadow: `0 0 20px rgba(var(--accent-rgb), 0.3)`,
                  }}
                >
                  Apply Now — Tuition Free
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
