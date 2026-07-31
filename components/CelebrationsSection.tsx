"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink } from "lucide-react";

// ─── CONFIGURATION ────────────────────────────────────────────────────────────
// To wire up the live Instagram feed:
//   1. Sign up at https://behold.so (free tier)
//   2. Connect Instagram account: @csrockets_cos
//   3. Create a feed and copy the Feed ID shown in your dashboard
//   4. Replace the empty string below with that Feed ID (e.g. "AbCdEf1234567890")
const BEHOLD_FEED_ID = ""; // ← paste Behold Feed ID here

const INSTAGRAM_URL = "https://www.instagram.com/csrockets_cos/";

// Placeholder posts shown until Behold is wired up
const PLACEHOLDER_POSTS = [
  {
    id: "1",
    img: "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=400&h=400&fit=crop&auto=format&q=80",
    caption: "Students collaborating on a project",
  },
  {
    id: "2",
    img: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=400&h=400&fit=crop&auto=format&q=80",
    caption: "Innovation in the classroom",
  },
  {
    id: "3",
    img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=400&fit=crop&auto=format&q=80",
    caption: "Team work makes the dream work",
  },
  {
    id: "4",
    img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&h=400&fit=crop&auto=format&q=80",
    caption: "Student presentations",
  },
  {
    id: "5",
    img: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=400&h=400&fit=crop&auto=format&q=80",
    caption: "Celebrating achievements",
  },
  {
    id: "6",
    img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=400&fit=crop&auto=format&q=80",
    caption: "Learning together",
  },
];

// Injects the Behold widget script once and renders the custom element via dangerouslySetInnerHTML
function BeholdFeed({ feedId }: { feedId: string }) {
  useEffect(() => {
    if (document.getElementById("behold-script")) return;
    const script = document.createElement("script");
    script.id = "behold-script";
    script.src = "https://w.behold.so/widget.js";
    script.type = "module";
    document.head.appendChild(script);
  }, []);

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: `<behold-widget feed-id="${feedId}"></behold-widget>`,
      }}
    />
  );
}

export default function CelebrationsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const hasFeed = BEHOLD_FEED_ID.length > 0;

  return (
    <section
      ref={ref}
      className="w-full py-20 px-6"
      style={{ background: "var(--bg-primary)" }}
    >
      <div className="max-w-6xl mx-auto">

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
            Community
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2
              className="font-display text-3xl md:text-4xl lg:text-5xl font-black leading-tight tracking-tight"
              style={{ color: "var(--text-primary)" }}
            >
              Celebrating Our Rockets
            </h2>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-all hover:opacity-80 shrink-0"
              style={{
                borderColor: "var(--border-accent)",
                color: "var(--accent)",
              }}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/></svg>
              @csrockets_cos
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>
          </div>
          <p className="mt-3 text-base" style={{ color: "var(--text-muted)" }}>
            Real moments from our students, staff, and community.
          </p>
        </motion.div>

        {/* Feed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          {hasFeed ? (
            <BeholdFeed feedId={BEHOLD_FEED_ID} />
          ) : (
            // Placeholder grid until Behold is connected
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {PLACEHOLDER_POSTS.map((post, i) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.06 }}
                  className="relative aspect-square rounded-xl overflow-hidden group border"
                  style={{ borderColor: "var(--border-subtle)" }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.img}
                    alt={post.caption}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-end p-2">
                    <p className="text-white text-[10px] leading-snug opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {post.caption}
                    </p>
                  </div>
                  {/* Placeholder label */}
                  <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded text-[9px] font-bold tracking-wide text-white/70 bg-black/40">
                    placeholder
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Behold setup nudge — only shown in dev/placeholder mode */}
        {!hasFeed && (
          <p className="mt-6 text-xs text-center" style={{ color: "var(--text-muted)", opacity: 0.5 }}>
            Live Instagram feed via{" "}
            <a href="https://behold.so" target="_blank" rel="noopener noreferrer" className="underline">
              Behold.so
            </a>{" "}
            — add your Feed ID to <code>components/CelebrationsSection.tsx</code> to go live.
          </p>
        )}

      </div>
    </section>
  );
}
