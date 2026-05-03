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
    <section id="mission" ref={ref} className="relative py-28 bg-[#0A0A0F] overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute left-1/2 top-1/3 -translate-x-1/2 w-[700px] h-[500px] bg-[#A78BFA]/5 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-4xl mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-6 text-[#A78BFA] text-xs font-medium tracking-[0.25em] uppercase"
          >
            <span className="w-8 h-px bg-[#A78BFA]" />
            Who This School Is For
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight mb-8"
          >
            The Last Era Rewarded
            <br />
            <span className="text-[#A78BFA]">the System.</span>
            <br />
            This One Is Built by People
            <br />
            <span className="text-[#00D4FF]">Who Rejected It.</span>
          </motion.h2>

          <div className="space-y-5 max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg text-[#C0C0D0]/70 leading-relaxed"
            >
              Ford. Rockefeller. Vanderbilt. They built empires through a single genius:
              systematization. Predictable hierarchies. Scalable processes. Workers who followed
              instructions. The American education system was designed alongside them — literally —
              to produce that workforce. Standardized. Reliable. Interchangeable.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.28 }}
              className="text-lg text-[#C0C0D0]/70 leading-relaxed"
            >
              Now look at who&apos;s building this century. Jobs didn&apos;t improve the phone —
              he decided the keyboard was the wrong premise. Altman didn&apos;t build a better search
              engine — he decided the interface between humans and knowledge needed to be rebuilt
              from scratch. Thiel, Karp, Zuckerberg — every one of them won by questioning whether
              the existing system should exist at all. And nearly every one of them, by their own
              account, didn&apos;t fit the mold that same education system was built to produce.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.36 }}
              className="text-base text-[#C0C0D0]/55 leading-relaxed"
            >
              And here&apos;s the part nobody says out loud: the industrial school model —
              designed for a world that no longer exists — isn&apos;t just hard on the kids who
              struggle with it. It produces the wrong outcomes for nearly every student. Nobody
              actually learns through incessant standardized testing and the real pressure of a
              system built to rank and sort. They survive it. They study for the test, pass the
              test, and forget everything by Thursday. That&apos;s not education — that&apos;s
              compliance training. The research on retention, intrinsic motivation, and genuine
              understanding has been saying this for decades.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.44 }}
              className="text-base text-[#C0C0D0]/55 leading-relaxed"
            >
              Real learning doesn&apos;t feel like school. It feels like falling down a rabbit hole
              at midnight because you can&apos;t stop. It feels like building something you didn&apos;t
              know how to build yesterday. It feels like a question that won&apos;t leave you alone.
              That&apos;s what intrinsic motivation looks like — and it&apos;s available to every
              student, not just the ones the system has already labeled as problems. CSST was built
              around a simple belief: learning should be something you want to do, not something
              you have to survive.
            </motion.p>
          </div>
        </div>

        {/* Trait subheader */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-14 mb-8"
        >
          <p className="text-[10px] font-bold tracking-[0.28em] uppercase text-[#00D4FF]/50 mb-2">
            Our Students Are
          </p>
          <div className="w-8 h-px bg-[#00D4FF]/30" />
        </motion.div>

        {/* Trait grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {traits.map(({ icon: Icon, label, sublabel, color, description }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.09 }}
              className="group relative p-6 rounded-xl border bg-[#0D0D18] transition-all duration-300 overflow-hidden"
              style={{ borderColor: `${color}15` }}
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
              <h3 className="font-display text-sm font-bold text-white mb-1 leading-tight">{label}</h3>
              <p className="text-[10px] font-semibold tracking-wider uppercase mb-3" style={{ color }}>
                {sublabel}
              </p>
              <p className="text-xs text-[#C0C0D0]/55 leading-relaxed">{description}</p>
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
          <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#00D4FF]/60 mb-6">
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
                className="p-5 rounded-xl border"
                style={{ borderColor: `${color}18`, background: `${color}06` }}
              >
                <p className="text-xs font-bold text-white mb-1.5">{label}</p>
                <p className="text-[11px] text-[#C0C0D0]/55 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Pull-quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.75 }}
          className="relative rounded-2xl border border-[#A78BFA]/20 bg-[#0D0D18] overflow-hidden p-10 mb-5"
        >
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#A78BFA]/40 to-transparent" />
          <div className="absolute top-0 left-0 w-1 bottom-0 bg-gradient-to-b from-[#A78BFA]/40 to-transparent" />

          <div className="max-w-3xl">
            <p className="font-display text-2xl md:text-3xl font-black text-white leading-tight mb-4">
              &ldquo;The last century was built by people who perfected the system.{" "}
              <span className="text-[#A78BFA]">This one is being built by people who couldn&apos;t follow it.</span>&rdquo;
            </p>
            <p className="text-sm text-[#C0C0D0]/50 leading-relaxed mb-8 max-w-2xl">
              At CSST, that&apos;s not a warning sign on an application. That&apos;s the student
              we built this school for. One of the few schools in Colorado — and among a handful
              nationally — designed from the ground up to foster the next generation of that kind of mind.
            </p>
            <Link
              href="/apply"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-[#A78BFA]/30 text-[#A78BFA] text-sm font-semibold hover:bg-[#A78BFA]/10 hover:border-[#A78BFA]/60 transition-all duration-200 group"
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
          className="relative rounded-2xl border border-[#00D4FF]/15 bg-[#0D0D18] overflow-hidden p-8 flex flex-col sm:flex-row items-start gap-6"
        >
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00D4FF]/25 to-transparent" />

          {/* D11 badge */}
          <div className="flex-shrink-0 flex flex-col items-center gap-2 pt-1">
            <div className="w-12 h-12 rounded-xl bg-[#00D4FF]/10 border border-[#00D4FF]/25 flex items-center justify-center">
              <span className="font-display text-xs font-black text-[#00D4FF] tracking-wider">D11</span>
            </div>
            <span className="text-[9px] font-bold tracking-widest uppercase text-[#00D4FF]/40 text-center leading-tight">
              Official<br />D11 Position
            </span>
          </div>

          <div>
            <p className="text-base md:text-lg text-white/85 leading-relaxed italic mb-4">
              &ldquo;CSST is built on that premise of — how do we accelerate opportunity and outcomes
              for students in space, in cyber, in entrepreneurship? We can be unique by bringing
              the power of the city and local economy directly to our students.&rdquo;
            </p>
            <div>
              <p className="text-sm font-bold text-[#00D4FF]">Michael Gaal</p>
              <p className="text-xs text-[#C0C0D0]/45">Superintendent, Colorado Springs School District 11</p>
              <p className="text-[10px] text-[#C0C0D0]/30 mt-0.5">Colorado State Board of Education, April 2024</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
