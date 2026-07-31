"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Shield,
  Brain,
  Rocket,
  Lightbulb,
  Code,
  Network,
  Lock,
  Cpu,
  Globe,
  TrendingUp,
  GraduationCap,
  BookOpen,
  ExternalLink,
  ChevronRight,
  Star,
} from "lucide-react";

const tracks = [
  {
    id: "aerospace",
    icon: Rocket,
    title: "Aerospace & Engineering",
    subtitle: "The final frontier — right next door",
    color: "#34D399",
    description:
      "Colorado Springs is the center of U.S. space operations. Through Space ISAC and Space Foundation partnerships, students explore aerospace technology, engineering principles, and the fast-growing space economy.",
    modules: [
      { icon: Rocket, text: "Aerospace Industry & Space Operations" },
      { icon: Globe, text: "Space Domain Awareness" },
      { icon: Shield, text: "Aerospace Security Basics" },
      { icon: TrendingUp, text: "Space Economy & Careers" },
    ],
    badge: "Space ISAC Partner",
  },
  {
    id: "cyber",
    icon: Shield,
    title: "Cybersecurity & Computer Science",
    subtitle: "Defending the digital world",
    color: "#00D4FF",
    description:
      "Co-located inside the National Cybersecurity Center, students develop real fluency in computer science and explore cybersecurity in an active professional environment — from ethical hacking to secure software development.",
    modules: [
      { icon: Lock, text: "Cybersecurity Fundamentals & Ethics" },
      { icon: Shield, text: "Threat Detection & Incident Response" },
      { icon: Code, text: "Software Development & Programming" },
      { icon: Network, text: "Networks, Systems & Defense" },
    ],
    badge: "NCC Partner",
  },
  {
    id: "entrepreneurship",
    icon: Lightbulb,
    title: "Entrepreneurship & Innovation",
    subtitle: "From idea to impact",
    color: "#FB923C",
    description:
      "Through Exponential Impact, students develop entrepreneurial mindsets — pitching ideas, prototyping solutions, and learning what it actually takes to build something real in a live startup environment.",
    modules: [
      { icon: Lightbulb, text: "Design Thinking & Problem Solving" },
      { icon: TrendingUp, text: "Business & Venture Basics" },
      { icon: Code, text: "Prototype Development" },
      { icon: Network, text: "Pitch & Communication Skills" },
    ],
    badge: "XI Accelerator",
  },
  {
    id: "leadership",
    icon: Star,
    title: "Leadership & Community",
    subtitle: "Building the people who build the future",
    color: "#A78BFA",
    description:
      "Strong leaders aren't born — they're developed through practice, reflection, and real responsibility. This pathway builds the communication, collaboration, and civic mindset students need to lead in any field.",
    modules: [
      { icon: Globe, text: "Community Engagement & Civic Leadership" },
      { icon: Network, text: "Collaboration & Team Dynamics" },
      { icon: BookOpen, text: "Ethics, Decision-Making & Character" },
      { icon: GraduationCap, text: "Career Readiness & Professional Development" },
    ],
    badge: "Core Pathway",
  },
];

const dualEnrollPartners = [
  {
    id: "uccs",
    name: "University of Colorado Colorado Springs",
    shortName: "UCCS",
    href: "https://www.uccs.edu/admissions-aid/concurrent",
    color: "#FFD700",
    stats: [
      { value: "9", label: "Colleges & Schools" },
      { value: "60+", label: "Degree Programs" },
      { value: "1,000+", label: "Courses Available" },
    ],
    description:
      "A full four-year research university, right in Colorado Springs. CSST students can enroll in real UCCS courses on campus or online — sitting alongside regular university students and earning credit that appears on an official UCCS transcript.",
    highlights: [
      "Business, Engineering, Computer Science, Sciences, Humanities & more",
      "On-campus or online enrollment alongside university students",
      "Official UCCS transcript — transferable nationwide",
      "CU Succeed pathways, ASCENT program, and direct enrollment options",
      "Courses count toward both HS graduation and a future college degree",
    ],
    type: "4-Year University",
  },
  {
    id: "ppsc",
    name: "Pikes Peak State College",
    shortName: "PPSC",
    href: "https://www.pikespeak.edu/academics/high-school-programs/concurrent-enrollment.php",
    color: "#60A5FA",
    stats: [
      { value: "200+", label: "Degree & Certificate Programs" },
      { value: "100s", label: "Courses Available" },
      { value: "3", label: "Campus Locations" },
    ],
    description:
      "Colorado Springs' community college offers career/technical, workforce, and transfer pathways. Through Campus Pathways and Career Start, students can take PPSC courses on campus, online, or delivered directly at CSST.",
    highlights: [
      "Career & technical programs: IT, cybersecurity, healthcare, business & more",
      "Courses can be delivered at CSST through Campus Pathways",
      "Credits transfer to Colorado public universities",
      "Up to 15 credit hours per semester",
      "Ideal for career-focused pathways and workforce certifications",
    ],
    type: "State College",
  },
];

