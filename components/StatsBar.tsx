"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const stats = [
  {
    display: "9–12",
    label: "Grades Served",
    hover: "Currently serving grades 9–11 · Rising juniors are our first graduating class",
  },
  {
    display: "9+",
    label: "Ecosystem Partners",
    hover: null,
  },
  {
    display: "Free",
    label: "Tuition — Always",
    hover: "Publicly funded · Open enrollment statewide · No fees, no application cost",
  },
  {
    display: "400+",
    label: "Students at Full Build-Out",
    hover: "Now enrolling · Applications open for 2026–2027",
  },
];

function StatCard({ stat, index, inView }: { stat: typeof stats[0]; index: number; inView: boolean }) {
  const [hovered, setHovered] = useState(false);
  const [cardHovered, setCardHovered] = useState(false);

  return (
    <motion.div
      key={stat.label}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => { setCardHovered(true); if (stat.hover) setHovered(true); }}
      onMouseLeave={() => { setCardHovered(false); setHovered(false); }}
      className="relative flex flex-col items-center justify-center py-10 px-6 text-center group transition-colors duration-300 overflow-hidden"
      style={{ background: cardHovered ? "var(--bg-elevated)" : "var(--bg-primary)", cursor: "default" }}
    >
      <motion.div
        animate={{ opacity: hovered ? 0 : 1, y: hovered ? -6 : 0 }}
        transition={{ duration: 0.22 }}
        className="flex flex-col items-center"
      >
        <span className="font-display text-4xl md:text-5xl font-black glow-text tabular-nums" style={{ color: "var(--accent)" }}>
          {stat.display}
        </span>
        <p className="mt-3 text-xs font-medium tracking-[0.12em] uppercase" style={{ color: "var(--text-muted)" }}>
          {stat.label}
        </p>
      </motion.div>

      <AnimatePresence>
        {hovered && stat.hover && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.22 }}
            className="absolute inset-0 flex items-center justify-center px-4 text-xs font-medium leading-relaxed text-center"
            style={{ color: `rgba(var(--accent-rgb), 0.8)` }}
          >
            {stat.hover}
          </motion.p>
        )}
      </AnimatePresence>

      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 group-hover:w-1/2 transition-all duration-300"
        style={{ background: "var(--accent)" }}
      />
    </motion.div>
  );
}

export default function StatsBar() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-14 overflow-hidden" style={{ background: "var(--bg-primary)", borderTop: "1px solid var(--border-accent)", borderBottom: "1px solid var(--border-accent)" }}>
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, rgba(var(--accent-rgb),0.40), transparent)` }} />
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, rgba(var(--accent-rgb),0.40), transparent)` }} />

      <div className="max-w-7xl mx-auto px-6">
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-px rounded-xl overflow-hidden border"
          style={{ background: "var(--border-subtle)", borderColor: "var(--border-accent)" }}
        >
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} inView={inView} />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-6 text-center text-sm tracking-wide"
          style={{ color: "var(--text-muted)" }}
        >
          A <span style={{ color: `rgba(var(--accent-rgb), 0.7)` }}>D11 Innovation Zone</span> school — publicly funded, character-based, open to students statewide via Colorado open enrollment
        </motion.p>
      </div>
    </section>
  );
}
