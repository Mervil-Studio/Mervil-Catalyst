"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight, LogIn } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { label: "Programs", href: "#programs" },
  { label: "Ecosystem", href: "#ecosystem" },
  { label: "The Space", href: "#the-space" },
  { label: "Team", href: "#team" },
  { label: "FAQ", href: "#faq" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0A0A0F]/95 backdrop-blur-xl border-b border-[rgba(0,212,255,0.15)] shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
            : "bg-[#0A0A0F]/80 backdrop-blur-md border-b border-[rgba(0,212,255,0.06)]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between" style={{ height: "72px" }}>
          {/* Logo + Tagline */}
          <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
            <Image
              src="/csst-logo.png"
              alt="Colorado Springs School of Technology"
              width={160}
              height={36}
              className="h-9 w-auto object-contain"
              priority
            />
            <div className="hidden md:block border-l border-[#00D4FF]/25 pl-3">
              <div className="text-[10px] font-medium text-[#C0C0D0]/60 leading-snug whitespace-nowrap">
                The only Colorado Springs School
              </div>
              <div className="text-[10px] font-semibold leading-snug whitespace-nowrap">
                building&nbsp;<span className="text-[#00D4FF]">Future Ready Students</span>
              </div>
            </div>
          </Link>

          {/* Desktop Nav Links — visible at xl+ */}
          <div className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium text-[#C0C0D0] hover:text-white transition-colors duration-200 group"
              >
                <span className="relative z-10">{link.label}</span>
                <span className="absolute inset-0 rounded-lg bg-[#00D4FF]/0 group-hover:bg-[#00D4FF]/8 transition-all duration-200" />
                <span className="absolute bottom-1 left-4 right-4 h-px bg-[#00D4FF] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
              </Link>
            ))}
          </div>

          {/* Right side: Login + Apply CTA + hamburger */}
          <div className="flex items-center gap-2">
            {/* Login — ghost button */}
            <Link
              href="/login"
              className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[#C0C0D0]/15 text-xs font-semibold text-[#C0C0D0]/60 hover:text-white hover:border-[#C0C0D0]/30 transition-all duration-200 group"
              title="Student & Partner Portal — Coming Soon"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Login</span>
            </Link>
            {/* Apply CTA */}
            <Link
              href="/apply"
              className="hidden md:flex items-center gap-2 px-5 py-2 rounded-lg bg-[#00D4FF] text-[#0A0A0F] text-sm font-bold tracking-wide hover:bg-white transition-colors duration-200 group shadow-[0_0_20px_rgba(0,212,255,0.3)]"
            >
              Apply Now — Free
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            {/* Hamburger — visible below xl */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="xl:hidden w-9 h-9 flex items-center justify-center rounded-lg border border-[#00D4FF]/20 text-[#00D4FF] hover:bg-[#00D4FF]/10 transition-colors"
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm xl:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-[#0A0A0F] border-l border-[#00D4FF]/15 flex flex-col xl:hidden"
            >
              <div className="flex items-center justify-between p-6 border-b border-[#00D4FF]/10">
                <Image
                  src="/csst-logo.png"
                  alt="CSST"
                  width={120}
                  height={28}
                  className="h-7 w-auto object-contain"
                />
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#00D4FF]/20 text-[#00D4FF]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <nav className="flex-1 p-6 space-y-2">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-between px-4 py-3 rounded-lg text-[#C0C0D0] hover:text-white hover:bg-[#00D4FF]/8 transition-all duration-200 group"
                    >
                      <span className="text-sm font-medium">{link.label}</span>
                      <ChevronRight className="w-4 h-4 text-[#00D4FF]/50 group-hover:text-[#00D4FF] group-hover:translate-x-0.5 transition-all" />
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="p-6 border-t border-[#00D4FF]/10 space-y-3">
                <Link
                  href="/apply"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-[#00D4FF] text-[#0A0A0F] text-sm font-bold tracking-wide shadow-[0_0_20px_rgba(0,212,255,0.3)]"
                >
                  Apply Now — Tuition Free
                  <ChevronRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg border border-[#C0C0D0]/15 text-sm text-[#C0C0D0]/50 hover:text-white hover:border-[#C0C0D0]/25 transition-all"
                >
                  <LogIn className="w-4 h-4" />
                  Student &amp; Partner Login
                </Link>
                <p className="text-center text-xs text-[#C0C0D0]/30">
                  Publicly funded · D11 Innovation Zone
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
