"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowRight, X, ChevronRight } from "lucide-react";
import Link from "next/link";

// ─── BLUEPRINT: Circuit traces (ADHD) ────────────────────────────────────────
function CircuitBlueprint({ hovered }: { hovered: boolean }) {
  return (
    <svg viewBox="0 0 280 180" className="absolute inset-0 w-full h-full" aria-hidden fill="none">
      {[0, 45, 90, 135, 180].map((y) => (
        <line key={`h${y}`} x1="0" y1={y} x2="280" y2={y} stroke="#F59E0B" strokeWidth="0.35" strokeDasharray="2 8" />
      ))}
      {[0, 56, 112, 168, 224, 280].map((x) => (
        <line key={`v${x}`} x1={x} y1="0" x2={x} y2="180" stroke="#F59E0B" strokeWidth="0.35" strokeDasharray="2 8" />
      ))}
      <motion.path
        d="M 20 90 H 70 V 45 H 140 V 90 H 210 V 135 H 260"
        stroke="#F59E0B" strokeWidth="1.4" strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={hovered ? { pathLength: 1, opacity: 0.9 } : { pathLength: 0.4, opacity: 0.25 }}
        transition={{ duration: 1.1, ease: "easeInOut" }}
      />
      <motion.path
        d="M 0 135 H 90 V 45 H 190 V 90 H 280"
        stroke="#F59E0B" strokeWidth="0.8" strokeLinecap="round" strokeDasharray="5 3"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={hovered ? { pathLength: 1, opacity: 0.5 } : { pathLength: 0.25, opacity: 0.12 }}
        transition={{ duration: 1.4, delay: 0.2, ease: "easeInOut" }}
      />
      {[[70,90],[140,45],[140,90],[210,90],[210,135],[90,45],[90,135],[190,90]].map(([cx, cy], i) => (
        <motion.circle key={i} cx={cx} cy={cy} r="3.5" fill="#F59E0B"
          initial={{ scale: 0, opacity: 0 }}
          animate={hovered ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0.2 }}
          transition={{ duration: 0.3, delay: 0.05 * i }}
        />
      ))}
      <AnimatePresence>
        {hovered && [0,0.7].map((delay, i) => (
          <motion.circle key={i} cx={140} cy={90} r="4" stroke="#F59E0B" strokeWidth="1"
            initial={{ scale: 1, opacity: 0.8 }}
            animate={{ scale: 7, opacity: 0 }}
            exit={{}}
            transition={{ duration: 1.4, repeat: Infinity, delay }}
          />
        ))}
      </AnimatePresence>
    </svg>
  );
}

// ─── BLUEPRINT: Neural network (Autism) ──────────────────────────────────────
function NeuralBlueprint({ hovered }: { hovered: boolean }) {
  const nodes: [number,number][] = [[140,90],[70,45],[210,45],[70,135],[210,135],[28,90],[252,90],[140,18],[140,162]];
  const edges = [[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],[0,8],[1,2],[1,5],[1,7],[2,6],[2,7],[3,4],[3,5],[3,8],[4,6],[4,8]];
  return (
    <svg viewBox="0 0 280 180" className="absolute inset-0 w-full h-full" aria-hidden fill="none">
      {edges.map(([a, b], i) => (
        <motion.line key={i}
          x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]}
          stroke="#00D4FF" strokeWidth="0.7"
          initial={{ opacity: 0 }}
          animate={hovered ? { opacity: 0.65 } : { opacity: 0.12 }}
          transition={{ duration: 0.35, delay: 0.03 * i }}
        />
      ))}
      {nodes.map(([cx, cy], i) => (
        <motion.circle key={i} cx={cx} cy={cy} r={i === 0 ? 8 : 4}
          fill={i === 0 ? "#00D4FF" : "none"} stroke="#00D4FF" strokeWidth={i === 0 ? 1.5 : 1}
          initial={{ scale: 0 }}
          animate={hovered ? { scale: 1 } : { scale: i === 0 ? 0.7 : 0.35 }}
          transition={{ duration: 0.3, delay: 0.04 * i }}
        />
      ))}
      <AnimatePresence>
        {hovered && (
          <motion.circle cx={140} cy={90} r="8" stroke="#00D4FF" strokeWidth="1"
            initial={{ scale: 1, opacity: 0.9 }}
            animate={{ scale: 6, opacity: 0 }}
            exit={{}}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}
      </AnimatePresence>
    </svg>
  );
}

