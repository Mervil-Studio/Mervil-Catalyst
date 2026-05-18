"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Lightbulb, TrendingUp, Users, Presentation, Rocket, ChevronRight, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const stages = [
  {
    icon: Lightbulb,
    stage: "Stage 1",
    title: "Identify & Ideate",
    description:
      "Learn design thinking, problem framing, and how to turn a vague frustration into a clear opportunity worth solving. Every successful company started with a question, not an answer.",
    color: "#F59E0B",
  },
  {
    icon: Users,
    stage: "Stage 2",
    title: "Build Your Team",
    description:
      "Great startups aren't solo acts. Students practice team formation, role definition, and working effectively with people whose strengths complement their own.",
    color: "#00D4FF",
  },
  {
    icon: TrendingUp,
    stage: "Stage 3",
    title: "Validate & Prototype",
    description:
      "Get out of the building. Talk to real users. Build a minimum viable product and test it before you fall in love with your own idea — the most important startup habit there is.",
    color: "#34D399",
  },
  {
    icon: Presentation,
    stage: "Stage 4",
    title: "Pitch & Iterate",
    description:
      "Present your work to real mentors from the XI Accelerator and broader CSST ecosystem. Get hard feedback. Revise. Improve. Repeat — because iteration is the actual product.",
    color: "#A78BFA",
  },
];

const outcomes = [
  "Build a real pitch deck and business canvas",
  "Present to active entrepreneurs and investors",
  "Access the XI Accelerator mentor network",
  "Learn unit economics, pricing, and market sizing",
  "Practice public speaking and persuasion under real pressure",
  "Graduate with a portfolio of built things, not just grades",
];

export default function EntrepreneurshipSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="entrepreneurship" ref={ref} className="relative py-28 overflow-hidden" style={{ background: "var(--bg-primary)" }}>
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-80 h-[600px] blur-[120px] pointer-events-none" style={{ background: "rgba(245,158,11,0.05)" }} />
      <div className="absolute right-0 bottom-0 w-60 h-60 blur-[100px] pointer-events-none" style={{ background: "rgba(167,139,250,0.05)" }} />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-16">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 mb-6 text-[#F59E0B] text-xs font-medium tracking-[0.25em] uppercase"
            >
              <span className="w-8 h-px bg-[#F59E0B]" />
              XI Accelerator Pathway
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight mb-6"
            style={{ color: "var(--text-primary)" }}
            >
              Build Something
              <br />
              <span className="text-[#F59E0B]">Real.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg leading-relaxed mb-6"
              style={{ color: "var(--text-muted)" }}
            >
              Entrepreneurship at CSST isn&apos;t a class where you write a fake business plan
              and move on. It&apos;s a live environment connected to the XI Accelerator where
              students work through the actual process of identifying problems, building
              solutions, and presenting to people with real stakes in the outcome.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.28 }}
              className="text-base leading-relaxed mb-8"
              style={{ color: "var(--text-muted)", opacity: 0.75 }}
            >
              This pathway isn&apos;t only for students who want to start a company. It&apos;s
              for anyone who wants to develop the mindset of a builder — the ability to spot an
              opportunity, communicate a vision, and execute with a team. That set of skills is
              valuable everywhere.
            </motion.p>

            {/* Outcomes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="space-y-2.5"
            >
              {outcomes.map((o) => (
                <div key={o} className="flex items-start gap-3">
                  <ArrowRight className="w-3.5 h-3.5 text-[#F59E0B] flex-shrink-0 mt-0.5" />
                  <span className="text-sm" style={{ color: "var(--text-muted)", opacity: 0.8 }}>{o}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: XI Accelerator card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative rounded-2xl border overflow-hidden"
            style={{ background: "var(--bg-card)", borderColor: "rgba(245,158,11,0.20)" }}
          >
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#F59E0B]/40 to-transparent z-10" />

            {/* Photo header */}
            <div className="relative w-full overflow-hidden" style={{ height: 200 }}>
              <Image
                src="https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=900&h=400&fit=crop&auto=format&q=75"
                alt="Student presenting at pitch day — placeholder for CSST pitch event"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.10), transparent, var(--bg-card))" }} />
              <div className="absolute bottom-3 left-4 text-[9px] text-white/40 font-medium tracking-wide">
                Placeholder · Replace with real CSST pitch day photo
              </div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-b from-[#F59E0B]/5 to-transparent pointer-events-none" />

            <div className="relative p-8">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center border border-[#F59E0B]/25 bg-[#F59E0B]/10 mb-6">
                <Rocket className="w-7 h-7 text-[#F59E0B]" strokeWidth={1.5} />
              </div>

              <h3 className="font-display text-2xl font-black mb-2" style={{ color: "var(--text-primary)" }}>
                Exponential Impact
              </h3>
              <p className="text-sm font-medium text-[#F59E0B] mb-5">
                Colorado Springs&apos; Premier Startup Accelerator
              </p>
              <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--text-muted)", opacity: 0.8 }}>
                Exponential Impact has launched dozens of ventures across the Colorado Springs
                region. CSST founder Vance Brown previously led both XI and the National
                Cybersecurity Center — meaning the connection between this school and the
                startup ecosystem isn&apos;t incidental. It&apos;s foundational.
              </p>

              <div className="space-y-3 mb-8">
                {[
                  "Active entrepreneur mentors in the building",
                  "Real pitch events with external audiences",
                  "Connection to regional investor network",
                  "Pathway to post-graduation venture support",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-xs" style={{ color: "var(--text-muted)", opacity: 0.7 }}>
                    <span className="w-1 h-1 rounded-full bg-[#F59E0B] flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>

              <a
                href="https://www.exponentialimpact.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-semibold transition-colors group"
                style={{ color: "#F59E0B" }}
              >
                Visit Exponential Impact
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Journey stages */}
        <div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-medium tracking-[0.2em] text-[#F59E0B]/50 uppercase mb-8"
          >
            The Entrepreneurship Journey
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stages.map(({ icon: Icon, stage, title, description, color }, i) => (
              <motion.div
                key={stage}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative group p-6 rounded-xl border transition-all duration-300 overflow-hidden"
                style={{ background: "var(--bg-card)", borderColor: `${color}15` }}
                style={{ borderColor: `${color}15` }}
              >
                {/* Stage number background */}
                <span className="absolute top-4 right-4 font-display text-4xl font-black opacity-5 group-hover:opacity-10 transition-opacity" style={{ color }}>
                  {i + 1}
                </span>
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center border mb-4"
                  style={{ background: `${color}10`, borderColor: `${color}22` }}
                >
                  <Icon className="w-5 h-5" style={{ color }} strokeWidth={1.5} />
                </div>
                <p className="text-[10px] font-bold tracking-widest uppercase mb-1" style={{ color }}>
                  {stage}
                </p>
                <h3 className="text-sm font-bold mb-3" style={{ color: "var(--text-primary)" }}>{title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)", opacity: 0.7 }}>{description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
