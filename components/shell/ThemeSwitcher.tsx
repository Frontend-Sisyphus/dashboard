"use client";

import { useEffect, useState } from "react";

export type Theme = "light" | "dark";

export function ThemeSwitcher({ className = "" }: { className?: string } = {}) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Read from localStorage or default to dark
    const saved = localStorage.getItem("itc-theme") as Theme | null;
    if (saved === "light" || saved === "dark") {
      setTheme(saved);
      applyTheme(saved);
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const initial: Theme = prefersDark ? "dark" : "light";
      setTheme(initial);
      applyTheme(initial);
    }
    setMounted(true);
  }, []);

  const applyTheme = (next: Theme) => {
    const root = document.documentElement;
    root.setAttribute("data-theme", next);
    localStorage.setItem("itc-theme", next);
  };

  const handleSelect = (next: Theme) => {
    setTheme(next);
    applyTheme(next);
  };

  return (
    <div
      className={`relative inline-flex items-stretch rounded-xl border border-border bg-muted/70 p-1 shadow-xs select-none ${className}`}
      role="group"
      aria-label="Переключение темы оформления"
    >
      {/* Sliding Active Pill Indicator with spring-like physics transition */}
      <span
        className={`absolute inset-y-1 w-[calc(50%-4px)] rounded-lg bg-primary shadow-sm pointer-events-none transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          mounted ? "" : "opacity-0"
        }`}
        style={{
          left: "4px",
          transform: theme === "dark" ? "translateX(100%)" : "translateX(0%)",
        }}
        aria-hidden="true"
      />

      {/* Light Theme Button (Sun Icon with smooth rotation & scale) */}
      <button
        type="button"
        onClick={() => handleSelect("light")}
        title="Светлая тема"
        aria-label="Включить светлую тему"
        aria-pressed={theme === "light"}
        className="group relative z-10 flex h-full w-9 sm:w-10 items-center justify-center rounded-lg transition-transform duration-150 cursor-pointer active:scale-90"
      >
        <svg
          className={`h-4.5 w-4.5 sm:h-5 sm:w-5 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
            theme === "light"
              ? "text-[#042428] rotate-0 scale-100 drop-shadow-[0_1px_2px_rgba(0,0,0,0.18)]"
              : "text-fg-muted -rotate-45 scale-75 opacity-70 group-hover:opacity-100 group-hover:text-foreground group-hover:scale-85"
          }`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      </button>

      {/* Dark Theme Button (Moon Icon with smooth rotation & scale) */}
      <button
        type="button"
        onClick={() => handleSelect("dark")}
        title="Тёмная тема"
        aria-label="Включить тёмную тему"
        aria-pressed={theme === "dark"}
        className="group relative z-10 flex h-full w-9 sm:w-10 items-center justify-center rounded-lg transition-transform duration-150 cursor-pointer active:scale-90"
      >
        <svg
          className={`h-4.5 w-4.5 sm:h-5 sm:w-5 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
            theme === "dark"
              ? "text-[#042428] rotate-0 scale-100 drop-shadow-[0_1px_2px_rgba(0,0,0,0.18)]"
              : "text-fg-muted rotate-45 scale-75 opacity-70 group-hover:opacity-100 group-hover:text-foreground group-hover:scale-85"
          }`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      </button>
    </div>
  );
}
