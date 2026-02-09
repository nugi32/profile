"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import styles from "./ToggleSwitch.module.css"

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
    <div className={`${styles["toggle-switch"]} ${className}`}>
      <label className={styles["switch-label"]}>
        <input
          type="checkbox"
          className={styles.checkbox}
          checked={isDark}
          onChange={() => setTheme(isDark ? "light" : "dark")}
          aria-label="Toggle theme"
        />
        <span className={styles.slider}></span>
      </label>
    </div>
  )
}
