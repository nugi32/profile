"use client"

import React, {useEffect} from 'react'
import NextSnowflake from './NextSnowflake'

interface Props {
  count?: number
  imageUrl?: string
}

export default function NextSnow({count = 100, imageUrl}: Props) {
  useEffect(() => {
    // inject shared keyframes for web snow
    const id = 'next-snow-styles'
    if (document.getElementById(id)) return
    const style = document.createElement('style')
    style.id = id
    style.textContent = `
      @keyframes fall { to { transform: translateY(110vh); } }
      @keyframes sway { 0% { transform: translateX(calc(-1 * var(--amp))); } 50% { transform: translateX(var(--amp)); } 100% { transform: translateX(calc(-1 * var(--amp))); } }
      @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      .next-snowflake { will-change: transform; }
      .next-snowflake-inner { display: block; }
    `
    document.head.appendChild(style)
    return () => {
      const el = document.getElementById(id)
      if (el) el.remove()
    }
  }, [])

  return (
    <div style={{position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 999}}>
      {new Array(count).fill(0).map((_, i) => (
        <NextSnowflake key={i} index={i} imageUrl={imageUrl} />
      ))}
    </div>
  )
}
