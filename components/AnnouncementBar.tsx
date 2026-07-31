"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X, Megaphone } from "lucide-react";
import announcements from "@/data/announcements.json";

const BAR_H = 44; // px — announcement bar height, kept in sync with CSS

type Announcement = {
  id: string;
  text: string;
  link?: string;
  linkLabel?: string;
  expires?: string;
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
    } catch { /* ignore */ }
  }, []);

  // Keep the CSS variable in sync so Navigation + ThemeSelectorSection shift down
  const isVisible = mounted && getActive().filter((a) => !dismissed.includes(a.id)).length > 0;
  useEffect(() => {
    document.documentElement.style.setProperty("--announce-h", isVisible ? `${BAR_H}px` : "0px");
  }, [isVisible]);

  const dismiss = (id: string) => {
    const next = [...dismissed, id];
    setDismissed(next);
    try { localStorage.setItem("csst-dismissed-announcements", JSON.stringify(next)); } catch { /* ignore */ }
  };

  if (!mounted || !isVisible) return null;

  const item = getActive().filter((a) => !dismissed.includes(a.id))[0];

  return (
    <div
      className="fixed left-0 right-0 z-[60] flex items-center justify-center gap-3 px-4 text-sm font-medium"
      style={{
        top: 0,
        height: BAR_H,
        background: "var(--accent)",
        color: "#fff",
      }}
    >
      <Megaphone className="w-4 h-4 shrink-0 opacity-80" />

      <p className="text-center leading-snug">
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
