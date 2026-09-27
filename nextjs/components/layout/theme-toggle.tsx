"use client";

import { LuMoon, LuSun } from "react-icons/lu";
import { useTheme } from "../providers/theme-provider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Lights on" : "Lights off"}
      className="chip flex h-11 w-11 items-center justify-center"
    >
      {isDark ? <LuSun size={18} /> : <LuMoon size={18} />}
    </button>
  );
}
