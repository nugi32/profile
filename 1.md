/*
'use client'

import Snowfall from 'react-snowfall'
import { useEffect } from 'react'

interface SnowEffectProps {
  imageUrl?: string
  snowflakeCount?: number
}

export default function SnowEffect({ 
  imageUrl = '/snowflake.png',
  snowflakeCount = 150 
}: SnowEffectProps) {
  useEffect(() => {
    // Create custom snowflake using image
    const style = document.createElement('style')
    style.textContent = `
      .snowflake {
        background-image: url('${imageUrl}') !important;
        background-size: contain !important;
        background-repeat: no-repeat !important;
        background-position: center !important;
        opacity: 0.8 !important;
        width: 30px !important;
        height: 30px !important;
      }
    `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [imageUrl])

  return (
    <Snowfall
      snowflakeCount={snowflakeCount}
      style={{
        position: 'fixed',
        width: '100vw',
        height: '100vh',
      }}
    />
  )
} */


'use client'

import Snowfall from 'react-snowfall'

export default function SnowEffect() {
  return (
    <Snowfall
      snowflakeCount={100}
      style={{
        position: 'fixed',
        width: '100vw',
        height: '100vh',
        color: 'black',
      }}
    />
  )
}