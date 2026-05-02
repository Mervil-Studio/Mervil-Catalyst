"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Brain, Eye, Zap, ArrowRight } from "lucide-react";
import Link from "next/link";

const edges = [
  {
    icon: Zap,
    label: "ADHD",
    edge: "Hyperfocus Engine",
    description:
      "Sustained, high-intensity concentration on novel problems. What others call a deficit, we call a superpower for zero-to-one building.",
    color: "#F59E0B",
  },
  {
    icon: Brain,
    label: "Autism",
    edge: "Pattern Recognition Core",
    description:
      "Exceptional ability to detect anomalies in complex systems — the exact skill that defines elite threat hunters and systems architects.",
    color: "#00D4FF",
  },
  {
    icon: Eye,
    label: "Dyslexia",
    edge: "Non-Linear Problem Solving",
    description:
      "Spatial reasoning and big-picture thinking that bypasses conventional logic traps. Dyslexic thinkers often see solutions before others see the problem.",
    color: "#A78BFA",
  },
];

export default function NeurodiversitySection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="mission" ref={ref} className="relative py-28 bg-[#0A0A0F] overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-25" />

      {/* Glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#A78BFA]/6 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 mb-6 text-[#A78BFA] text-xs font-medium tracking-[0.25em] uppercase"
            >
              <span className="w-8 h-px bg-[#A78BFA]" />
              Cognitive Architecture
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight mb-6"
            >
              Neurodiversity:
              <br />
              <span className="text-[#A78BFA]">Our Edge.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg text-[#C0C0D0]/70 leading-relaxed mb-6"
            >
              In Silicon Valley, &ldquo;typical&rdquo; is a plateau. The breakthroughs in cybersecurity,
              AI, and aerospace don&apos;t come from standardized thinkers — they come from{" "}
              <span className="text-[#A78BFA] font-medium">Cognitive Edge Cases</span>.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-base text-[#C0C0D0]/60 leading-relaxed mb-10"
            >
              We don&apos;t accommodate neurodiversity. We optimize for it as the most direct path
              to elite performance in technology. ADHD, Autism, and Dyslexia are not barriers
              to entry — they are the entry criteria for a different kind of excellence.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <Link
                href="#"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-[#A78BFA]/30 text-[#A78BFA] text-sm font-semibold hover:bg-[#A78BFA]/10 hover:border-[#A78BFA]/60 transition-all duration-200 group"
              >
                Read the Full Manifesto
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </motion.div>
          </div>

          {/* Right: Edge Case Cards */}
          <div className="space-y-4">
            {edges.map(({ icon: Icon, label, edge, description, color }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, x: 40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
                className="group relative rounded-xl border bg-[#0D0D18] p-6 hover:border-opacity-40 transition-all duration-300 overflow-hidden"
                style={{
                  borderColor: `${color}20`,
                }}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ background: `radial-gradient(ellipse at left, ${color}08, transparent)` }}
                />

                <div className="flex items-start gap-5 relative">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 border"
                    style={{ background: `${color}12`, borderColor: `${color}25` }}
                  >
                    <Icon className="w-5 h-5" style={{ color }} strokeWidth={1.5} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-display text-sm font-black text-white tracking-wide">
                        {label}
                      </span>
                      <span
                        className="text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded"
                        style={{ color, background: `${color}15` }}
                      >
                        {edge}
                      </span>
                    </div>
                    <p className="text-xs text-[#C0C0D0]/55 leading-relaxed">{description}</p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Bottom quote */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8 }}
              className="mt-6 p-5 rounded-xl border border-[#A78BFA]/15 bg-[#A78BFA]/5"
            >
              <p className="text-sm text-[#C0C0D0]/50 italic leading-relaxed">
                &ldquo;The most dangerous cyberattacks were conceived by minds that couldn&apos;t sit still
                in traditional classrooms. We build for those minds.&rdquo;
              </p>
              <p className="mt-3 text-xs text-[#A78BFA] font-medium tracking-wide">
                — CSST Innovation Manifesto
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
