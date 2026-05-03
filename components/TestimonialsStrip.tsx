"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const testimonials = [
  {
    quote:
      "On our drive to school Monday, I was talking with my daughter about her teachers. She was unable to pick a favorite because they were all SOOOO AWESOME!",
    name: "Bruce",
    role: "CSST Parent",
    color: "#00D4FF",
  },
  {
    quote:
      "I was actually excited for break to be over so I could come back to school and be around all of these amazing people!",
    name: "Dominic",
    role: "CSST Student",
    color: "#A78BFA",
  },
  {
    quote:
      "My son LOVES this school and comes home happy, excited and eager for school the next day. I really appreciate you all!",
    name: "Destiny",
    role: "CSST Parent",
    color: "#34D399",
  },
];

export default function TestimonialsStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="relative py-16 bg-[#080810] border-y border-[#00D4FF]/8 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-10" />

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="text-[10px] font-bold tracking-[0.28em] uppercase text-[#00D4FF]/45 text-center mb-10"
        >
          In Their Own Words
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map(({ quote, name, role, color }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.12 }}
              className="relative p-6 rounded-2xl border bg-[#0A0A0F]"
              style={{ borderColor: `${color}15` }}
            >
              {/* Quote mark */}
              <span
                className="absolute top-4 right-5 font-display text-5xl font-black leading-none select-none"
                style={{ color: `${color}15` }}
              >
                &ldquo;
              </span>

              <p className="text-sm text-[#C0C0D0]/70 leading-relaxed mb-5 relative z-10">
                &ldquo;{quote}&rdquo;
              </p>

              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0"
                  style={{ background: `${color}18`, color }}
                >
                  {name[0]}
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">{name}</p>
                  <p className="text-[10px] text-[#C0C0D0]/40">{role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
