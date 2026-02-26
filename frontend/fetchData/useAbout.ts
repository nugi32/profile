'use client'

import { useState, useEffect } from 'react'
import { AboutData, getAbout } from '@/lib/api'

export function useAbout() {
  const [data, setData] = useState<AboutData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const result = await getAbout()
        setData(result)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch about data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { data, loading, error }
}
