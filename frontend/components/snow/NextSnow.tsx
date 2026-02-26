"use client"

import React, {useEffect, useState} from 'react'
import { useTheme } from 'next-themes'
import NextSnowflake from './NextSnowflake'

interface Props {
  count?: number
  imageUrl?: string
}

export default function NextSnow({count = 100, imageUrl}: Props) {
  const { theme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  const currentTheme = theme === 'system' ? systemTheme : theme
  const isDark = currentTheme === 'dark'

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    // inject shared keyframes for web snow
    const id = 'next-snow-styles'
    if (document.getElementById(id)) return
    const style = document.createElement('style')
    style.id = id
    style.textContent = `
      @keyframes fall { 
        0% { 
          transform: translateY(-10vh); 
          opacity: 0;
        }
        5% {
          opacity: var(--snowflake-opacity);
        }
        95% {
          opacity: var(--snowflake-opacity);
        }
        100% { 
          transform: translateY(110vh);
          opacity: 0;
        }
      }
      @keyframes sway { 
        0% { transform: translateX(calc(-1 * var(--amp))); } 
        50% { transform: translateX(var(--amp)); } 
        100% { transform: translateX(calc(-1 * var(--amp))); } 
      }
      @keyframes spin { 
        from { transform: rotate(0deg); } 
        to { transform: rotate(360deg); } 
      }
      .next-snowflake { 
        will-change: transform;
      }
      .next-snowflake-inner { 
        display: block;
      }
      .next-snowflake-inner.light-mode {
        color: var(--snowflake-color-light);
      }
      .next-snowflake-inner.dark-mode {
        color: var(--snowflake-color-dark);
      }
    `
    document.head.appendChild(style)
    return () => {
      const el = document.getElementById(id)
      if (el) el.remove()
    }
  }, [])

  if (!mounted) return null

  return (
    <div style={{position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 999}}>
      {new Array(count).fill(0).map((_, i) => (
        <NextSnowflake 
          key={i} 
          index={i} 
          imageUrl={imageUrl}
          isDarkMode={isDark}
        />
      ))}
    </div>
  )
}
