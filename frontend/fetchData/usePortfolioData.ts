'use client'

import { useState, useEffect } from 'react'
import { PortfolioData, getPortfolioData } from '@/lib/api'

export function usePortfolioData() {
  const [data, setData] = useState<PortfolioData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const result = await getPortfolioData()
        setData(result)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch portfolio data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { data, loading, error }
}
