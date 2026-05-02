"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Brain, Users, Globe, Lightbulb, Zap, Eye, ArrowRight } from "lucide-react";
import Link from "next/link";

const dimensions = [
  {
    icon: Brain,
    label: "Neurodivergent Thinkers",
    sublabel: "ADHD · Autism · Dyslexia",
    color: "#00D4FF",
    description:
      "Hyperfocus. Pattern recognition. Non-linear problem solving. The cognitive traits that struggle in a traditional classroom are exactly what cybersecurity analysts, AI researchers, and systems designers need.",
  },
  {
    icon: Globe,
    label: "Every Cultural Background",
    sublabel: "Diverse perspectives, stronger solutions",
    color: "#34D399",
    description:
      "The most complex real-world problems — from global cyberthreats to humanitarian tech — are solved by teams with different lived experiences. Your background is an asset, not a footnote.",
  },
  {
    icon: Users,
    label: "Every Socioeconomic Path",
    sublabel: "Tuition free · No barriers to entry",
    color: "#A78BFA",
    description:
      "CSST is free and open to every D11 student. Zip code should never determine a student's access to the careers of the future. That's not just a policy — it's the foundation of who we are.",
  },
  {
    icon: Lightbulb,
    label: "Every Academic Starting Point",
    sublabel: "Not just 'tech kids'",
    color: "#F59E0B",
    description:
      "You don't need to know how to code to apply. You don't need straight A's. You need curiosity and the drive to grow. CSST meets every student where they are and builds from there.",
  },
  {
    icon: Zap,
    label: "Introverts & Extroverts",
    sublabel: "Builders, communicators, strategists",
    color: "#FB923C",
    description:
      "Technology needs writers, designers, communicators, and leaders just as much as it needs engineers. Every personality type has a role in building the future.",
  },
  {
    icon: Eye,
    label: "Undiagnosed & Unboxed",
    sublabel: "If school never felt like a fit",
    color: "#C0C0D0",
    description:
      "Many students arrive at CSST after years of feeling like the traditional school system wasn't built for them. It wasn't. CSST was built differently — on purpose.",
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
        <div className="max-w-3xl mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-6 text-[#A78BFA] text-xs font-medium tracking-[0.25em] uppercase"
          >
            <span className="w-8 h-px bg-[#A78BFA]" />
            Who Belongs Here
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight mb-6"
          >
            We Want
            <br />
            <span className="text-[#A78BFA]">Diverse Thinkers.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg text-[#C0C0D0]/70 leading-relaxed mb-4"
          >
            The future of technology isn&apos;t built by one type of person. It&apos;s built by
            people who think differently, come from different places, and ask questions that
            nobody else thought to ask.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.28 }}
            className="text-base text-[#C0C0D0]/55 leading-relaxed"
          >
            At CSST, diversity isn&apos;t a box we check. It&apos;s the architecture of how we
            learn, collaborate, and solve real problems — together.
          </motion.p>
        </div>

        {/* Dimension grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {dimensions.map(({ icon: Icon, label, sublabel, color, description }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.09 }}
              className="group relative p-6 rounded-xl border border-[#00D4FF]/8 bg-[#0D0D18] hover:border-opacity-40 transition-all duration-300 overflow-hidden"
              style={{ borderColor: `${color}15` }}
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

        {/* Manifesto pull-quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="relative rounded-2xl border border-[#A78BFA]/20 bg-[#0D0D18] overflow-hidden p-10"
        >
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#A78BFA]/40 to-transparent" />
          <div className="absolute top-0 left-0 w-1 bottom-0 bg-gradient-to-b from-[#A78BFA]/40 to-transparent" />

          <div className="max-w-3xl">
            <p className="font-display text-2xl md:text-3xl font-black text-white leading-tight mb-6">
              &ldquo;Traditional schools were built to produce{" "}
              <span className="text-[#A78BFA]">uniform outputs</span>. We were built to
              amplify <span className="text-[#00D4FF]">uncommon ones</span>.&rdquo;
            </p>
            <p className="text-sm text-[#C0C0D0]/50 leading-relaxed mb-8 max-w-2xl">
              That means CSST works best when students bring different backgrounds, different
              learning styles, and different life experiences into the same room. Working across
              those differences — learning to collaborate, communicate, and build with people who
              aren&apos;t like you — is itself one of the most valuable things we teach.
              Because that&apos;s exactly what the professional world demands.
            </p>
            <Link
              href="#admissions"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-[#A78BFA]/30 text-[#A78BFA] text-sm font-semibold hover:bg-[#A78BFA]/10 hover:border-[#A78BFA]/60 transition-all duration-200 group"
            >
              See If CSST Is Right for You
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
