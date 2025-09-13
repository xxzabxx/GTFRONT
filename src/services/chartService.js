// Chart Service for TradingView Lightweight Charts + Finnhub Integration
// Handles data fetching, processing, and formatting for charts

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

/**
 * Chart Service Class
 * Manages all chart-related data operations
 */
class ChartService {
  constructor() {
    this.cache = new Map()
    this.cacheTimeout = 30000 // 30 seconds cache for real-time data
  }

  /**
   * Get authentication token from localStorage
   */
  getAuthToken() {
    const token = localStorage.getItem('token')
    if (!token) {
      throw new Error('Authentication required')
    }
    return token
  }

  /**
   * Generate cache key for data requests
   */
  getCacheKey(symbol, resolution, from, to) {
    return `${symbol}_${resolution}_${from}_${to}`
  }

  /**
   * Check if cached data is still valid
   */
  isCacheValid(cacheEntry) {
    return Date.now() - cacheEntry.timestamp < this.cacheTimeout
  }

  /**
   * Fetch candlestick data from Finnhub API
   * @param {string} symbol - Stock symbol (e.g., 'AAPL')
   * @param {string} resolution - Timeframe ('1', '5', '15', '60', 'D')
   * @param {number} from - Start timestamp (Unix)
   * @param {number} to - End timestamp (Unix)
   * @returns {Promise<Object>} Chart data in lightweight-charts format
   */
  async getCandlestickData(symbol, resolution = '5', from = null, to = null) {
    try {
      // Default time range if not provided (last 30 days)
      if (!to) to = Math.floor(Date.now() / 1000)
      if (!from) from = to - (30 * 24 * 60 * 60)

      const cacheKey = this.getCacheKey(symbol, resolution, from, to)
      
      // Check cache first
      if (this.cache.has(cacheKey)) {
        const cached = this.cache.get(cacheKey)
        if (this.isCacheValid(cached)) {
          return cached.data
        }
      }

      const token = this.getAuthToken()
      const url = `${API_BASE_URL}/api/market/candles?symbol=${symbol}&resolution=${resolution}&from=${from}&to=${to}`

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch chart data: ${response.statusText}`)
      }

      const data = await response.json()
      
      if (data.s !== 'ok') {
        throw new Error('No data available for this symbol')
      }

      // Convert Finnhub data to lightweight-charts format
      const formattedData = this.formatCandlestickData(data)
      
      // Cache the result
      this.cache.set(cacheKey, {
        data: formattedData,
        timestamp: Date.now()
      })

      return formattedData

    } catch (error) {
      console.error('ChartService.getCandlestickData error:', error)
      throw error
    }
  }

  /**
   * Format Finnhub candlestick data for lightweight-charts
   * @param {Object} finnhubData - Raw data from Finnhub API
   * @returns {Object} Formatted data with candlestick and volume series
   */
  formatCandlestickData(finnhubData) {
    const { c, o, h, l, v, t } = finnhubData

    // Create candlestick data
    const candlestickData = c.map((close, index) => ({
      time: t[index],
      open: o[index],
      high: h[index],
      low: l[index],
      close: close,
    }))

    // Create volume data with colors
    const volumeData = v.map((volume, index) => ({
      time: t[index],
      value: volume,
      color: c[index] >= o[index] ? '#10b981' : '#ef4444', // green for up, red for down
    }))

    return {
      candlestick: candlestickData,
      volume: volumeData,
      symbol: finnhubData.symbol || 'Unknown',
      lastUpdate: new Date()
    }
  }

  /**
   * Get real-time quote for a symbol
   * @param {string} symbol - Stock symbol
   * @returns {Promise<Object>} Real-time quote data
   */
  async getRealTimeQuote(symbol) {
    try {
      const token = this.getAuthToken()
      const url = `${API_BASE_URL}/api/market/quote/${symbol}`

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch quote: ${response.statusText}`)
      }

      const data = await response.json()
      return data

    } catch (error) {
      console.error('ChartService.getRealTimeQuote error:', error)
      throw error
    }
  }

  /**
   * Calculate technical indicators
   */
  calculateSMA(data, period) {
    const sma = []
    for (let i = period - 1; i < data.length; i++) {
      const sum = data.slice(i - period + 1, i + 1).reduce((acc, val) => acc + val.close, 0)
      sma.push({
        time: data[i].time,
        value: sum / period
      })
    }
    return sma
  }

  calculateEMA(data, period) {
    const ema = []
    const multiplier = 2 / (period + 1)
    
    // Start with SMA for first value
    let emaValue = data.slice(0, period).reduce((acc, val) => acc + val.close, 0) / period
    ema.push({
      time: data[period - 1].time,
      value: emaValue
    })

    // Calculate EMA for remaining values
    for (let i = period; i < data.length; i++) {
      emaValue = (data[i].close - emaValue) * multiplier + emaValue
      ema.push({
        time: data[i].time,
        value: emaValue
      })
    }
    
    return ema
  }

  calculateVWAP(candlestickData, volumeData) {
    let cumulativeVolume = 0
    let cumulativeVolumePrice = 0
    const vwap = []

    for (let i = 0; i < candlestickData.length; i++) {
      const candle = candlestickData[i]
      const volume = volumeData[i]?.value || 0
      
      const typicalPrice = (candle.high + candle.low + candle.close) / 3
      cumulativeVolumePrice += typicalPrice * volume
      cumulativeVolume += volume

      if (cumulativeVolume > 0) {
        vwap.push({
          time: candle.time,
          value: cumulativeVolumePrice / cumulativeVolume
        })
      }
    }

    return vwap
  }

  /**
   * Get chart data with technical indicators
   * @param {string} symbol - Stock symbol
   * @param {string} resolution - Timeframe
   * @param {Object} indicators - Indicator configuration
   * @returns {Promise<Object>} Complete chart data with indicators
   */
  async getChartDataWithIndicators(symbol, resolution = '5', indicators = {}) {
    try {
      const baseData = await this.getCandlestickData(symbol, resolution)
      const result = { ...baseData }

      // Calculate requested indicators
      if (indicators.sma9) {
        result.sma9 = this.calculateSMA(baseData.candlestick, 9)
      }
      
      if (indicators.ema9) {
        result.ema9 = this.calculateEMA(baseData.candlestick, 9)
      }
      
      if (indicators.ema20) {
        result.ema20 = this.calculateEMA(baseData.candlestick, 20)
      }
      
      if (indicators.sma200) {
        result.sma200 = this.calculateSMA(baseData.candlestick, 200)
      }
      
      if (indicators.vwap) {
        result.vwap = this.calculateVWAP(baseData.candlestick, baseData.volume)
      }

      return result

    } catch (error) {
      console.error('ChartService.getChartDataWithIndicators error:', error)
      throw error
    }
  }

  /**
   * Clear cache (useful for testing or memory management)
   */
  clearCache() {
    this.cache.clear()
  }

  /**
   * Get cache statistics
   */
  getCacheStats() {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys())
    }
  }
}

// Export singleton instance
export default new ChartService()

