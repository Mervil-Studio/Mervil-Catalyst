"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Shield, Zap, Satellite, GraduationCap, BookOpen,
  Globe, Building2, Briefcase, Lock, ExternalLink,
} from "lucide-react";
import Image from "next/image";

// ─── DATA ──────────────────────────────────────────────────────────────────────

const partners = [
  {
    id: "usafa",
    icon: Shield,
    logo: "/logos/usafa-real.svg",
    name: "US Air Force Academy",
    short: "USAFA",
    category: "Defense & Government",
    color: "#C0C0D0",
    href: "https://www.usafa.edu",
    tagline: "Elite military academy & research partner",
    description: "Students gain exposure to USAFA's world-class cyber and aerospace programs, connecting directly to the defense and national security pipeline.",
    stat: "4,000+ cadets",
    statLabel: "on campus nearby",
  },
  {
    id: "uccs",
    icon: GraduationCap,
    logo: "/logos/uccs-signature-reverse.png",
    /** Reverse (dark BG) artwork — show true colors, no silhouette filter */
    logoStyle: "natural-on-dark" as const,
    name: "Univ. of Colorado Colorado Springs",
    short: "UCCS",
    category: "Higher Education",
    color: "#60A5FA",
    href: "https://www.uccs.edu",
    tagline: "Dual enrollment — earn real college credit",
    description: "CSST students access the full UCCS course catalog for dual enrollment, walking away with transferable university credits before graduation.",
    stat: "100+ programs",
    statLabel: "open for dual enrollment",
  },
  {
    id: "ppsc",
    icon: BookOpen,
    logo: "/logos/ppsc.png",
    name: "Pikes Peak State College",
    short: "PPSC",
    category: "Higher Education",
    color: "#818CF8",
    href: "https://www.pikespeak.edu",
    tagline: "200+ courses, zero tuition cost",
    description: "PPSC's open-access catalog gives every CSST student a path to college credit in technical, business, and professional fields at no cost.",
    stat: "200+ courses",
    statLabel: "available for free",
  },
  {
    id: "space-foundation",
    icon: Globe,
    logo: null,
    name: "Space Foundation",
    short: "Space Fdn.",
    category: "Aerospace",
    color: "#34D399",
    href: "https://www.spacefoundation.org",
    tagline: "World-leading space education partner",
    description: "The Space Foundation's global network connects CSST students to the international space industry, Discovery Center programs, and aerospace career pipelines.",
    stat: "50+ years",
    statLabel: "advancing space exploration",
  },
  {
    id: "space-isac",
    icon: Satellite,
    logo: "/logos/space-isac-real.png",
    name: "Space ISAC",
    short: "Space ISAC",
    category: "Aerospace",
    color: "#6EE7B7",
    href: "https://spaceisac.org",
    tagline: "Global space domain intelligence — next door",
    description: "Space ISAC's Watch Center monitors threats to space-based infrastructure worldwide. Students in the same building have a direct pipeline into aerospace defense.",
    stat: "Global Watch Ops",
    statLabel: "live & next door",
  },
  {
    id: "ncc",
    icon: Lock,
    logo: "/logos/ncc.png",
    name: "National Cybersecurity Center",
    short: "NCC",
    category: "Cybersecurity",
    color: "#00D4FF",
    href: "https://www.nationalcybersecuritycenter.org",
    tagline: "$1M NSF Innovation Engine — in the building",
    description: "CSST is co-located inside the NCC. Students walk past active cyber operations daily and gain access to one of the nation's top cybersecurity organizations.",
    stat: "$1M NSF Grant",
    statLabel: "Innovation Engine recipient",
  },
  {
    id: "xi",
    icon: Zap,
    logo: "/logos/xi.webp",
    name: "Exponential Impact",
    short: "XI",
    category: "Entrepreneurship",
    color: "#FCD34D",
    href: "https://www.exponentialimpact.com",
    tagline: "Colorado Springs' premier startup accelerator",
    description: "CSST's founder previously directed XI. That connection is structural — students have mentorship access to active startup founders and the regional venture network.",
    stat: "Active Mentors",
    statLabel: "from the startup community",
  },
  {
    id: "catalyst",
    icon: Building2,
    logo: "/logos/catalyst.png",
    name: "Catalyst Campus",
    short: "Catalyst",
    category: "Innovation Hub",
    color: "#F472B6",
    href: "https://www.catalystcampus.org",
    tagline: "CSST's physical home — a real innovation hub",
    description: "CSST lives inside Catalyst Campus, a working environment of tech companies, startups, and defense contractors. Students don't simulate a professional setting — they're in one.",
    stat: "50+ companies",
    statLabel: "sharing the building",
  },
  {
    id: "chamber",
    icon: Briefcase,
    logo: null,
    name: "CS Chamber & EDC",
    short: "Chamber",
    category: "Business & Workforce",
    color: "#FB923C",
    href: "https://www.coloradospringschamberedc.com",
    tagline: "Gateway to Colorado Springs' economy",
    description: "The region's economic development powerhouse ties CSST to the employer community, internship networks, and the workforce pipeline shaping the city's future.",
    stat: "1,500+ businesses",
    statLabel: "in the regional network",
  },
];

