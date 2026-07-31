"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X, Megaphone } from "lucide-react";
import announcements from "@/data/announcements.json";

type Announcement = {
  id: string;
  text: string;
  link?: string;
  linkLabel?: string;
  expires?: string; // ISO date string — bar auto-hides after this date
};

function getActive(): Announcement[] {
  const now = new Date();
  return (announcements as Announcement[]).filter((a) => {
    if (!a.expires) return true;
    return new Date(a.expires) >= now;
  });
}

export default function AnnouncementBar() {
  const [dismissed, setDismissed] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = JSON.parse(localStorage.getItem("csst-dismissed-announcements") || "[]");
      setDismissed(stored);
    } catch {
      // ignore
    }
  }, []);

  const dismiss = (id: string) => {
    const next = [...dismissed, id];
    setDismissed(next);
    try { localStorage.setItem("csst-dismissed-announcements", JSON.stringify(next)); } catch { /* ignore */ }
  };

  if (!mounted) return null;

  const active = getActive().filter((a) => !dismissed.includes(a.id));
  if (active.length === 0) return null;

  // Show only the most recent (first) active announcement
  const item = active[0];

  return (
    <div
      className="w-full z-50 flex items-center justify-center gap-3 px-4 py-2.5 text-sm"
      style={{
        background: "var(--accent)",
        color: "#fff",
        minHeight: 44,
      }}
    >
      <Megaphone className="w-4 h-4 shrink-0 opacity-80" />

      <p className="text-center leading-snug font-medium">
        {item.text}
        {item.link && (
          <Link
            href={item.link}
            className="ml-2 underline underline-offset-2 font-bold hover:no-underline opacity-90 hover:opacity-100 transition-opacity"
          >
            {item.linkLabel ?? "Learn more"} →
          </Link>
        )}
      </p>

      <button
        type="button"
        aria-label="Dismiss announcement"
        onClick={() => dismiss(item.id)}
        className="ml-2 shrink-0 rounded-full p-0.5 opacity-70 hover:opacity-100 transition-opacity"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
