import React, { useEffect, useRef, useState } from 'react'
import { createChart } from 'lightweight-charts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { RefreshCw, TrendingUp, BarChart3 } from 'lucide-react'

const TradingViewChart = ({ 
  selectedSymbol = 'AAPL', 
  onSymbolChange,
  userPreferences = {},
  className = '' 
}) => {
  const chartContainerRef = useRef(null)
  const chartRef = useRef(null)
  const candlestickSeriesRef = useRef(null)
  const volumeSeriesRef = useRef(null)
  
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [timeframe, setTimeframe] = useState('5')
  const [chartData, setChartData] = useState([])
  const [lastUpdate, setLastUpdate] = useState(null)

  // Chart configuration matching our dark theme
  const chartConfig = {
    layout: {
      background: { color: 'transparent' },
      textColor: '#d1d5db', // gray-300
    },
    grid: {
      vertLines: { color: '#374151' }, // gray-700
      horzLines: { color: '#374151' }, // gray-700
    },
    crosshair: {
      mode: 1, // Normal crosshair mode
    },
    rightPriceScale: {
      borderColor: '#4b5563', // gray-600
    },
    timeScale: {
      borderColor: '#4b5563', // gray-600
      timeVisible: true,
      secondsVisible: false,
    },
    watermark: {
      visible: false,
    },
  }

  // Initialize chart
  useEffect(() => {
    if (!chartContainerRef.current) return

    // Create chart instance
    const chart = createChart(chartContainerRef.current, {
      ...chartConfig,
      width: chartContainerRef.current.clientWidth,
      height: 400,
    })

    // Add candlestick series
    const candlestickSeries = chart.addCandlestickSeries({
      upColor: '#10b981', // green-500
      downColor: '#ef4444', // red-500
      borderDownColor: '#ef4444',
      borderUpColor: '#10b981',
      wickDownColor: '#ef4444',
      wickUpColor: '#10b981',
    })

    // Add volume series
    const volumeSeries = chart.addHistogramSeries({
      color: '#6b7280', // gray-500
      priceFormat: {
        type: 'volume',
      },
      priceScaleId: 'volume',
    })

    // Configure volume scale
    chart.priceScale('volume').applyOptions({
      scaleMargins: {
        top: 0.8,
        bottom: 0,
      },
    })

    // Store references
    chartRef.current = chart
    candlestickSeriesRef.current = candlestickSeries
    volumeSeriesRef.current = volumeSeries

    // Handle resize
    const handleResize = () => {
      if (chartContainerRef.current && chart) {
        chart.applyOptions({
          width: chartContainerRef.current.clientWidth,
        })
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (chart) {
        chart.remove()
      }
    }
  }, [])

  // Fetch chart data from Finnhub
  const fetchChartData = async (symbol, resolution) => {
    setIsLoading(true)
    setError(null)

    try {
      const token = localStorage.getItem('token')
      if (!token) {
        throw new Error('Authentication required')
      }

      // Calculate time range (last 30 days for now)
      const to = Math.floor(Date.now() / 1000)
      const from = to - (30 * 24 * 60 * 60) // 30 days ago

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/market/candles/${symbol}?resolution=${resolution}&days=30`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      )

      if (!response.ok) {
        throw new Error(`Failed to fetch chart data: ${response.statusText}`)
      }

      const data = await response.json()
      
      // Check if we have an error response
      if (data.error) {
        throw new Error(data.error)
      }
      
      // Check if we have valid data
      if (!data.success || !data.data || !data.data.c) {
        throw new Error('No data available for this symbol')
      }

      // Convert backend data to lightweight-charts format
      const chartData = data.data.c.map((close, index) => ({
        time: data.data.t[index],
        open: data.data.o[index],
        high: data.data.h[index],
        low: data.data.l[index],
        close: close,
      }))

      const volumeData = data.data.v.map((volume, index) => ({
        time: data.data.t[index],
        value: volume,
        color: data.data.c[index] >= data.data.o[index] ? '#10b981' : '#ef4444',
      }))

      // Update chart series
      if (candlestickSeriesRef.current && volumeSeriesRef.current) {
        candlestickSeriesRef.current.setData(chartData)
        volumeSeriesRef.current.setData(volumeData)
      }

      setChartData(chartData)
      setLastUpdate(new Date())
      setIsLoading(false)

    } catch (err) {
      console.error('Chart data fetch error:', err)
      setError(err.message)
      setIsLoading(false)
    }
  }

  // Load data when symbol or timeframe changes
  useEffect(() => {
    if (selectedSymbol) {
      fetchChartData(selectedSymbol, timeframe)
    }
  }, [selectedSymbol, timeframe])

  // Handle manual refresh
  const handleRefresh = () => {
    if (selectedSymbol) {
      fetchChartData(selectedSymbol, timeframe)
    }
  }

  // Handle timeframe change
  const handleTimeframeChange = (newTimeframe) => {
    setTimeframe(newTimeframe)
  }

  // Timeframe options
  const timeframeOptions = [
    { value: '1', label: '1m' },
    { value: '5', label: '5m' },
    { value: '15', label: '15m' },
    { value: '60', label: '1h' },
    { value: 'D', label: '1d' },
  ]

  return (
    <Card className={`bg-gray-900 border-gray-700 ${className}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-5 w-5 text-green-500" />
            <CardTitle className="text-white">
              {selectedSymbol} Chart
            </CardTitle>
            {lastUpdate && (
              <span className="text-xs text-gray-400">
                Updated: {lastUpdate.toLocaleTimeString()}
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            {/* Timeframe Selector */}
            <Select value={timeframe} onValueChange={handleTimeframeChange}>
              <SelectTrigger className="w-20 h-8 bg-gray-800 border-gray-600">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-600">
                {timeframeOptions.map((option) => (
                  <SelectItem 
                    key={option.value} 
                    value={option.value}
                    className="text-gray-200 focus:bg-gray-700"
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Refresh Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={isLoading}
              className="bg-gray-800 border-gray-600 hover:bg-gray-700"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {error ? (
          <div className="flex items-center justify-center h-96 text-red-400">
            <div className="text-center">
              <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium">Chart Error</p>
              <p className="text-sm text-gray-500 mt-1">{error}</p>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                className="mt-4 bg-gray-800 border-gray-600 hover:bg-gray-700"
              >
                Try Again
              </Button>
            </div>
          </div>
        ) : (
          <div className="relative">
            {isLoading && (
              <div className="absolute inset-0 bg-gray-900/50 flex items-center justify-center z-10">
                <div className="flex items-center gap-2 text-gray-300">
                  <RefreshCw className="h-5 w-5 animate-spin" />
                  <span>Loading chart data...</span>
                </div>
              </div>
            )}
            
            <div 
              ref={chartContainerRef}
              className="w-full h-96 bg-gray-900"
              style={{ minHeight: '400px' }}
            />
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default TradingViewChart

