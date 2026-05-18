"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type Theme = "aerospace" | "cyber" | "entrepreneurship" | "leadership";

export interface ThemeMeta {
  id: Theme;
  label: string;
  pathway: string;      // full pathway name matching ProgramTracks
  tagline: string;      // one-line description
  accent: string;       // hex — matches ProgramTracks track color
  dark: boolean;        // true = dark bg, false = light bg
  badge: string;        // partner badge, mirrors ProgramTracks
}

export const themes: ThemeMeta[] = [
  {
    id: "aerospace",
    label: "Aerospace",
    pathway: "Aerospace & Engineering",
    tagline: "The final frontier — right next door",
    accent: "#34D399",
    dark: true,
    badge: "Space ISAC Partner",
  },
  {
    id: "cyber",
    label: "Cyber",
    pathway: "Cybersecurity & Computer Science",
    tagline: "Defending the digital world",
    accent: "#00D4FF",
    dark: true,
    badge: "NCC Partner",
  },
  {
    id: "entrepreneurship",
    label: "Venture",
    pathway: "Entrepreneurship & Innovation",
    tagline: "From idea to impact",
    accent: "#EA580C",
    dark: false,
    badge: "XI Accelerator",
  },
  {
    id: "leadership",
    label: "Leadership",
    pathway: "Leadership & Community",
    tagline: "Building the people who build the future",
    accent: "#7C3AED",
    dark: false,
    badge: "Core Pathway",
  },
];

const STORAGE_KEY = "csst-theme";

interface ThemeContextValue {
  theme: Theme;
  setTheme: (t: Theme) => void;
  meta: ThemeMeta;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "leadership",
  setTheme: () => {},
  meta: themes[3],
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("leadership");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
    const initial = stored && themes.find((t) => t.id === stored) ? stored : "leadership";
    setThemeState(initial);
    document.documentElement.setAttribute("data-theme", initial);
  }, []);

  const setTheme = (t: Theme) => {
    setThemeState(t);
    localStorage.setItem(STORAGE_KEY, t);
    document.documentElement.setAttribute("data-theme", t);
  };

  const meta = themes.find((t) => t.id === theme) ?? themes[0];

  return (
    <ThemeContext.Provider value={{ theme, setTheme, meta }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
