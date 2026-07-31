"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CalendarDays, ExternalLink } from "lucide-react";

// ─── CONFIGURATION ────────────────────────────────────────────────────────────
// Replace GOOGLE_CALENDAR_EMBED_URL with the public embed URL from your Google
// Calendar. To get it:
//   1. Open Google Calendar → Settings (gear icon)
//   2. Click your calendar name under "Settings for my calendars"
//   3. Scroll to "Integrate calendar" → copy the "Embed code" src URL
//   4. Paste just the src value (starting with https://calendar.google.com/...) below
const GOOGLE_CALENDAR_EMBED_URL =
  ""; // ← paste URL here

// Public link shown on the "Open in Google Calendar" button
const GOOGLE_CALENDAR_PUBLIC_URL =
  "https://calendar.google.com";

export default function CalendarSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const hasCalendar = GOOGLE_CALENDAR_EMBED_URL.length > 0;

  return (
    <section
      ref={ref}
      className="w-full py-20 px-6"
      style={{ background: "var(--bg-secondary)" }}
    >
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <div
            className="inline-flex items-center gap-2 mb-4 text-xs font-medium tracking-[0.25em] uppercase"
            style={{ color: "var(--accent)" }}
          >
            <span className="w-8 h-px" style={{ background: "var(--accent)" }} />
            Stay in the Loop
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2
              className="font-display text-3xl md:text-4xl lg:text-5xl font-black leading-tight tracking-tight"
              style={{ color: "var(--text-primary)" }}
            >
              School Calendar
            </h2>
            <a
              href={GOOGLE_CALENDAR_PUBLIC_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-all hover:opacity-80 shrink-0"
              style={{
                borderColor: "var(--border-accent)",
                color: "var(--accent)",
              }}
            >
              <CalendarDays className="w-4 h-4" />
              Open in Google Calendar
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>
          </div>
        </motion.div>

        {/* Calendar embed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="rounded-2xl overflow-hidden border"
          style={{
            borderColor: "var(--border-subtle)",
            boxShadow: "var(--shadow-glow)",
          }}
        >
          {hasCalendar ? (
            <iframe
              src={GOOGLE_CALENDAR_EMBED_URL}
              style={{ border: 0, width: "100%", height: 600 }}
              title="CSST School Calendar"
              loading="lazy"
            />
          ) : (
            // Placeholder shown until the embed URL is configured
            <div
              className="flex flex-col items-center justify-center gap-4 py-24 px-6 text-center"
              style={{ background: "var(--bg-card)" }}
            >
              <CalendarDays
                className="w-12 h-12 opacity-30"
                style={{ color: "var(--accent)" }}
              />
              <p
                className="text-sm font-medium max-w-xs leading-relaxed"
                style={{ color: "var(--text-muted)" }}
              >
                Google Calendar embed coming soon.
                <br />
                <span className="opacity-60">
                  Add your calendar&apos;s public embed URL to{" "}
                  <code className="text-xs">components/CalendarSection.tsx</code>.
                </span>
              </p>
            </div>
          )}
        </motion.div>

      </div>
    </section>
  );
}
