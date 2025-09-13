import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { scannerService } from '../services/scannerService'
import { getMarketStatus, isMarketOpen } from '../utils/marketHours'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import TierBadge from './TierBadge'
import UpgradeModal from './UpgradeModal'
import { 
  Search, 
  RefreshCw, 
  Activity, 
  TrendingUp, 
  Zap, 
  BarChart3, 
  AlertTriangle, 
  Lock, 
  Crown,
  X,
  Volume2
} from 'lucide-react'

const ScannerPanel = ({ onSymbolSelect }) => {
  const { user, token, getTierInfo } = useAuth()
  const [scannerData, setScannerData] = useState({
    momentum: { results: [], loading: false, error: null, lastUpdate: null },
    gappers: { results: [], loading: false, error: null, lastUpdate: null },
    low_float: { results: [], loading: false, error: null, lastUpdate: null }
  })
  const [activeTab, setActiveTab] = useState('momentum')
  const [scannerStatus, setScannerStatus] = useState(null)
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [refreshInterval, setRefreshInterval] = useState(300) // 5 minutes to reduce API calls
  const [lastRefresh, setLastRefresh] = useState(null)
  const [nextRefresh, setNextRefresh] = useState(null)
  const [notification, setNotification] = useState(null)
  const [upgradeModal, setUpgradeModal] = useState({ isOpen: false, feature: null })
  const [marketStatus, setMarketStatus] = useState(null)

  const tierInfo = getTierInfo()

  // Tier-based access control
  const getScannerAccess = (scannerType) => {
    const tier = tierInfo.tier || 'free'
    
    const accessRules = {
      momentum: {
        free: { available: true, limited: true, maxResults: 5 },
        basic: { available: true, limited: false },
        pro: { available: true, limited: false },
        premium: { available: true, limited: false }
      },
      gappers: {
        free: { available: false, requiredTier: 'basic' },
        basic: { available: true, limited: true, maxResults: 10 },
        pro: { available: true, limited: false },
        premium: { available: true, limited: false }
      },
      low_float: {
        free: { available: false, requiredTier: 'pro' },
        basic: { available: false, requiredTier: 'pro' },
        pro: { available: true, limited: true, maxResults: 15 },
        premium: { available: true, limited: false }
      }
    }

    return accessRules[scannerType]?.[tier] || { available: false, requiredTier: 'premium' }
  }

  const handleUpgradeClick = (scannerType) => {
    setUpgradeModal({ isOpen: true, feature: scannerType })
  }

  // Auto-dismiss notifications after 5 seconds
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [notification])

  // Fetch scanner status on component mount
  useEffect(() => {
    fetchScannerStatus()
  }, [])

  // Market hours-aware auto-refresh logic
  useEffect(() => {
    // Update market status every minute
    const updateMarketStatus = () => {
      const status = getMarketStatus()
      setMarketStatus(status)
    }
    
    updateMarketStatus() // Initial update
    const marketStatusInterval = setInterval(updateMarketStatus, 60000) // Update every minute
    
    if (!autoRefresh) {
      setNextRefresh(null)
      return () => clearInterval(marketStatusInterval)
    }

    const refreshData = () => {
      // Only auto-refresh if market is open and scanner is enabled
      if (marketStatus?.shouldAutoRefresh && scannerStatus && scannerStatus.scanners[activeTab]?.enabled) {
        setLastRefresh(new Date())
        fetchScannerData(activeTab)
      }
    }

    // Initial refresh only if market is open
    if (marketStatus?.shouldAutoRefresh) {
      refreshData()
    }

    const interval = setInterval(() => {
      // Check market status before each refresh
      const currentMarketStatus = getMarketStatus()
      if (currentMarketStatus.shouldAutoRefresh && scannerStatus && scannerStatus.scanners[activeTab]?.enabled) {
        refreshData()
      }
    }, refreshInterval * 1000)

    // Countdown timer for next refresh (only during market hours)
    const countdownInterval = setInterval(() => {
      if (lastRefresh && marketStatus?.shouldAutoRefresh) {
        const nextRefreshTime = new Date(lastRefresh.getTime() + refreshInterval * 1000)
        setNextRefresh(nextRefreshTime)
      } else {
        setNextRefresh(null)
      }
    }, 1000)

    return () => {
      clearInterval(interval)
      clearInterval(countdownInterval)
      clearInterval(marketStatusInterval)
    }
  }, [activeTab, autoRefresh, scannerStatus, refreshInterval, marketStatus])

  // Update lastRefresh when data is fetched
  useEffect(() => {
    const currentData = scannerData[activeTab]
    if (currentData && currentData.lastUpdate && !currentData.loading) {
      setLastRefresh(currentData.lastUpdate)
    }
  }, [scannerData, activeTab])

  const fetchScannerStatus = async () => {
    try {
      const data = await scannerService.getScannerStatus(token)
      setScannerStatus(data)
      
      // Auto-load momentum scanner if available
      if (data.scanners.momentum?.enabled && data.scanners.momentum?.available) {
        fetchScannerData('momentum')
      }
    } catch (error) {
      console.error('Error fetching scanner status:', error)
    }
  }

  const fetchScannerData = async (scannerType, retryCount = 0) => {
    const maxRetries = 3
    
    setScannerData(prev => ({
      ...prev,
      [scannerType]: { ...prev[scannerType], loading: true, error: null }
    }))

    try {
      let data
      
      // Call appropriate scanner service method
      switch (scannerType) {
        case 'momentum':
          data = await scannerService.getMomentumScanner(token)
          break
        case 'gappers':
          data = await scannerService.getGappersScanner(token)
          break
        case 'low_float':
          data = await scannerService.getLowFloatScanner(token)
          break
        default:
          throw new Error(`Unknown scanner type: ${scannerType}`)
      }

      setScannerData(prev => ({
        ...prev,
        [scannerType]: {
          results: data.results || [],
          loading: false,
          error: null,
          lastUpdate: new Date(),
          criteria: data.criteria,
          limit: data.limit,
          count: data.count,
          retryCount: 0
        }
      }))
    } catch (error) {
      console.error(`Scanner error for ${scannerType}:`, error)
      
      // Determine error type and message
      let errorMessage = 'Failed to load scanner data'
      let upgradeRequired = false
      
      if (error.message?.includes('upgrade') || error.message?.includes('premium')) {
        upgradeRequired = true
        errorMessage = 'Upgrade required to access this scanner'
      } else if (error.message?.includes('network') || error.message?.includes('fetch')) {
        errorMessage = 'Network error. Please check your connection.'
      } else if (error.message?.includes('unauthorized') || error.message?.includes('401')) {
        errorMessage = 'Session expired. Please refresh the page.'
      } else if (error.message) {
        errorMessage = error.message
      }

      // Auto-retry for network errors (not for auth or upgrade errors)
      if (retryCount < maxRetries && !upgradeRequired && !error.message?.includes('unauthorized')) {
        console.log(`Retrying ${scannerType} scanner (attempt ${retryCount + 1}/${maxRetries})`)
        
        // Show retry notification
        setNotification({
          type: 'warning',
          message: `Retrying ${scannerType} scanner... (${retryCount + 1}/${maxRetries})`
        })
        
        setTimeout(() => {
          fetchScannerData(scannerType, retryCount + 1)
        }, 1000 * (retryCount + 1)) // Exponential backoff
        return
      }

      setScannerData(prev => ({
        ...prev,
        [scannerType]: {
          ...prev[scannerType],
          loading: false,
          error: errorMessage,
          upgrade_required: upgradeRequired,
          retryCount: retryCount
        }
      }))
    }
  }

  const handleRefresh = () => {
    if (scannerStatus?.scanners[activeTab]?.enabled) {
      fetchScannerData(activeTab)
    }
  }

  const handleSymbolClick = (symbol) => {
    if (onSymbolSelect) {
      onSymbolSelect(symbol)
    }
  }

  const toggleAutoRefresh = () => {
    setAutoRefresh(!autoRefresh)
    if (!autoRefresh) {
      setNotification({
        type: 'info',
        message: `Auto-refresh enabled (${refreshInterval}s intervals)`
      })
    } else {
      setNotification({
        type: 'info',
        message: 'Auto-refresh disabled'
      })
    }
  }

  const handleRefreshIntervalChange = (newInterval) => {
    setRefreshInterval(newInterval)
    setNotification({
      type: 'info',
      message: `Refresh interval updated to ${newInterval} seconds`
    })
  }

  const getCountdownText = () => {
    // If market is closed, show market status instead of countdown
    if (!marketStatus?.shouldAutoRefresh) {
      return marketStatus?.description || 'Market Closed'
    }
    
    if (!autoRefresh || !nextRefresh) return null
    
    const now = new Date()
    const diff = Math.max(0, Math.ceil((nextRefresh - now) / 1000))
    
    if (diff === 0) return 'Refreshing...'
    return `${diff}s`
  }

  const getLastUpdateText = () => {
    if (!lastRefresh) return 'Never'
    
    const now = new Date()
    const diff = Math.floor((now - lastRefresh) / 1000)
    
    if (diff < 60) return `${diff}s ago`
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
    return `${Math.floor(diff / 3600)}h ago`
  }

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M'
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return num.toString()
  }

  const formatPrice = (price) => {
    return typeof price === 'number' ? price.toFixed(2) : price
  }

  const formatPercent = (percent) => {
    const num = typeof percent === 'number' ? percent : parseFloat(percent)
    return isNaN(num) ? '0.00' : num.toFixed(2)
  }

  // Skeleton loading component for better UX
  const ScannerSkeleton = () => (
    <div className="space-y-2">
      {[...Array(5)].map((_, index) => (
        <div key={index} className="p-3 border border-border rounded-lg animate-pulse">
          <div className="flex justify-between items-start mb-2">
            <div>
              <div className="h-4 bg-muted rounded w-16 mb-1"></div>
              <div className="h-3 bg-muted rounded w-24"></div>
            </div>
            <div className="text-right">
              <div className="h-4 bg-muted rounded w-12 mb-1"></div>
              <div className="h-3 bg-muted rounded w-10"></div>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="h-3 bg-muted rounded w-16"></div>
            <div className="h-3 bg-muted rounded w-12"></div>
          </div>
        </div>
      ))}
    </div>
  )

  // Enhanced error component with retry functionality
  const ErrorDisplay = ({ error, onRetry, upgradeRequired = false }) => (
    <div className="text-center py-8">
      <AlertTriangle className="w-8 h-8 mx-auto mb-2 text-red-500" />
      <p className="font-semibold text-red-500 mb-2">Scanner Error</p>
      <p className="text-sm text-muted-foreground mb-4 max-w-xs mx-auto">
        {error || 'Unable to load scanner data. Please try again.'}
      </p>
      <div className="space-y-2">
        {upgradeRequired ? (
          <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600">
            <Crown className="w-4 h-4 mr-2" />
            Upgrade Now
          </Button>
        ) : (
          <Button size="sm" variant="outline" onClick={onRetry}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
        )}
        <div className="text-xs text-muted-foreground">
          If the problem persists, check your connection
        </div>
      </div>
    </div>
  )

  // Enhanced loading component with progress indication
  const LoadingDisplay = ({ message = "Scanning markets..." }) => (
    <div className="text-center text-muted-foreground py-8">
      <div className="relative">
        <RefreshCw className="w-8 h-8 mx-auto mb-2 animate-spin" />
        <div className="absolute inset-0 w-8 h-8 mx-auto border-2 border-primary/20 rounded-full animate-pulse"></div>
      </div>
      <p className="font-medium">{message}</p>
      <div className="text-xs mt-1">
        Analyzing market data with Ross Cameron criteria
      </div>
      <div className="flex justify-center mt-3">
        <div className="flex space-x-1">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 bg-primary rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.1}s` }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  )

  // Notification component for user feedback
  const NotificationBanner = ({ notification, onDismiss }) => {
    if (!notification) return null

    const { type, message } = notification
    const bgColor = type === 'error' ? 'bg-red-500/10 border-red-500/20' : 
                   type === 'warning' ? 'bg-yellow-500/10 border-yellow-500/20' :
                   'bg-blue-500/10 border-blue-500/20'
    
    const textColor = type === 'error' ? 'text-red-400' :
                     type === 'warning' ? 'text-yellow-400' :
                     'text-blue-400'

    return (
      <div className={`mx-4 mb-4 p-3 rounded-lg border ${bgColor} ${textColor} text-sm flex items-center justify-between`}>
        <span>{message}</span>
        <Button size="sm" variant="ghost" onClick={onDismiss} className="h-6 w-6 p-0">
          <X className="w-3 h-3" />
        </Button>
      </div>
    )
  }

  const ScannerResults = ({ scannerType }) => {
    const data = scannerData[scannerType]
    const status = scannerStatus?.scanners[scannerType]
    const access = getScannerAccess(scannerType)

    // Check tier-based access first
    if (!access.available) {
      return (
        <div className="text-center py-8">
          <div className="relative">
            <Lock className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
            <Crown className="w-6 h-6 absolute -top-1 -right-1 text-yellow-500" />
          </div>
          <h3 className="font-semibold mb-2">
            {scannerType.charAt(0).toUpperCase() + scannerType.slice(1).replace('_', ' ')} Scanner
          </h3>
          <p className="text-sm text-muted-foreground mb-3">
            Requires {access.requiredTier.charAt(0).toUpperCase() + access.requiredTier.slice(1)} tier or higher
          </p>
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-xs text-muted-foreground">Current:</span>
            <TierBadge tier={tierInfo.tier} size="sm" />
            <span className="text-xs text-muted-foreground">→</span>
            <TierBadge tier={access.requiredTier} size="sm" />
          </div>
          <Button 
            size="sm" 
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            onClick={() => handleUpgradeClick(scannerType)}
          >
            <Crown className="w-4 h-4 mr-2" />
            Upgrade to {access.requiredTier.charAt(0).toUpperCase() + access.requiredTier.slice(1)}
          </Button>
        </div>
      )
    }

    if (!status?.enabled) {
      return (
        <div className="text-center text-muted-foreground py-8">
          <Lock className="w-8 h-8 mx-auto mb-2" />
          <p>Scanner temporarily disabled</p>
          <p className="text-xs">Check back later</p>
        </div>
      )
    }

    if (data.loading) {
      return <LoadingDisplay message="Scanning markets..." />
    }

    if (data.error) {
      return (
        <ErrorDisplay 
          error={data.error}
          onRetry={() => fetchScannerData(scannerType)}
          upgradeRequired={data.upgrade_required}
        />
      )
    }

    if (!data.results || data.results.length === 0) {
      return (
        <div className="text-center text-muted-foreground py-8">
          <Search className="w-8 h-8 mx-auto mb-2" />
          <p>No opportunities found</p>
          <p className="text-xs">Market conditions may not meet criteria</p>
        </div>
      )
    }

    return (
      <div className="space-y-2">
        {data.results.map((stock, index) => (
          <div 
            key={`${stock.symbol}-${index}`}
            className="p-3 border border-border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
            onClick={() => handleSymbolClick(stock.symbol)}
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <span className="font-semibold text-sm">{stock.symbol}</span>
                <div className="text-xs text-muted-foreground">
                  {stock.float && `Float: ${formatNumber(stock.float)}`}
                  {stock.market_cap && ` • MCap: ${formatNumber(stock.market_cap)}`}
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-sm">${formatPrice(stock.price)}</div>
                <div className={`text-xs ${stock.percent_change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {stock.percent_change >= 0 ? '+' : ''}{formatPercent(stock.percent_change)}%
                </div>
              </div>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Vol: {formatNumber(stock.volume)}</span>
              <span>RVol: {stock.relative_volume ? `${stock.relative_volume.toFixed(1)}x` : 'N/A'}</span>
            </div>
            {stock.catalyst && (
              <div className="mt-1 text-xs text-blue-400 truncate">
                {stock.catalyst}
              </div>
            )}
          </div>
        ))}
        
        {data.lastUpdate && (
          <div className="text-xs text-muted-foreground text-center pt-2 border-t">
            <div className="flex items-center justify-center space-x-4">
              <div className="flex items-center space-x-1">
                <div className={`w-2 h-2 rounded-full ${autoRefresh ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
                <span>{autoRefresh ? 'Live' : 'Manual'}</span>
              </div>
              <span>Updated: {data.lastUpdate.toLocaleTimeString()}</span>
              {data.count !== undefined && data.limit && (
                <span>Results: {data.count}/{data.limit}</span>
              )}
              {autoRefresh && getCountdownText() && (
                <span>Next: {getCountdownText()}</span>
              )}
            </div>
            {data.criteria && (
              <div className="mt-1 text-xs text-muted-foreground/70">
                {data.criteria.description}
              </div>
            )}
          </div>
        )}
      </div>
    )
  }

  return (
    <>
      <Card className="h-full">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Search className="w-5 h-5" />
              <CardTitle>Live Scanners</CardTitle>
              <TierBadge tier={tierInfo.tier} size="sm" />
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleRefresh}
                  disabled={!scannerStatus?.scanners[activeTab]?.enabled || scannerData[activeTab]?.loading}
                  className="px-2"
                >
                  <RefreshCw className={`w-4 h-4 ${scannerData[activeTab]?.loading ? 'animate-spin' : ''}`} />
                </Button>
                
                <Button
                  size="sm"
                  variant={autoRefresh ? "default" : "outline"}
                  onClick={toggleAutoRefresh}
                  className="px-2"
                >
                  <Activity className="w-3 h-3" />
                </Button>
                
                <select
                  value={refreshInterval}
                  onChange={(e) => handleRefreshIntervalChange(Number(e.target.value))}
                  className="text-xs bg-background border border-border rounded px-2 py-1 h-8"
                  disabled={!autoRefresh}
                >
                  <option value={15}>15s</option>
                  <option value={30}>30s</option>
                  <option value={60}>1m</option>
                  <option value={120}>2m</option>
                  <option value={300}>5m</option>
                </select>
              </div>
              
              <div className="flex flex-col items-end text-xs text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <span>Last:</span>
                  <span>{getLastUpdateText()}</span>
                </div>
                {autoRefresh && getCountdownText() && (
                  <div className="flex items-center space-x-1">
                    <span>Next:</span>
                    <span className="font-mono">{getCountdownText()}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <CardDescription className="flex items-center justify-between">
            <span>Ross Cameron momentum strategies</span>
            {tierInfo.tier === 'free' && (
              <Button 
                variant="link" 
                size="sm" 
                className="h-auto p-0 text-xs text-primary"
                onClick={() => handleUpgradeClick('premium')}
              >
                Upgrade for full access →
              </Button>
            )}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="p-0">
          <NotificationBanner 
            notification={notification} 
            onDismiss={() => setNotification(null)} 
          />
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
            <TabsList className="grid w-full grid-cols-3 mx-4 mb-4">
              <TabsTrigger value="momentum" className="text-xs">
                <TrendingUp className="w-3 h-3 mr-1" />
                Momentum
                {getScannerAccess('momentum').limited && (
                  <Badge variant="secondary" className="ml-1 text-xs px-1 py-0">
                    Limited
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger 
                value="gappers" 
                className={`text-xs ${!getScannerAccess('gappers').available ? 'opacity-60' : ''}`}
              >
                <Zap className="w-3 h-3 mr-1" />
                Gappers
                {!getScannerAccess('gappers').available && (
                  <Lock className="w-3 h-3 ml-1 text-muted-foreground" />
                )}
                {getScannerAccess('gappers').available && getScannerAccess('gappers').limited && (
                  <Badge variant="secondary" className="ml-1 text-xs px-1 py-0">
                    Limited
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger 
                value="low_float" 
                className={`text-xs ${!getScannerAccess('low_float').available ? 'opacity-60' : ''}`}
              >
                <Volume2 className="w-3 h-3 mr-1" />
                Low Float
                {!getScannerAccess('low_float').available && (
                  <Lock className="w-3 h-3 ml-1 text-muted-foreground" />
                )}
                {getScannerAccess('low_float').available && getScannerAccess('low_float').limited && (
                  <Badge variant="secondary" className="ml-1 text-xs px-1 py-0">
                    Limited
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>
            
            <div className="px-4 pb-4">
              <TabsContent value="momentum" className="mt-0">
                <ScannerResults scannerType="momentum" />
              </TabsContent>
              
              <TabsContent value="gappers" className="mt-0">
                <ScannerResults scannerType="gappers" />
              </TabsContent>
              
              <TabsContent value="low_float" className="mt-0">
                <ScannerResults scannerType="low_float" />
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>
      
      <UpgradeModal
        isOpen={upgradeModal.isOpen}
        onClose={() => setUpgradeModal({ isOpen: false, feature: null })}
        currentTier={tierInfo.tier}
        feature={upgradeModal.feature}
      />
    </>
  )
}

export default ScannerPanel

