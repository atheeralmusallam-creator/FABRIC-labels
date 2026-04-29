"use client";
import { useEffect } from "react";

export function ThemeApplier() {
  useEffect(() => {
    try {
      const t = localStorage.getItem("fabric-theme");
      const theme = t === "light" ? "light" : "dark";
      document.documentElement.classList.remove("dark", "light");
      document.documentElement.classList.add(theme);
      document.body.style.background = "var(--bg-primary)";
      document.body.style.color = "var(--text-primary)";
    } catch {}
  }, []);
  return null;
}