function TrackCard({ track, index }: { track: typeof tracks[0]; index: number }) {
  const [active, setActive] = useState(false);
  const Icon = track.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="group relative h-full"
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      <div
        className="relative rounded-2xl border overflow-hidden transition-all duration-300 h-full"
        style={{ background: "var(--bg-card)", borderColor: active ? `${track.color}38` : "var(--border-subtle)", boxShadow: active ? `0 0 30px ${track.color}10` : "none" }}
      >
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${track.color}40, transparent)` }} />

        <div className="p-6">
          <div className="flex items-start justify-between mb-5">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-300"
              style={{
                background: `${track.color}10`,
                borderColor: `${track.color}22`,
                boxShadow: active ? `0 0 16px ${track.color}22` : "none",
              }}
            >
              <Icon className="w-5 h-5" style={{ color: track.color }} strokeWidth={1.5} />
            </div>
            <span
              className="text-[10px] font-bold tracking-widest uppercase px-2 py-1 rounded-full border"
              style={{ color: track.color, borderColor: `${track.color}28`, background: `${track.color}10` }}
            >
              {track.badge}
            </span>
          </div>

          <h3 className="font-display text-base font-bold mb-1 leading-tight" style={{ color: "var(--text-primary)" }}>{track.title}</h3>
          <p className="text-xs font-medium mb-4" style={{ color: track.color }}>{track.subtitle}</p>
          <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--text-muted)", opacity: 0.8 }}>{track.description}</p>

          <div className="space-y-2">
            {track.modules.map(({ icon: MIcon, text }) => (
              <div key={text} className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0" style={{ background: `${track.color}10` }}>
                  <MIcon className="w-3 h-3" style={{ color: track.color }} />
                </div>
                <span className="text-xs font-medium" style={{ color: "var(--text-muted)", opacity: 0.7 }}>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function DualEnrollCard({ partner, index }: { partner: typeof dualEnrollPartners[0]; index: number }) {
  const [active, setActive] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.65, delay: index * 0.12 }}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      className="relative rounded-2xl border overflow-hidden transition-all duration-300"
      style={{
        background: "var(--bg-card)",
        borderColor: active ? `${partner.color}40` : `${partner.color}18`,
        boxShadow: active ? `0 0 40px ${partner.color}12` : "none",
      }}
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: `linear-gradient(90deg, transparent, ${partner.color}70, transparent)` }} />

      {/* Hover glow */}
      <motion.div
        animate={{ opacity: active ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at top, ${partner.color}06, transparent 60%)` }}
      />

      <div className="relative p-8">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span
                className="text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded"
                style={{ background: `${partner.color}18`, color: partner.color }}
              >
                {partner.type}
              </span>
            </div>
            <h3 className="font-display text-xl font-black leading-tight" style={{ color: "var(--text-primary)" }}>{partner.shortName}</h3>
            <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)", opacity: 0.6 }}>{partner.name}</p>
          </div>
          <a
            href={partner.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all duration-200 group/link flex-shrink-0"
            style={{
              borderColor: `${partner.color}30`,
              color: partner.color,
              background: `${partner.color}08`,
            }}
          >
            Explore Courses
            <ExternalLink className="w-3 h-3 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3 mb-6 p-4 rounded-xl border" style={{ borderColor: `${partner.color}15`, background: `${partner.color}05` }}>
          {partner.stats.map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="font-display text-xl font-black" style={{ color: partner.color }}>{value}</div>
              <div className="text-[10px] mt-0.5 leading-tight" style={{ color: "var(--text-muted)", opacity: 0.55 }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Description */}
        <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--text-muted)", opacity: 0.8 }}>{partner.description}</p>

        {/* Highlights */}
        <ul className="space-y-2">
          {partner.highlights.map((h) => (
            <li key={h} className="flex items-start gap-2.5 text-sm" style={{ color: "var(--text-muted)", opacity: 0.85 }}>
              <Star className="w-3 h-3 flex-shrink-0 mt-0.5" style={{ color: partner.color }} />
              {h}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export default function ProgramTracks() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="programs" ref={ref} className="relative py-28 overflow-hidden" style={{ background: "var(--bg-primary)" }}>
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] blur-[100px] pointer-events-none" style={{ background: "rgba(var(--accent-rgb),0.03)" }} />

      <div className="max-w-7xl mx-auto px-6">
        {/* ── HEADER ── */}
        <div className="max-w-3xl mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-6 text-xs font-medium tracking-[0.25em] uppercase"
            style={{ color: "var(--accent)" }}
          >
            <span className="w-8 h-px" style={{ background: "var(--accent)" }} />
            Curriculum & Pathways
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight mb-6"
            style={{ color: "var(--text-primary)" }}
          >
            A Curriculum Built
            <br />
            <span style={{ color: "var(--accent)" }}>By Industry.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg leading-relaxed"
            style={{ color: "var(--text-muted)" }}
          >
            Every learning pathway connects to a real industry partner. Students get more than
            a classroom — they get access to professionals, career exposure, and dual enrollment
            college credit that counts before they ever graduate.
          </motion.p>
        </div>

        {/* ── SUBJECT TRACKS GRID ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
          {tracks.map((t, i) => (
            <TrackCard key={t.id} track={t} index={i} />
          ))}
        </div>

        {/* ── DUAL ENROLLMENT SECTION ── */}
        <div>
          {/* Sub-header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            {/* Divider */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex-1 h-px bg-gradient-to-r from-[#00D4FF]/20 to-transparent" />
              <div className="flex items-center gap-2 px-4 py-2 rounded-full border" style={{ borderColor: "var(--border-accent)", background: "rgba(var(--accent-rgb),0.05)" }}>
                <GraduationCap className="w-4 h-4" style={{ color: "var(--accent)" }} />
                <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "var(--accent)" }}>Dual Enrollment</span>
              </div>
              <div className="flex-1 h-px bg-gradient-to-l from-[#00D4FF]/20 to-transparent" />
            </div>

            <div className="max-w-3xl">
              <h3 className="font-display text-3xl md:text-4xl font-black leading-tight mb-4" style={{ color: "var(--text-primary)" }}>
                Earn Real College Credit.
                <br />
                <span style={{ color: "var(--accent)" }}>While You&apos;re Still in High School.</span>
              </h3>
              <p className="text-base leading-relaxed mb-3" style={{ color: "var(--text-muted)" }}>
                CSST students have access to the <strong style={{ color: "var(--text-primary)" }}>full course catalogs</strong> of
                two Colorado Springs institutions — not a limited subset of approved classes, but the entire
                catalog of each school.
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)", opacity: 0.7 }}>
                College credit earned is real, documented on an official transcript, and transferable.
                Many students enter their freshman year of college with a semester or more of credit
                already completed — at zero cost to their family.
              </p>
            </div>
          </motion.div>

          {/* Partner cards — large, side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {dualEnrollPartners.map((p, i) => (
              <DualEnrollCard key={p.id} partner={p} index={i} />
            ))}
          </div>

          {/* Bottom info strip */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="p-5 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            style={{ background: "var(--bg-card)", borderColor: "var(--border-subtle)" }}
          >
            <div className="flex items-start gap-3">
              <BookOpen className="w-4 h-4 text-[#00D4FF]/60 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold mb-0.5" style={{ color: "var(--text-primary)" }}>How to Get Started with Dual Enrollment</p>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)", opacity: 0.85 }}>
                  Work with your CSST counselor (Milithza McNeil) to identify courses that align with
                  your interests and count toward both HS graduation and your college plan.
                </p>
              </div>
            </div>
            <div className="flex gap-3 flex-shrink-0">
              <a
                href="https://www.uccs.edu/admissions-aid/concurrent"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#FFD700]/25 text-[#FFD700] text-xs font-semibold hover:bg-[#FFD700]/10 transition-all"
              >
                UCCS Info
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href="https://www.pikespeak.edu/academics/high-school-programs/concurrent-enrollment.php"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#60A5FA]/25 text-[#60A5FA] text-xs font-semibold hover:bg-[#60A5FA]/10 transition-all"
              >
                PPSC Info
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
