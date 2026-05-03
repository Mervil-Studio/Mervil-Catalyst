"use client";

import { motion } from "framer-motion";
import { Zap, ExternalLink, ChevronRight, Mail, MapPin, Shield } from "lucide-react";
import Link from "next/link";

const footerLinks: Record<string, { label: string; href: string; external?: boolean }[]> = {
  Programs: [
    { label: "Cybersecurity Track", href: "#programs" },
    { label: "AI & Emerging Tech", href: "#programs" },
    { label: "Aerospace & Space", href: "#programs" },
    { label: "Entrepreneurship", href: "#programs" },
  ],
  Ecosystem: [
    { label: "National Cybersecurity Center", href: "https://www.nationalcybersecuritycenter.org", external: true },
    { label: "Exponential Impact", href: "https://www.exponentialimpact.com", external: true },
    { label: "Space ISAC", href: "https://spaceisac.org", external: true },
    { label: "UCCS Dual Enrollment", href: "https://www.uccs.edu/admissions-aid/concurrent", external: true },
  ],
  "Get Started": [
    { label: "Apply — It's Free", href: "/apply" },
    { label: "Information Nights", href: "#faq" },
    { label: "FAQ", href: "#faq" },
    { label: "Meet the Team", href: "#team" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative bg-[#060608] border-t border-[#00D4FF]/10 overflow-hidden">
      {/* Top glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00D4FF]/30 to-transparent" />

      {/* CTA Banner */}
      <div className="relative border-b border-[#00D4FF]/8 py-16 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[500px] h-32 bg-[#00D4FF]/6 blur-[80px]" />

        <div className="relative max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-xs font-medium tracking-[0.25em] uppercase text-[#00D4FF]/60 mb-2">
              Now Enrolling — 2026–2027
            </p>
            <h3 className="font-display text-3xl md:text-4xl font-black text-white">
              Applications Are Open.
            </h3>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/apply"
              className="flex items-center gap-2 px-8 py-4 rounded-lg bg-[#00D4FF] text-[#0A0A0F] font-bold tracking-wide hover:bg-white transition-all duration-200 shadow-[0_0_30px_rgba(0,212,255,0.35)] group"
            >
              Apply Now — It&apos;s Free
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <a
              href="mailto:info@csrockets.org"
              className="px-8 py-4 rounded-lg border border-[#00D4FF]/25 text-[#00D4FF] font-semibold hover:bg-[#00D4FF]/10 transition-all duration-200"
            >
              Email Admissions
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#00D4FF]/10 border border-[#00D4FF]/25">
                <Zap className="w-5 h-5 text-[#00D4FF]" />
              </div>
              <div>
                <div className="font-display text-sm font-black tracking-[0.15em] text-white">CSST</div>
                <div className="text-[9px] tracking-[0.2em] text-[#00D4FF]/60 uppercase">
                  Colorado Springs School of Technology
                </div>
              </div>
            </div>

            <p className="text-sm text-[#C0C0D0]/50 leading-relaxed mb-8 max-w-xs">
              A D11 Innovation Zone school where Innovators become Founders. Embedded in the most
              concentrated tech ecosystem in the Mountain West.
            </p>

            {/* Contact */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-xs text-[#C0C0D0]/40">
                <MapPin className="w-3.5 h-3.5 text-[#00D4FF]/50 flex-shrink-0" />
                Colorado Springs, CO · D11 Innovation Zone
              </div>
              <div className="flex items-center gap-3 text-xs text-[#C0C0D0]/40">
                <Mail className="w-3.5 h-3.5 text-[#00D4FF]/50 flex-shrink-0" />
                <a href="mailto:info@csrockets.org" className="hover:text-[#00D4FF] transition-colors">
                  info@csrockets.org
                </a>
              </div>
              <div className="flex items-center gap-3 text-xs text-[#C0C0D0]/40">
                <Shield className="w-3.5 h-3.5 text-[#00D4FF]/50 flex-shrink-0" />
                NCC Partner School · Space ISAC Pipeline
              </div>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-display text-xs font-bold tracking-[0.2em] uppercase text-[#00D4FF]/70 mb-5">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map(({ label, href, external }) => (
                  <li key={label}>
                    {external ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-sm text-[#C0C0D0]/50 hover:text-[#00D4FF] transition-colors duration-200 group"
                      >
                        {label}
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    ) : (
                      <Link
                        href={href}
                        className="text-sm text-[#C0C0D0]/50 hover:text-[#00D4FF] transition-colors duration-200"
                      >
                        {label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#00D4FF]/8">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#C0C0D0]/25 tracking-wide">
            © {new Date().getFullYear()} Colorado Springs School of Technology · D11 · All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms", "Accessibility"].map((item) => (
              <span
                key={item}
                className="text-xs text-[#C0C0D0]/25"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
