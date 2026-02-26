'use client'

import { useState, useEffect } from 'react'
import { ContactData, getContact } from '@/lib/api'

export function useContact() {
  const [data, setData] = useState<ContactData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const result = await getContact()
        setData(result)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch contact data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { data, loading, error }
}
