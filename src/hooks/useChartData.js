import { useState, useEffect, useCallback, useRef } from 'react'
import chartService from '../services/chartService'

/**
 * Custom hook for managing chart data and state
 * Handles data fetching, caching, real-time updates, and error management
 */
export const useChartData = (symbol, timeframe = '5', options = {}) => {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [lastUpdate, setLastUpdate] = useState(null)
  
  // Options with defaults
  const {
    autoRefresh = false,
    refreshInterval = 30000, // 30 seconds
    indicators = {},
    enableRealTime = true
  } = options

  // Refs for cleanup
  const refreshIntervalRef = useRef(null)
  const abortControllerRef = useRef(null)

  /**
   * Fetch chart data
   */
  const fetchData = useCallback(async (showLoading = true) => {
    if (!symbol) return

    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    // Create new abort controller
    abortControllerRef.current = new AbortController()

    try {
      if (showLoading) {
        setIsLoading(true)
      }
      setError(null)

      // Fetch data with indicators if specified
      const chartData = Object.keys(indicators).length > 0
        ? await chartService.getChartDataWithIndicators(symbol, timeframe, indicators)
        : await chartService.getCandlestickData(symbol, timeframe)

      setData(chartData)
      setLastUpdate(new Date())

    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error('useChartData fetch error:', err)
        setError(err.message)
      }
    } finally {
      if (showLoading) {
        setIsLoading(false)
      }
    }
  }, [symbol, timeframe, indicators])

  /**
   * Manual refresh function
   */
  const refresh = useCallback(() => {
    fetchData(true)
  }, [fetchData])

  /**
   * Silent refresh (for auto-refresh)
   */
  const silentRefresh = useCallback(() => {
    fetchData(false)
  }, [fetchData])

  // Initial data fetch
  useEffect(() => {
    fetchData(true)
  }, [fetchData])

  // Auto-refresh setup
  useEffect(() => {
    if (autoRefresh && refreshInterval > 0) {
      refreshIntervalRef.current = setInterval(silentRefresh, refreshInterval)
      
      return () => {
        if (refreshIntervalRef.current) {
          clearInterval(refreshIntervalRef.current)
        }
      }
    }
  }, [autoRefresh, refreshInterval, silentRefresh])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current)
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [])

  return {
    data,
    isLoading,
    error,
    lastUpdate,
    refresh,
    silentRefresh
  }
}

/**
 * Hook for real-time quote data
 */
export const useRealTimeQuote = (symbol, refreshInterval = 5000) => {
  const [quote, setQuote] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  
  const intervalRef = useRef(null)

  const fetchQuote = useCallback(async () => {
    if (!symbol) return

    try {
      setIsLoading(true)
      setError(null)
      
      const quoteData = await chartService.getRealTimeQuote(symbol)
      setQuote(quoteData)
      
    } catch (err) {
      console.error('useRealTimeQuote error:', err)
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }, [symbol])

  // Initial fetch
  useEffect(() => {
    fetchQuote()
  }, [fetchQuote])

  // Auto-refresh setup
  useEffect(() => {
    if (symbol && refreshInterval > 0) {
      intervalRef.current = setInterval(fetchQuote, refreshInterval)
      
      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
        }
      }
    }
  }, [symbol, refreshInterval, fetchQuote])

  // Cleanup
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  return {
    quote,
    isLoading,
    error,
    refresh: fetchQuote
  }
}

/**
 * Hook for managing chart preferences
 */
export const useChartPreferences = (userId) => {
  const [preferences, setPreferences] = useState({
    defaultTimeframe: '5',
    indicators: {
      vwap: true,
      ema9: true,
      ema20: false,
      sma200: false
    },
    chartType: 'candlestick',
    theme: 'dark'
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  /**
   * Load preferences from backend
   */
  const loadPreferences = useCallback(async () => {
    if (!userId) return

    try {
      setIsLoading(true)
      setError(null)

      const token = localStorage.getItem('token')
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user/chart-preferences`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        const data = await response.json()
        setPreferences(prev => ({ ...prev, ...data }))
      }

    } catch (err) {
      console.error('Load preferences error:', err)
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }, [userId])

  /**
   * Save preferences to backend
   */
  const savePreferences = useCallback(async (newPreferences) => {
    if (!userId) return

    try {
      setError(null)

      const token = localStorage.getItem('token')
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user/chart-preferences`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPreferences),
      })

      if (response.ok) {
        setPreferences(prev => ({ ...prev, ...newPreferences }))
      } else {
        throw new Error('Failed to save preferences')
      }

    } catch (err) {
      console.error('Save preferences error:', err)
      setError(err.message)
    }
  }, [userId])

  /**
   * Update specific preference
   */
  const updatePreference = useCallback((key, value) => {
    const newPreferences = { ...preferences, [key]: value }
    setPreferences(newPreferences)
    savePreferences(newPreferences)
  }, [preferences, savePreferences])

  /**
   * Update indicator preference
   */
  const updateIndicator = useCallback((indicator, enabled) => {
    const newIndicators = { ...preferences.indicators, [indicator]: enabled }
    const newPreferences = { ...preferences, indicators: newIndicators }
    setPreferences(newPreferences)
    savePreferences(newPreferences)
  }, [preferences, savePreferences])

  // Load preferences on mount
  useEffect(() => {
    loadPreferences()
  }, [loadPreferences])

  return {
    preferences,
    isLoading,
    error,
    updatePreference,
    updateIndicator,
    savePreferences,
    loadPreferences
  }
}