const featured = [
  {
    id: "ncc-feat",
    icon: Lock,
    name: "National Cybersecurity Center",
    tagline: "Co-located · NSF Innovation Engine recipient",
    description: "CSST is physically housed within the NCC, giving students direct access to one of the nation's leading cybersecurity organizations and the professionals who run it daily.",
    highlights: [
      "$1M NSF Innovation Engines Grant recipient",
      "Students work alongside active cyber professionals",
      "UCCS academic research partnership",
      "Real threat lab environment access",
    ],
    href: "https://www.nationalcybersecuritycenter.org",
    color: "#00D4FF",
  },
  {
    id: "xi-feat",
    icon: Zap,
    name: "Exponential Impact",
    tagline: "Startup accelerator · Entrepreneurship pipeline",
    description: "Colorado Springs' premier startup accelerator. CSST founder Vance Brown previously directed XI — the pipeline between this school and the startup ecosystem is structural, not incidental.",
    highlights: [
      "Active entrepreneur mentors in the building",
      "Pitch events with real investor audiences",
      "Connection to regional venture network",
      "Pathway to post-graduation startup support",
    ],
    href: "https://www.exponentialimpact.com",
    color: "#F59E0B",
  },
  {
    id: "space-isac-feat",
    icon: Satellite,
    name: "Space ISAC",
    tagline: "Global space threat intelligence · Watch Center",
    description: "Space ISAC monitors threats to space-based infrastructure worldwide. CSST students gain direct exposure to aerospace security careers through proximity to the Watch Center.",
    highlights: [
      "Global space domain awareness operations",
      "Executive Director serves on CSST Board",
      "Aerospace and defense career pipeline",
      "Alignment with Space Foundation programs",
    ],
    href: "https://spaceisac.org",
    color: "#34D399",
  },
];

