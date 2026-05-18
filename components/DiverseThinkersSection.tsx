"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Zap, GitBranch, HelpCircle, Wrench, TrendingUp, Compass } from "lucide-react";

const traits = [
  {
    icon: Zap,
    label: "The Hyperfocused",
    sublabel: "Goes 10x deeper than anyone asked",
    color: "#F59E0B",
    description:
      "When something clicks, the world disappears. Hours vanish. This level of concentrated immersion — misread as inattention in traditional school — is the mode every elite cyber analyst, AI researcher, and systems architect operates in.",
  },
  {
    icon: GitBranch,
    label: "The Pattern Spotter",
    sublabel: "Sees the system behind the system",
    color: "#00D4FF",
    description:
      "Makes connections across things that seem completely unrelated. Thinks in webs, not lines. In intelligence analysis, aerospace systems, and product architecture, this is the difference between a good analyst and a great one.",
  },
  {
    icon: HelpCircle,
    label: "The Question-Asker",
    sublabel: "Couldn't stop asking why",
    color: "#A78BFA",
    description:
      "Not defiant — genuinely confused why nobody else wanted the reason. Teachers called it disruptive. Every founder alive calls it their most important trait.",
  },
  {
    icon: Wrench,
    label: "The Hands-On Learner",
    sublabel: "Has to build it to understand it",
    color: "#34D399",
    description:
      "Lectures never landed. Projects always did. The ability to prototype, break, and rebuild is the real skill. CSST is designed around doing — not watching.",
  },
  {
    icon: TrendingUp,
    label: "The Unconventional Student",
    sublabel: "Grades didn't tell the story",
    color: "#FB923C",
    description:
      "GPA measures one kind of intelligence. Curiosity, creativity, and the ability to solve a problem nobody has seen before are different measurements entirely — and the ones that actually matter.",
  },
  {
    icon: Compass,
    label: "The One Who Never Quite Fit",
    sublabel: "Not disengaged. Mis-assigned.",
    color: "#C0C0D0",
    description:
      "This isn't the kid who doesn't care. It's the kid whose environment was always wrong. Give them the right room and they catch fire. That's what CSST was built to be.",
  },
];

export default function DiverseThinkersSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="mission" ref={ref} className="relative py-20 overflow-hidden" style={{ background: "var(--bg-primary)" }}>
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute left-1/2 top-1/3 -translate-x-1/2 w-[700px] h-[500px] blur-[140px] pointer-events-none" style={{ background: "rgba(var(--accent-rgb),0.05)" }} />

      <div className="max-w-7xl mx-auto px-6">

        {/* Student quotes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16"
        >
          {[
            { quote: "On our drive to school Monday, I was talking with my daughter about her teachers. She was unable to pick a favorite because they were all SOOOO AWESOME!", name: "Bruce", role: "CSST Parent", color: "#00D4FF" },
            { quote: "I was actually excited for break to be over so I could come back to school and be around all of these amazing people!", name: "Dominic", role: "CSST Student", color: "#A78BFA" },
            { quote: "My son LOVES this school and comes home happy, excited and eager for school the next day. I really appreciate you all!", name: "Destiny", role: "CSST Parent", color: "#34D399" },
          ].map(({ quote, name, role, color }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
              className="relative p-5 rounded-xl border"
              style={{ background: "var(--bg-card)", borderColor: `${color}20` }}
            >
              <span className="absolute top-3 right-4 font-display text-4xl font-black leading-none select-none" style={{ color: `${color}18` }}>&ldquo;</span>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>&ldquo;{quote}&rdquo;</p>
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0" style={{ background: `${color}18`, color }}>{name[0]}</div>
                <div>
                  <p className="text-xs font-semibold" style={{ color: "var(--text-primary)" }}>{name}</p>
                  <p className="text-[10px]" style={{ color: "var(--text-muted)", opacity: 0.6 }}>{role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* "Our Students Are" section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-10"
        >
          <div
            className="inline-flex items-center gap-2 mb-4 text-xs font-medium tracking-[0.25em] uppercase"
            style={{ color: "var(--accent)" }}
          >
            <span className="w-8 h-px" style={{ background: "var(--accent)" }} />
            Who This School Is For
          </div>
          <h2
            className="font-display text-3xl md:text-4xl lg:text-5xl font-black leading-tight tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Our Students Are
          </h2>
        </motion.div>

        {/* Trait grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {traits.map(({ icon: Icon, label, sublabel, color, description }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.09 }}
              className="group relative p-7 rounded-xl border transition-all duration-300 overflow-hidden"
              style={{ background: "#0D0D18", borderColor: `${color}20` }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${color}45`)}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = `${color}20`)}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: `radial-gradient(ellipse at top left, ${color}09, transparent 60%)` }}
              />
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center border mb-5"
                style={{ background: `${color}15`, borderColor: `${color}30` }}
              >
                <Icon className="w-6 h-6" style={{ color }} strokeWidth={1.5} />
              </div>
              <h3 className="font-display text-base font-bold mb-1.5 leading-tight" style={{ color: "#FFFFFF" }}>{label}</h3>
              <p className="text-[11px] font-semibold tracking-wider uppercase mb-3" style={{ color }}>
                {sublabel}
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "#D0D0E8", opacity: 0.85 }}>{description}</p>
            </motion.div>
          ))}
        </div>

        {/* Superintendent quote */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="relative rounded-2xl border overflow-hidden p-8 flex flex-col sm:flex-row items-start gap-6"
          style={{ background: "var(--bg-card)", borderColor: "var(--border-accent)" }}
        >
          <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, var(--accent), transparent)", opacity: 0.3 }} />

          {/* D11 badge */}
          <div className="flex-shrink-0 flex flex-col items-center gap-2 pt-1">
            <div className="w-12 h-12 rounded-xl border flex items-center justify-center" style={{ background: "rgba(var(--accent-rgb),0.10)", borderColor: "var(--border-accent)" }}>
              <span className="font-display text-xs font-black tracking-wider" style={{ color: "var(--accent)" }}>D11</span>
            </div>
            <span className="text-[9px] font-bold tracking-widest uppercase text-center leading-tight" style={{ color: "rgba(var(--accent-rgb),0.45)" }}>
              Official<br />D11 Position
            </span>
          </div>

          <div>
            <p className="text-base md:text-lg leading-relaxed italic mb-4" style={{ color: "var(--text-primary)", opacity: 0.85 }}>
              &ldquo;CSST is built on that premise of — how do we accelerate opportunity and outcomes
              for students in space, in cyber, in entrepreneurship? We can be unique by bringing
              the power of the city and local economy directly to our students.&rdquo;
            </p>
            <div>
              <p className="text-sm font-bold" style={{ color: "var(--accent)" }}>Michael Gaal</p>
              <p className="text-xs" style={{ color: "var(--text-muted)", opacity: 0.6 }}>Superintendent, Colorado Springs School District 11</p>
              <p className="text-[10px] mt-0.5" style={{ color: "var(--text-muted)", opacity: 0.4 }}>Colorado State Board of Education, April 2024</p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
