'use client'

import React from 'react'
import NextSnow from './NextSnow'

interface Props {
  bgUrl?: string
  snowCount?: number
  snowImageUrl?: string
}

export default function NextSnowScreen({
  bgUrl = '/ep07/winterBg.jpg',
  snowCount = 75,
  snowImageUrl,
}: Props) {
  return (
    <div style={{width: '100vw', height: '100vh', overflow: 'hidden', position: 'relative'}}>
      <div style={{position: 'absolute', inset: 0, backgroundImage: `url(${bgUrl})`, backgroundSize: 'cover', backgroundPosition: 'center'}} />
      <NextSnow count={snowCount} imageUrl={snowImageUrl} />
    </div>
  )
}
