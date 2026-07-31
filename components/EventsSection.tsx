"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CalendarDays, Clock, MapPin, ChevronRight } from "lucide-react";
import Link from "next/link";
import events from "@/data/events.json";

type Event = {
  id: string;
  type: string;
  title: string;
  date: string;        // ISO: "2026-09-10"
  time: string;
  location: string;
  locationNote?: string;
  description: string;
  link?: string;
  linkLabel?: string;
};

function formatDate(iso: string) {
  const d = new Date(iso + "T12:00:00"); // noon avoids TZ edge cases
  return {
    weekday: d.toLocaleDateString("en-US", { weekday: "long" }),
    month:   d.toLocaleDateString("en-US", { month: "long" }),
    day:     d.getDate(),
    year:    d.getFullYear(),
  };
}

function isUpcoming(iso: string) {
  return new Date(iso + "T23:59:59") >= new Date();
}

export default function EventsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const upcoming = (events as Event[]).filter((e) => isUpcoming(e.date));

  if (upcoming.length === 0) return null;

  return (
    <section
      ref={ref}
      className="w-full py-16 px-6"
      style={{ background: "var(--bg-secondary)" }}
    >
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div
            className="inline-flex items-center gap-2 mb-4 text-xs font-medium tracking-[0.25em] uppercase"
            style={{ color: "var(--accent)" }}
          >
            <span className="w-8 h-px" style={{ background: "var(--accent)" }} />
            You're Invited
          </div>
          <h2
            className="font-display text-3xl md:text-4xl lg:text-5xl font-black leading-tight tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Upcoming Open Houses
          </h2>
          <p className="mt-3 text-base max-w-xl" style={{ color: "var(--text-muted)" }}>
            Come see the school in person. Meet the team, tour our facility, and get all your questions answered.
          </p>
        </motion.div>

        {/* Event cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {upcoming.map((event, i) => {
            const { weekday, month, day, year } = formatDate(event.date);
            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                className="relative rounded-2xl overflow-hidden flex flex-col"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-accent)",
                  boxShadow: `0 4px 24px rgba(var(--accent-rgb), 0.06)`,
                }}
              >
                {/* Accent top bar */}
                <div className="h-1 w-full" style={{ background: "var(--accent)" }} />

                <div className="p-7 flex gap-5 flex-1">
                  {/* Date block */}
                  <div
                    className="shrink-0 w-16 h-16 rounded-xl flex flex-col items-center justify-center text-center"
                    style={{
                      background: `rgba(var(--accent-rgb), 0.10)`,
                      border: `1px solid rgba(var(--accent-rgb), 0.18)`,
                    }}
                  >
                    <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: "var(--accent)" }}>
                      {month.slice(0, 3)}
                    </span>
                    <span className="font-display text-2xl font-black leading-none" style={{ color: "var(--text-primary)" }}>
                      {day}
                    </span>
                  </div>

                  {/* Details */}
                  <div className="flex flex-col flex-1 gap-3">
                    <div>
                      <p className="text-[10px] font-bold tracking-[0.2em] uppercase mb-1" style={{ color: "var(--accent)", opacity: 0.7 }}>
                        {event.type}
                      </p>
                      <h3 className="font-display text-lg font-bold leading-tight" style={{ color: "var(--text-primary)" }}>
                        {event.title}
                      </h3>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-2 text-sm" style={{ color: "var(--text-muted)" }}>
                        <CalendarDays className="w-3.5 h-3.5 shrink-0" style={{ color: "var(--accent)" }} />
                        {weekday}, {month} {day}, {year}
                      </div>
                      <div className="flex items-center gap-2 text-sm" style={{ color: "var(--text-muted)" }}>
                        <Clock className="w-3.5 h-3.5 shrink-0" style={{ color: "var(--accent)" }} />
                        {event.time}
                      </div>
                      <div className="flex items-start gap-2 text-sm" style={{ color: "var(--text-muted)" }}>
                        <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: "var(--accent)" }} />
                        <span>
                          {event.location}
                          {event.locationNote && (
                            <span className="block text-xs mt-0.5" style={{ opacity: 0.65 }}>
                              {event.locationNote}
                            </span>
                          )}
                        </span>
                      </div>
                    </div>

                    <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)", opacity: 0.85 }}>
                      {event.description}
                    </p>

                    {event.link && (
                      <Link
                        href={event.link}
                        className="mt-auto inline-flex items-center gap-1.5 text-sm font-bold transition-opacity hover:opacity-75"
                        style={{ color: "var(--accent)" }}
                      >
                        {event.linkLabel ?? "Learn More"}
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Footnote */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-6 text-sm text-center"
          style={{ color: "var(--text-muted)", opacity: 0.6 }}
        >
          All information nights start at 6:00 PM · 3650 North Nevada Ave · Enter on the west side at the CSST entrance
        </motion.p>

      </div>
    </section>
  );
}
