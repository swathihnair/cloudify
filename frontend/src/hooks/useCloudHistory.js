import { useState, useCallback, useEffect } from 'react'

const STORAGE_KEY = 'cloudify_history'

export const useCloudHistory = () => {
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)

  // Load history from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        setHistory(JSON.parse(stored))
      }
    } catch (err) {
      console.error('Failed to load history:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  // Save to localStorage whenever history changes
  useEffect(() => {
    if (!loading) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(history))
      } catch (err) {
        console.error('Failed to save history:', err)
      }
    }
  }, [history, loading])

  const addCloud = useCallback((cloudData) => {
    const cloudCard = {
      id: `cloud_${Date.now()}`,
      timestamp: new Date().toISOString(),
      ...cloudData
    }
    setHistory((prev) => [cloudCard, ...prev])
    return cloudCard
  }, [])

  const removeCloud = useCallback((cloudId) => {
    setHistory((prev) => prev.filter((cloud) => cloud.id !== cloudId))
  }, [])

  const clearHistory = useCallback(() => {
    setHistory([])
  }, [])

  const getCloudById = useCallback((cloudId) => {
    return history.find((cloud) => cloud.id === cloudId)
  }, [history])

  const filterByTime = useCallback((filter = 'all') => {
    const now = new Date()
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

    return history.filter((cloud) => {
      const cloudDate = new Date(cloud.timestamp)

      switch (filter) {
        case 'week':
          return cloudDate >= oneWeekAgo
        case 'month':
          return cloudDate >= oneMonthAgo
        case 'all':
        default:
          return true
      }
    })
  }, [history])

  return {
    history,
    loading,
    addCloud,
    removeCloud,
    clearHistory,
    getCloudById,
    filterByTime
  }
}

export default useCloudHistory
