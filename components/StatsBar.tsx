"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { display: "9–12", label: "Grades Served", animate: false },
  { display: "9+", label: "Ecosystem Partners", animate: false },
  { display: "Free", label: "Tuition — Always", animate: false },
  { display: "400+", label: "Students at Full Capacity", animate: false },
];

export default function StatsBar() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-14 bg-[#0A0A0F] border-y border-[#00D4FF]/10 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00D4FF]/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00D4FF]/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#00D4FF]/8 rounded-xl overflow-hidden border border-[#00D4FF]/10">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative flex flex-col items-center justify-center py-10 px-6 bg-[#0A0A0F] text-center group hover:bg-[#1A1A2E]/50 transition-colors duration-300"
            >
              <span className="font-display text-4xl md:text-5xl font-black text-[#00D4FF] glow-text tabular-nums">
                {stat.display}
              </span>
              <p className="mt-3 text-xs font-medium text-[#C0C0D0]/60 tracking-[0.12em] uppercase">
                {stat.label}
              </p>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#00D4FF] group-hover:w-1/2 transition-all duration-300" />
            </motion.div>
          ))}
        </div>

        {/* Tagline row */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-6 text-center text-sm text-[#C0C0D0]/40 tracking-wide"
        >
          A <span className="text-[#00D4FF]/70">D11 Innovation Zone</span> school — publicly funded, application-based, open to all Colorado Springs students
        </motion.p>
      </div>
    </section>
  );
}
