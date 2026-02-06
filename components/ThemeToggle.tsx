"use client"

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  const currentTheme = theme === 'system' ? systemTheme : theme

  return (
    <button
      onClick={() => setTheme(currentTheme === 'dark' ? 'light' : 'dark')}
      className="px-3 py-1 rounded-md border dark:border-gray-600"
      aria-label="Toggle theme"
    >
      {currentTheme === 'dark' ? 'Light' : 'Dark'}
    </button>
  )
}