// ─── PARTNER CARD ─────────────────────────────────────────────────────────────
function PartnerCard({ p, index, inView }: { p: typeof partners[0]; index: number; inView: boolean }) {
  const [hovered, setHovered] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const Icon = p.icon;
  const logoNatural =
    "logoStyle" in p && (p as { logoStyle?: string }).logoStyle === "natural-on-dark";

  return (
    <motion.a
      href={p.href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: 0.2 + index * 0.07 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative flex flex-col rounded-2xl overflow-hidden border bg-[#0D0D18] transition-all duration-300 cursor-pointer"
      style={{
        borderColor: hovered ? `${p.color}40` : `${p.color}18`,
        boxShadow: hovered ? `0 8px 40px ${p.color}12, inset 0 1px 0 ${p.color}15` : `inset 0 1px 0 ${p.color}08`,
      }}
    >
      {/* Top glow bar */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] transition-opacity duration-300"
        style={{
          background: `linear-gradient(90deg, transparent, ${p.color}, transparent)`,
          opacity: hovered ? 1 : 0.4,
        }}
      />

      {/* Background glow radial */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at top left, ${p.color}10, transparent 60%)` }}
      />

      <div className="relative p-5 flex flex-col flex-1 gap-3">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3">
          {/* Logo / icon slot */}
          {p.logo && !logoError ? (
            <div
              className={
                logoNatural
                  ? "h-10 min-w-[148px] max-w-[200px] rounded-xl flex items-center justify-center flex-shrink-0 border transition-all duration-300 overflow-hidden px-2"
                  : "h-9 w-[72px] rounded-xl flex items-center justify-center flex-shrink-0 border transition-all duration-300 overflow-hidden px-1.5"
              }
              style={{
                background: logoNatural ? "#000" : `${p.color}10`,
                borderColor: `${p.color}22`,
                boxShadow: hovered ? `0 0 16px ${p.color}28` : "none",
              }}
            >
              <Image
                src={p.logo}
                alt={p.name}
                width={logoNatural ? 180 : 60}
                height={logoNatural ? 32 : 28}
                className="object-contain object-left w-full h-full"
                style={
                  logoNatural
                    ? { opacity: hovered ? 1 : 0.92 }
                    : { filter: "brightness(0) invert(1)", opacity: hovered ? 0.9 : 0.6 }
                }
                onError={() => setLogoError(true)}
                unoptimized
              />
            </div>
          ) : (
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 border transition-all duration-300"
              style={{
                background: `${p.color}12`,
                borderColor: `${p.color}25`,
                boxShadow: hovered ? `0 0 16px ${p.color}30` : "none",
              }}
            >
              <Icon className="w-5 h-5 transition-colors duration-300" style={{ color: p.color }} strokeWidth={1.5} />
            </div>
          )}
          <span
            className="text-[9px] font-bold tracking-[0.18em] uppercase px-2 py-1 rounded-full border mt-0.5"
            style={{ color: `${p.color}90`, borderColor: `${p.color}25`, background: `${p.color}08` }}
          >
            {p.category}
          </span>
        </div>

        {/* Name + tagline */}
        <div>
          <h3 className="font-display text-sm font-bold text-white leading-tight">{p.name}</h3>
          <p className="text-[11px] text-[#C0C0D0]/45 mt-1 leading-snug">{p.tagline}</p>
        </div>

        {/* Description */}
        <p className="text-[11px] text-[#C0C0D0]/55 leading-relaxed flex-1">{p.description}</p>

        {/* Stat footer */}
        <div
          className="mt-auto pt-3 border-t flex items-center justify-between"
          style={{ borderColor: `${p.color}15` }}
        >
          <div>
            <span className="text-sm font-bold" style={{ color: p.color }}>{p.stat}</span>
            <span className="text-[10px] text-[#C0C0D0]/40 block leading-tight">{p.statLabel}</span>
          </div>
          <ExternalLink
            className="w-3.5 h-3.5 transition-all duration-300"
            style={{ color: hovered ? p.color : "#C0C0D0", opacity: hovered ? 0.8 : 0.2 }}
          />
        </div>
      </div>
    </motion.a>
  );
}

// ─── FEATURED ANCHOR CARD ─────────────────────────────────────────────────────
function FeaturedCard({ partner, index }: { partner: typeof featured[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const Icon = partner.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay: index * 0.12 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex flex-col rounded-2xl border bg-[#0D0D18] overflow-hidden transition-all duration-300"
      style={{
        borderColor: hovered ? `${partner.color}35` : `${partner.color}15`,
        boxShadow: hovered ? `0 0 40px ${partner.color}12` : "none",
      }}
    >
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${partner.color}55, transparent)` }} />
      <motion.div animate={{ opacity: hovered ? 1 : 0 }} transition={{ duration: 0.3 }}
        className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at top, ${partner.color}07, transparent 60%)` }} />

      <div className="relative p-7 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-5">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-300"
            style={{ background: `${partner.color}12`, borderColor: `${partner.color}25`, boxShadow: hovered ? `0 0 20px ${partner.color}25` : "none" }}>
            <Icon className="w-6 h-6" style={{ color: partner.color }} strokeWidth={1.5} />
          </div>
          <a href={partner.href} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs font-semibold transition-all group/link"
            style={{ color: `${partner.color}80` }}>
            Visit <ExternalLink className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
          </a>
        </div>

        <h3 className="font-display text-base font-bold text-white mb-1 leading-tight">{partner.name}</h3>
        <p className="text-xs font-medium tracking-wide mb-4" style={{ color: partner.color }}>{partner.tagline}</p>
        <p className="text-sm text-[#C0C0D0]/60 leading-relaxed mb-5 flex-1">{partner.description}</p>

        <ul className="space-y-2">
          {partner.highlights.map((h) => (
            <li key={h} className="flex items-start gap-2 text-xs text-[#C0C0D0]/50">
              <span className="w-1 h-1 rounded-full flex-shrink-0 mt-1.5" style={{ background: partner.color }} />
              {h}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

// ─── SECTION ─────────────────────────────────────────────────────────────────
export default function EcosystemSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="ecosystem" ref={ref} className="relative py-28 bg-[#0A0A0F] overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-25" />
      <div className="absolute left-0 top-1/3 w-72 h-[600px] bg-[#00D4FF]/4 blur-[120px] pointer-events-none" />
      <div className="absolute right-0 bottom-1/3 w-72 h-[600px] bg-[#F59E0B]/4 blur-[120px] pointer-events-none" />
      <div className="absolute right-1/4 top-0 w-48 h-72 bg-[#34D399]/3 blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">

        {/* ── HEADER ── */}
        <div className="max-w-3xl mb-16">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-6 text-[#00D4FF] text-xs font-medium tracking-[0.25em] uppercase">
            <span className="w-8 h-px bg-[#00D4FF]" />The Co-Location Advantage
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight mb-5">
            9 Official Partners.
            <br /><span className="text-[#00D4FF]">All In.</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg text-[#C0C0D0]/70 leading-relaxed">
            Industry, defense, and higher education formally partnered with CSST —
            not as sponsors, but as co-builders of what this school is.
          </motion.p>
        </div>

        {/* ── 9 PARTNER CARDS GRID ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
          {partners.map((p, i) => (
            <PartnerCard key={p.id} p={p} index={i} inView={inView} />
          ))}
        </div>

        {/* ── DIVIDER ── */}
        <motion.div
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.8, delay: 0.8 }}
          className="flex items-center gap-5 mb-16"
        >
          <div className="flex-1 h-px bg-gradient-to-r from-[#00D4FF]/30 to-transparent" />
          <div className="flex items-center gap-3 px-4 py-2 rounded-full border border-[#00D4FF]/20 bg-[#00D4FF]/5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF] animate-pulse" />
            <span className="text-xs font-bold tracking-[0.2em] text-[#00D4FF]/70 uppercase whitespace-nowrap">
              Anchor Partners — In the Building
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF] animate-pulse" />
          </div>
          <div className="flex-1 h-px bg-gradient-to-l from-[#00D4FF]/30 to-transparent" />
        </motion.div>

        {/* ── 3 FEATURED CENTERS ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((p, i) => (
            <FeaturedCard key={p.id} partner={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