// ─── BLUEPRINT: Branching paths (Dyslexia) ───────────────────────────────────
function PathBlueprint({ hovered }: { hovered: boolean }) {
  return (
    <svg viewBox="0 0 280 180" className="absolute inset-0 w-full h-full" aria-hidden fill="none">
      {[30, 70, 110, 150].map((y) => (
        <line key={y} x1="0" y1={y} x2="280" y2={y} stroke="#A78BFA" strokeWidth="0.3" strokeDasharray="3 10" />
      ))}
      <motion.path d="M 20 90 C 70 20, 120 160, 170 70 S 240 110, 260 90"
        stroke="#A78BFA" strokeWidth="1.4" strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={hovered ? { pathLength: 1, opacity: 0.85 } : { pathLength: 0.45, opacity: 0.25 }}
        transition={{ duration: 1.3, ease: "easeInOut" }}
      />
      <motion.path d="M 20 90 C 70 140, 120 30, 170 110 S 240 70, 260 90"
        stroke="#A78BFA" strokeWidth="1" strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={hovered ? { pathLength: 1, opacity: 0.55 } : { pathLength: 0.35, opacity: 0.14 }}
        transition={{ duration: 1.5, delay: 0.15, ease: "easeInOut" }}
      />
      <motion.path d="M 20 90 L 260 90"
        stroke="#A78BFA" strokeWidth="0.6" strokeDasharray="3 5"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={hovered ? { pathLength: 1, opacity: 0.28 } : { pathLength: 0.5, opacity: 0.1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />
      <motion.circle cx={260} cy={90} r="5.5" fill="#A78BFA"
        animate={hovered ? { scale: [1,1.5,1], opacity: 1 } : { scale: 0.5, opacity: 0.2 }}
        transition={hovered ? { duration: 1.1, repeat: Infinity } : { duration: 0.35 }}
      />
      <motion.circle cx={20} cy={90} r="4" stroke="#A78BFA" strokeWidth="1"
        animate={{ opacity: hovered ? 0.9 : 0.2 }} transition={{ duration: 0.35 }}
      />
    </svg>
  );
}

// ─── DATA ─────────────────────────────────────────────────────────────────────
const edges = [
  {
    id: "ADHD",
    color: "#F59E0B",
    Blueprint: CircuitBlueprint,
    // What the old system said
    oldLabel: "Can't focus. Impulsive. Disruptive.",
    // What it actually is
    headline: "Rapid Iteration Engine.",
    body: "The mind that builds things while others are still planning. Burst-mode concentration on problems that matter. Dopamine-driven risk tolerance. In a cybersecurity red team or a product sprint, this isn't a liability — it's the engine.",
    hoverTitle: "What this looks like in the real world:",
    hoverPoints: [
      "Zero-to-one velocity that outpaces linear thinkers",
      "Spots overlooked attack vectors because the mind never stops probing",
      "Thrives in high-stakes, high-novelty environments — exactly like a SOC under fire",
      "Context-switches at speed — a feature in agile operations, not a bug",
    ],
  },
  {
    id: "Autism",
    color: "#00D4FF",
    Blueprint: NeuralBlueprint,
    oldLabel: "Socially rigid. Inflexible. Difficult.",
    headline: "Systems Logic. Pattern Recognition.",
    body: "The mind that catches what everyone else missed. Sees the architecture beneath the noise. Finds the edge case in 10,000 lines of code. In intelligence analysis, systems architecture, or AI auditing, this is not a diagnosis — it's a superpower.",
    hoverTitle: "What this looks like in the real world:",
    hoverPoints: [
      "Anomaly detection in high-dimensional data — the core skill of a world-class SOC analyst",
      "Rule-set logic that catches edge cases others systematically skip",
      "Deep domain commitment: the architecture of subject-matter expertise",
      "Precise, unambiguous communication — a feature in mission-critical systems",
    ],
  },
  {
    id: "Dyslexia",
    color: "#A78BFA",
    Blueprint: PathBlueprint,
    oldLabel: "Slow reader. Needs extra time. Behind.",
    headline: "Spatial Genius. Non-Linear Pathfinding.",
    body: "Sees the answer before the conventional path exists. 3D spatial cognition. Big-picture synthesis that bypasses logical traps. Dyslexic thinkers often solve problems by routes that standard linear minds never consider — which is exactly why they end up building things nobody expected.",
    hoverTitle: "What this looks like in the real world:",
    hoverPoints: [
      "Spatial reasoning that maps directly to hardware design and aerospace systems",
      "Solution-first thinking — the answer arrives before the methodology is formalized",
      "Narrative pattern recognition: the signal skill of elite intelligence analysts",
      "Cross-domain synthesis that standard thinkers systematically miss",
    ],
  },
];

// ─── COGNITIVE CARD ───────────────────────────────────────────────────────────
function CognitiveCard({ entry, index, inView }: { entry: typeof edges[0]; index: number; inView: boolean }) {
  const [hovered, setHovered] = useState(false);
  const { id, color, Blueprint, oldLabel, headline, body, hoverTitle, hoverPoints } = entry;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.2 + index * 0.14 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative rounded-2xl border overflow-hidden cursor-default transition-all duration-500"
      style={{
        borderColor: hovered ? `${color}50` : `${color}20`,
        background: "linear-gradient(145deg, #0D0D18 0%, #0A0A0F 100%)",
        boxShadow: hovered ? `0 0 60px ${color}12, 0 4px 40px rgba(0,0,0,0.5)` : "0 2px 20px rgba(0,0,0,0.3)",
      }}
    >
      {/* Blueprint background */}
      <div
        className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none"
        style={{ opacity: hovered ? 0.22 : 0.07, transition: "opacity 0.5s" }}
      >
        <Blueprint hovered={hovered} />
      </div>

      {/* Top accent */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[2px]"
        animate={{ opacity: hovered ? 1 : 0.35 }}
        transition={{ duration: 0.35 }}
        style={{ background: `linear-gradient(90deg, transparent 0%, ${color} 25%, ${color} 75%, transparent 100%)` }}
      />

      <div className="relative z-10 p-8">
        {/* Old label — struck through */}
        <motion.div
          className="flex items-center gap-2 mb-5"
          animate={{ opacity: hovered ? 0.4 : 0.55 }}
          transition={{ duration: 0.3 }}
        >
          <X className="w-3 h-3 flex-shrink-0" style={{ color: `${color}60` }} />
          <span
            className="text-[10px] font-medium tracking-wider line-through"
            style={{ color: `${color}55`, textDecorationColor: `${color}60` }}
          >
            {oldLabel}
          </span>
        </motion.div>

        {/* Condition name */}
        <h3
          className="font-display text-5xl font-black leading-none mb-3 tracking-tight"
          style={{ color: "white" }}
        >
          {id}
        </h3>

        {/* What it actually is */}
        <p
          className="text-base font-bold leading-snug mb-4"
          style={{ color }}
        >
          {headline}
        </p>

        {/* Base description */}
        <p className="text-sm text-[#C0C0D0]/60 leading-relaxed mb-6">
          {body}
        </p>

        {/* Hover reveal: real-world points */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.3 }}
              className="border-t pt-5"
              style={{ borderColor: `${color}20` }}
            >
              <p className="text-[10px] font-bold tracking-[0.22em] uppercase mb-3" style={{ color: `${color}80` }}>
                {hoverTitle}
              </p>
              <div className="space-y-2.5">
                {hoverPoints.map((pt, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.07 * i, duration: 0.22 }}
                    className="flex items-start gap-2.5"
                  >
                    <ChevronRight className="w-3 h-3 mt-0.5 flex-shrink-0" style={{ color: `${color}65` }} />
                    <span className="text-xs text-[#C0C0D0]/70 leading-snug">{pt}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ─── MAIN EXPORT ──────────────────────────────────────────────────────────────
export default function NeurodiversitySection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="neuro"
      ref={ref}
      className="relative py-32 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #07070F 0%, #0A0A0F 50%, #07070F 100%)" }}
    >
      {/* Blueprint grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(167,139,250,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(167,139,250,0.035) 1px, transparent 1px)
          `,
          backgroundSize: "56px 56px",
        }}
      />

      {/* Ambient glow */}
      <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#A78BFA]/5 blur-[180px] pointer-events-none rounded-full" />
      <div className="absolute right-1/4 top-1/4 w-[500px] h-[500px] bg-[#00D4FF]/4 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-4xl mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-6 text-[#A78BFA] text-xs font-medium tracking-[0.28em] uppercase"
          >
            <span className="w-8 h-px bg-[#A78BFA]" />
            The Neuro-Innovation Manifesto
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.05] tracking-tight mb-8"
          >
            Traditional schools called
            <br />
            these <span className="text-[#A78BFA]">defects.</span>
            <br />
            We call them the future.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.28 }}
            className="text-lg text-[#C0C0D0]/65 leading-relaxed max-w-2xl"
          >
            ADHD, Autism, and Dyslexia aren&apos;t being managed here. They&apos;re being{" "}
            <span className="text-white font-medium">directed. Celebrated. Given space.</span>{" "}
            These are the cognitive architectures that built the modern cybersecurity stack, designed
            guidance systems for spacecraft, and found the zero-days nobody else could see.
            In the world these students are entering, atypical thinking isn&apos;t a liability —
            it&apos;s the edge.
          </motion.p>
        </div>

        {/* Three cognitive cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {edges.map((entry, i) => (
            <CognitiveCard key={entry.id} entry={entry} index={i} inView={inView} />
          ))}
        </div>

        {/* Partnership panel — the neurotypical angle */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="relative rounded-2xl overflow-hidden border border-[#A78BFA]/18 bg-[#0D0D18]"
        >
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#A78BFA]/45 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00D4FF]/20 to-transparent" />

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
            {/* Left: the shift in framing */}
            <div
              className="lg:col-span-2 p-10 border-b lg:border-b-0 lg:border-r"
              style={{ borderColor: "rgba(167,139,250,0.12)" }}
            >
              <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#A78BFA]/60 mb-4">
                For Every Student
              </p>
              <p className="font-display text-2xl font-black text-white leading-tight mb-4">
                This isn&apos;t about sympathy.
                <br />
                It&apos;s about{" "}
                <span className="text-[#00D4FF]">better outcomes.</span>
              </p>
              <p className="text-sm text-[#C0C0D0]/55 leading-relaxed">
                Whether you&apos;re neurodivergent or neurotypical, Mervil Catalyst teaches you the same
                high-value skill: how to recognize, respect, and build alongside minds that are
                wired differently than yours. That&apos;s not compassion — it&apos;s a
                competitive advantage most graduates never develop.
              </p>
            </div>

            {/* Right: what this means in practice */}
            <div className="lg:col-span-3 p-10">
              <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#00D4FF]/60 mb-6">
                The Partnership Multiplier
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
                {[
                  {
                    label: "If you're neurodivergent",
                    body: "You'll find out what you're actually capable of when the system is built for you instead of against you. Not accommodated. Directed.",
                    color: "#A78BFA",
                  },
                  {
                    label: "If you're neurotypical",
                    body: "You'll learn to recognize the most underestimated talent in any room — and build teams that outperform because of it, not despite it.",
                    color: "#00D4FF",
                  },
                  {
                    label: "For future employers",
                    body: "Mervil Catalyst graduates understand cognitive diversity as a strategic asset. They build more resilient teams, ship better products, and solve harder problems.",
                    color: "#34D399",
                  },
                  {
                    label: "The bigger point",
                    body: "The best cyber and aerospace teams aren't built from people who think the same way. They're built by people who know how to multiply each other's strengths.",
                    color: "#F59E0B",
                  },
                ].map(({ label, body, color }) => (
                  <div
                    key={label}
                    className="p-4 rounded-xl border"
                    style={{ borderColor: `${color}18`, background: `${color}06` }}
                  >
                    <p className="text-xs font-bold text-white mb-1.5">{label}</p>
                    <p className="text-[11px] text-[#C0C0D0]/55 leading-relaxed">{body}</p>
                  </div>
                ))}
              </div>
              <Link
                href="/apply"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-[#A78BFA]/30 text-[#A78BFA] text-sm font-semibold hover:bg-[#A78BFA]/10 hover:border-[#A78BFA]/55 transition-all duration-200 group"
              >
                Apply — Free, Open to Every Student
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
