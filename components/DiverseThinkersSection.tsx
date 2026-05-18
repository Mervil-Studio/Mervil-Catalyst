"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Zap, GitBranch, HelpCircle, Wrench, TrendingUp, Compass, ArrowRight } from "lucide-react";
import Link from "next/link";

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
    <section id="mission" ref={ref} className="relative py-28 overflow-hidden" style={{ background: "var(--bg-primary)" }}>
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute left-1/2 top-1/3 -translate-x-1/2 w-[700px] h-[500px] blur-[140px] pointer-events-none" style={{ background: "rgba(167,139,250,0.05)" }} />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-4xl mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-6 text-xs font-medium tracking-[0.25em] uppercase"
            style={{ color: "var(--accent)" }}
          >
            <span className="w-8 h-px" style={{ background: "var(--accent)" }} />
            Who This School Is For
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight mb-8"
            style={{ color: "var(--text-primary)" }}
          >
            The Last Era Rewarded
            <br />
            <span style={{ color: "var(--accent)" }}>the System.</span>
            <br />
            This One Is Built by People
            <br />
            <span style={{ color: "var(--accent-dim)" }}>Who Rejected It.</span>
          </motion.h2>

          <div className="space-y-5 max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg leading-relaxed"
            style={{ color: "var(--text-muted)" }}
          >
              The great industrialists of the 20th century — Ford, Rockefeller, Vanderbilt — built
              empires through a single genius: systematization. Predictable hierarchies. Scalable
              processes. Workers who followed instructions. The American education system was designed
              alongside them — literally — to produce that workforce. Standardized. Reliable.
              Interchangeable.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.28 }}
              className="text-lg leading-relaxed"
              style={{ color: "var(--text-muted)" }}
            >
              The leaders of the 21st century are different. The founders reshaping AI, aerospace,
              cybersecurity, and the global economy didn&apos;t win by being the best at what
              already existed. They won by deciding the premise was wrong — that the keyboard
              shouldn&apos;t exist, that the interface needed to be rebuilt from scratch, that the
              whole category was the wrong question. And by their own accounts, almost universally,
              they didn&apos;t fit the mold that same education system was built to produce.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.36 }}
              className="text-base leading-relaxed"
              style={{ color: "var(--text-muted)", opacity: 0.75 }}
            >
              The research on genuine retention and intrinsic motivation has been making one thing
              clear for decades: when students are learning only to pass a test, they aren&apos;t
              really learning. CSST was designed so that&apos;s never the point. The more
              interesting question — the one this school was built to answer — is what learning
              actually looks like when it works.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.44 }}
              className="text-base leading-relaxed"
              style={{ color: "var(--text-muted)", opacity: 0.75 }}
            >
              It feels like falling down a rabbit hole at midnight because you can&apos;t stop.
              Like building something you didn&apos;t know how to build yesterday. Like a question
              that won&apos;t leave you alone — and being in an environment that actually wants you
              to chase it rather than redirect you back to the syllabus. That&apos;s what CSST was
              built around: learning driven by genuine curiosity, connected to real work and real
              industry, available to every kind of student. When school is designed this way,
              students don&apos;t just perform better. They want to be there.
            </motion.p>
          </div>
        </div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.52 }}
          className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-5"
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
              transition={{ duration: 0.5, delay: 0.56 + i * 0.1 }}
              className="relative p-5 rounded-xl border"
              style={{ background: "var(--bg-card)" }}
              style={{ borderColor: `${color}15` }}
            >
              <span className="absolute top-3 right-4 font-display text-4xl font-black leading-none select-none" style={{ color: `${color}12` }}>&ldquo;</span>
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

        {/* Trait subheader */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-14 mb-8"
        >
          <p className="text-[10px] font-bold tracking-[0.28em] uppercase mb-2" style={{ color: "var(--accent)" }}>
            Our Students Are
          </p>
          <div className="w-8 h-px" style={{ background: "var(--accent)", opacity: 0.4 }} />
        </motion.div>

        {/* Trait grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {traits.map(({ icon: Icon, label, sublabel, color, description }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.09 }}
              className="group relative p-6 rounded-xl border transition-all duration-300 overflow-hidden"
              style={{ background: "#0D0D18", borderColor: `${color}15` }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${color}38`)}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = `${color}15`)}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: `radial-gradient(ellipse at top left, ${color}07, transparent 60%)` }}
              />
              <div
                className="w-11 h-11 rounded-lg flex items-center justify-center border mb-4"
                style={{ background: `${color}10`, borderColor: `${color}22` }}
              >
                <Icon className="w-5 h-5" style={{ color }} strokeWidth={1.5} />
              </div>
              <h3 className="font-display text-sm font-bold mb-1 leading-tight text-white">{label}</h3>
              <p className="text-[10px] font-semibold tracking-wider uppercase mb-3" style={{ color }}>
                {sublabel}
              </p>
              <p className="text-xs leading-relaxed text-[#C0C0D0]/60">{description}</p>
            </motion.div>
          ))}
        </div>

        {/* What this looks like in practice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="mb-10"
        >
          <p className="text-[10px] font-bold tracking-[0.25em] uppercase mb-6" style={{ color: "var(--accent)" }}>
            What This Looks Like in Practice
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                label: "If you're neurodivergent",
                body: "You'll find out what you're actually capable of when the environment is built for you instead of against you. Not accommodated — directed.",
                color: "#A78BFA",
              },
              {
                label: "If you're neurotypical",
                body: "You'll learn to recognize the most underestimated talent in any room — and build teams that outperform because of it, not despite it.",
                color: "#00D4FF",
              },
              {
                label: "If you struggled in school",
                body: "The system wasn't measuring the right things. CSST is built around the skills that actually transfer — curiosity, problem-solving, and the ability to work on things that matter.",
                color: "#34D399",
              },
              {
                label: "The bigger point",
                body: "The best cyber, aerospace, and entrepreneurship teams aren't built from people who think identically. They're built by people who know how to multiply each other's differences.",
                color: "#F59E0B",
              },
            ].map(({ label, body, color }) => (
              <div
                key={label}
                className="p-5 rounded-xl border-l-[3px] border"
                style={{
                  borderColor: "var(--border-subtle)",
                  borderLeftColor: color,
                  background: "var(--bg-card)",
                }}
              >
                <p className="text-xs font-bold mb-1.5" style={{ color: "var(--text-primary)" }}>{label}</p>
                <p className="text-[11px] leading-relaxed" style={{ color: "var(--text-muted)" }}>{body}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Pull-quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.75 }}
          className="relative rounded-2xl border overflow-hidden p-10 mb-5"
          style={{ background: "var(--bg-card)", borderColor: "var(--border-accent)" }}
        >
          <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, var(--accent), transparent)", opacity: 0.5 }} />
          <div className="absolute top-0 left-0 w-1 bottom-0" style={{ background: "linear-gradient(to bottom, var(--accent), transparent)", opacity: 0.4 }} />

          <div className="max-w-3xl">
            <p className="font-display text-2xl md:text-3xl font-black leading-tight mb-4" style={{ color: "var(--text-primary)" }}>
              &ldquo;The last century was built by people who perfected the system.{" "}
              <span style={{ color: "var(--accent)" }}>This one is being built by people who couldn&apos;t follow it.</span>&rdquo;
            </p>
            <p className="text-sm leading-relaxed mb-8 max-w-2xl" style={{ color: "var(--text-muted)", opacity: 0.7 }}>
              At CSST, that&apos;s not a warning sign on an application. That&apos;s the student
              we built this school for. One of the few schools in Colorado — and among a handful
              nationally — designed from the ground up to foster the next generation of that kind of mind.
            </p>
            <Link
              href="/apply"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border text-sm font-semibold transition-all duration-200 group"
              style={{ borderColor: "var(--border-accent)", color: "var(--accent)" }}
            >
              See If CSST Is Right for You
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </motion.div>

        {/* Superintendent quote */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="relative rounded-2xl border overflow-hidden p-8 flex flex-col sm:flex-row items-start gap-6"
          style={{ background: "var(--bg-card)", borderColor: "var(--border-accent)" }}
        >
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00D4FF]/25 to-transparent" />

          {/* D11 badge */}
          <div className="flex-shrink-0 flex flex-col items-center gap-2 pt-1">
            <div className="w-12 h-12 rounded-xl border flex items-center justify-center" style={{ background: "rgba(var(--accent-rgb),0.10)", borderColor: "var(--border-accent)" }}>
              <span className="font-display text-xs font-black tracking-wider" style={{ color: "var(--accent)" }}>D11</span>
            </div>
            <span className="text-[9px] font-bold tracking-widest uppercase text-center leading-tight" style={{ color: "rgba(var(--accent-rgb),0.40)" }}>
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
