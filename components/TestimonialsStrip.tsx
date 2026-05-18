"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

// picsum.photos gives consistent placeholder headshots by seed (no auth needed)
const AVATAR = (seed: string) => `https://picsum.photos/seed/${seed}/80/80`;

const testimonials = [
  {
    quote:
      "On our drive to school Monday, I was talking with my daughter about her teachers. She was unable to pick a favorite because they were all SOOOO AWESOME!",
    name: "Bruce",
    role: "CSST Parent",
    color: "#00D4FF",
    avatar: AVATAR("csst-parent-bruce"),
  },
  {
    quote:
      "I was actually excited for break to be over so I could come back to school and be around all of these amazing people!",
    name: "Dominic",
    role: "CSST Student",
    color: "#A78BFA",
    avatar: AVATAR("csst-student-dominic"),
  },
  {
    quote:
      "My son LOVES this school and comes home happy, excited and eager for school the next day. I really appreciate you all!",
    name: "Destiny",
    role: "CSST Parent",
    color: "#34D399",
    avatar: AVATAR("csst-parent-destiny"),
  },
];

export default function TestimonialsStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      className="relative py-16 overflow-hidden"
      style={{
        background: "var(--bg-secondary)",
        borderTop: "1px solid var(--border-subtle)",
        borderBottom: "1px solid var(--border-subtle)",
      }}
    >
      <div className="absolute inset-0 grid-bg opacity-10" />

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div
            className="inline-flex items-center gap-2 mb-4 text-xs font-medium tracking-[0.25em] uppercase"
            style={{ color: "var(--accent)" }}
          >
            <span className="w-8 h-px" style={{ background: "var(--accent)" }} />
            In Their Own Words
          </div>
          <h2
            className="font-display text-3xl md:text-4xl lg:text-5xl font-black leading-tight tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            What Families &amp; Students Say
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map(({ quote, name, role, color, avatar }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.12 }}
              className="relative p-6 rounded-2xl border flex flex-col"
              style={{ background: "var(--bg-card)", borderColor: `${color}18` }}
            >
              {/* Quote mark */}
              <span
                className="absolute top-4 right-5 font-display text-5xl font-black leading-none select-none"
                style={{ color: `${color}15` }}
              >
                &ldquo;
              </span>

              {/* Quote text */}
              <p className="text-sm leading-relaxed mb-5 relative z-10 flex-1" style={{ color: "var(--text-muted)" }}>
                &ldquo;{quote}&rdquo;
              </p>

              {/* Attribution with circular photo */}
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full overflow-hidden border-2 flex-shrink-0"
                  style={{ borderColor: `${color}35` }}
                >
                  <Image
                    src={avatar}
                    alt={name}
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                    unoptimized
                  />
                </div>
                <div>
                  <p className="text-xs font-semibold" style={{ color: "var(--text-primary)" }}>{name}</p>
                  <p className="text-[10px]" style={{ color }}>{role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
