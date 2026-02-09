"use client"

import React, {useMemo} from 'react'

interface Props {
  index?: number
  imageUrl?: string
}

export default function NextSnowflake({index = 0, imageUrl}: Props) {
  const cfg = useMemo(() => {
    const size = Math.floor(Math.random() * 28) + 10
    const opacity = (Math.floor(Math.random() * 6) + 4) / 10
    const x = Math.floor(Math.random() * 100) // percent
    const fallDuration = Math.floor(Math.random() * 20000) + 10000
    const fallDelay = Math.floor(Math.random() * 8000)
    const swingDuration = Math.floor(Math.random() * 5000) + 3000
    const swingAmplitude = Math.floor(Math.random() * 40)
    const rotationDuration = Math.floor(Math.random() * 8000) + 2000
    const rotationDir = Math.random() > 0.5 ? 1 : -1
    return {
      size,
      opacity,
      x,
      fallDuration,
      fallDelay,
      swingDuration,
      swingAmplitude,
      rotationDuration,
      rotationDir,
    }
  }, [index])

  const wrapperStyle: React.CSSProperties = {
    position: 'absolute',
    left: `${cfg.x}%`,
    top: '-10vh',
    width: cfg.size,
    height: cfg.size,
    pointerEvents: 'none',
    opacity: cfg.opacity,
    transform: 'translateX(-50%)',
    animation: `fall ${cfg.fallDuration}ms linear ${cfg.fallDelay}ms forwards`,
  }

  const innerStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: cfg.size,
    color: 'white',
    transformOrigin: '50% 50%',
    animation: `sway ${cfg.swingDuration}ms linear infinite, spin ${cfg.rotationDuration}ms linear infinite`,
    // pass amplitude using CSS variable
    // @ts-ignore
    ['--amp' as any]: `${cfg.swingAmplitude}px`,
  }

  const content = imageUrl ? (
    <img src={imageUrl} alt="snow" style={{width: '100%', height: '100%'}} />
  ) : (
    '❄'
  )

  return (
    <div className="next-snowflake" style={wrapperStyle}>
      <div className="next-snowflake-inner" style={innerStyle}>{content}</div>
    </div>
  )
}
