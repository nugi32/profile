"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import "./ToggleSwitch.css"

type ThemeToggleProps = {
  className?: string
}

export default function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const { theme, setTheme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  const currentTheme = theme === "system" ? systemTheme : theme
  const isDark = currentTheme === "dark"

  return (
    <div className={`toggle-switch ${className}`}>
      <label className="switch-label">
        <input
          type="checkbox"
          className="checkbox"
          checked={isDark}
          onChange={() => setTheme(isDark ? "light" : "dark")}
          aria-label="Toggle theme"
        />
        <span className="slider"></span>
      </label>
    </div>
  )
}
