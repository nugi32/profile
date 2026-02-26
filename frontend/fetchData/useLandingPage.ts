'use client'

import { useState, useEffect } from 'react'
import { LandingPageData, getLandingPage } from '@/lib/api'

export function useLandingPage() {
  const [data, setData] = useState<LandingPageData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const result = await getLandingPage()
        setData(result)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch landing page')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { data, loading, error }
}
