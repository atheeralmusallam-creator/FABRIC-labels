"use client";

import { useEffect, useState } from "react";

// Read theme from storage, defaulting to dark
function getStoredTheme(): "dark" | "light" {
  try {
    const t = localStorage.getItem("fabric-theme");
    return t === "light" ? "light" : "dark";
  } catch {
    return "dark";
  }
}

function applyTheme(theme: "dark" | "light") {
  const html = document.documentElement;
  html.classList.remove("dark", "light");
  html.classList.add(theme);
  // Also force bg/color on body so every page respects it
  document.body.style.background = "var(--bg-primary)";
  document.body.style.color = "var(--text-primary)";
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  // On every mount (every page), re-apply stored theme
  useEffect(() => {
    const stored = getStoredTheme();
    setTheme(stored);
    applyTheme(stored);
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    try { localStorage.setItem("fabric-theme", next); } catch {}
    applyTheme(next);
  };

  return (
    <button
      onClick={toggle}
      title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
      className="flex items-center justify-center w-8 h-8 rounded-lg border transition-all"
      style={{
        background: "var(--bg-surface)",
        borderColor: "var(--border)",
        color: "var(--text-secondary)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--brand)";
        (e.currentTarget as HTMLElement).style.color = "var(--text-primary)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
        (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
      }}
    >
      {theme === "dark" ? (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="4"/>
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
        </svg>
      ) : (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
      )}
    </button>
  );
}
