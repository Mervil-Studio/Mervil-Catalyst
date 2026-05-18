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
    <footer className="relative overflow-hidden" style={{ background: "var(--bg-secondary)", borderTop: "1px solid var(--border-accent)" }}>
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, rgba(var(--accent-rgb), 0.30), transparent)` }} />

      {/* CTA Banner */}
      <div className="relative py-16 overflow-hidden" style={{ borderBottom: "1px solid var(--border-subtle)" }}>
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[500px] h-32 blur-[80px]" style={{ background: `rgba(var(--accent-rgb), 0.06)` }} />

        <div className="relative max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-xs font-medium tracking-[0.25em] uppercase mb-2" style={{ color: `rgba(var(--accent-rgb), 0.6)` }}>
              Now Enrolling — 2026–2027
            </p>
            <h3 className="font-display text-3xl md:text-4xl font-black" style={{ color: "var(--text-primary)" }}>
              Applications Are Open.
            </h3>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/apply"
              className="flex items-center gap-2 px-8 py-4 rounded-lg font-bold tracking-wide transition-all duration-200 group"
              style={{
                background: "var(--accent)",
                color: "var(--bg-primary)",
                boxShadow: `0 0 30px rgba(var(--accent-rgb), 0.35)`,
              }}
            >
              Apply Now — It&apos;s Free
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <a
              href="mailto:info@csrockets.org"
              className="px-8 py-4 rounded-lg border font-semibold transition-all duration-200"
              style={{ borderColor: "var(--border-accent)", color: "var(--accent)" }}
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
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center border"
                style={{ background: `rgba(var(--accent-rgb), 0.10)`, borderColor: "var(--border-accent)" }}
              >
                <Zap className="w-5 h-5" style={{ color: "var(--accent)" }} />
              </div>
              <div>
                <div className="font-display text-sm font-black tracking-[0.15em]" style={{ color: "var(--text-primary)" }}>CSST</div>
                <div className="text-[9px] tracking-[0.2em] uppercase" style={{ color: `rgba(var(--accent-rgb), 0.6)` }}>
                  Colorado Springs School of Technology
                </div>
              </div>
            </div>

            <p className="text-sm leading-relaxed mb-8 max-w-xs" style={{ color: "var(--text-muted)" }}>
              A D11 Innovation Zone school where Innovators become Founders. Embedded in the most
              concentrated tech ecosystem in the Mountain West.
            </p>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-xs" style={{ color: "var(--text-muted)" }}>
                <MapPin className="w-3.5 h-3.5 flex-shrink-0" style={{ color: `rgba(var(--accent-rgb), 0.5)` }} />
                Colorado Springs, CO · D11 Innovation Zone
              </div>
              <div className="flex items-center gap-3 text-xs" style={{ color: "var(--text-muted)" }}>
                <Mail className="w-3.5 h-3.5 flex-shrink-0" style={{ color: `rgba(var(--accent-rgb), 0.5)` }} />
                <a href="mailto:info@csrockets.org" className="hover:text-accent transition-colors" style={{ color: "inherit" }}>
                  info@csrockets.org
                </a>
              </div>
              <div className="flex items-center gap-3 text-xs" style={{ color: "var(--text-muted)" }}>
                <Shield className="w-3.5 h-3.5 flex-shrink-0" style={{ color: `rgba(var(--accent-rgb), 0.5)` }} />
                NCC Partner School · Space ISAC Pipeline
              </div>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4
                className="font-display text-xs font-bold tracking-[0.2em] uppercase mb-5"
                style={{ color: `rgba(var(--accent-rgb), 0.7)` }}
              >
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
                        className="flex items-center gap-1.5 text-sm transition-colors duration-200 group"
                        style={{ color: "var(--text-muted)" }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--accent)"; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-muted)"; }}
                      >
                        {label}
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    ) : (
                      <Link
                        href={href}
                        className="text-sm transition-colors duration-200"
                        style={{ color: "var(--text-muted)" }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--accent)"; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-muted)"; }}
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
      <div style={{ borderTop: "1px solid var(--border-subtle)" }}>
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs tracking-wide" style={{ color: `rgba(var(--accent-rgb), 0.25)` }}>
            © {new Date().getFullYear()} Colorado Springs School of Technology · D11 · All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms", "Accessibility"].map((item) => (
              <span key={item} className="text-xs" style={{ color: `rgba(var(--accent-rgb), 0.25)` }}>
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
