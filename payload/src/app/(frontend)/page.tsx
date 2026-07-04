import { headers as getHeaders } from 'next/headers.js'
import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'
import './styles.css'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  return (
    <div className="home">
      <div className="card">
        <span className="eyebrow">Profile CMS</span>
        <h1>{user ? 'Welcome back' : 'Welcome'}</h1>
        {user && <p className="userEmail">{user.email}</p>}
        <p className="subtitle">
          {user
            ? 'Manage your portfolio content from the admin panel.'
            : 'Sign in to manage your portfolio content.'}
        </p>
        <a
          className="admin"
          href={payloadConfig.routes.admin}
          rel="noopener noreferrer"
          target="_blank"
        >
          Go to admin panel
        </a>
      </div>
    </div>
  )
}