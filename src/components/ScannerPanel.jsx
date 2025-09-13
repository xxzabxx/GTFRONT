import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { scannerService } from '../services/scannerService'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  TrendingUp, 
  TrendingDown,
  Search, 
  RefreshCw,
  Activity,
  DollarSign,
  Volume2,
  Clock,
  Zap,
  AlertTriangle,
  Crown,
  Lock
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

  const tierInfo = getTierInfo()

  // Fetch scanner status on component mount
  useEffect(() => {
    fetchScannerStatus()
  }, [])

  // Auto-refresh logic
  useEffect(() => {
    if (!autoRefresh) return

    const interval = setInterval(() => {
      if (scannerStatus && scannerStatus.scanners[activeTab]?.enabled) {
        fetchScannerData(activeTab)
      }
    }, 30000) // Refresh every 30 seconds

    return () => clearInterval(interval)
  }, [activeTab, autoRefresh, scannerStatus])

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

  const fetchScannerData = async (scannerType) => {
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
          count: data.count
        }
      }))
    } catch (error) {
      setScannerData(prev => ({
        ...prev,
        [scannerType]: {
          ...prev[scannerType],
          loading: false,
          error: error.message || 'Failed to load scanner data',
          upgrade_required: error.message?.includes('upgrade') || error.message?.includes('premium')
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

  const ScannerResults = ({ scannerType }) => {
    const data = scannerData[scannerType]
    const status = scannerStatus?.scanners[scannerType]

    if (!status?.enabled) {
      return (
        <div className="text-center text-muted-foreground py-8">
          <Lock className="w-8 h-8 mx-auto mb-2" />
          <p>Scanner temporarily disabled</p>
          <p className="text-xs">Check back later</p>
        </div>
      )
    }

    if (!status?.available) {
      return (
        <div className="text-center py-8">
          <Crown className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
          <p className="font-semibold mb-2">Premium Feature</p>
          <p className="text-sm text-muted-foreground mb-4">
            Upgrade to access {scannerType.replace('_', ' ')} scanner
          </p>
          <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600">
            Upgrade Now
          </Button>
        </div>
      )
    }

    if (data.loading) {
      return (
        <div className="text-center text-muted-foreground py-8">
          <RefreshCw className="w-8 h-8 mx-auto mb-2 animate-spin" />
          <p>Scanning markets...</p>
        </div>
      )
    }

    if (data.error) {
      return (
        <div className="text-center py-8">
          <AlertTriangle className="w-8 h-8 mx-auto mb-2 text-red-500" />
          <p className="text-sm text-red-500 mb-4">{data.error}</p>
          {data.upgrade_required ? (
            <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600">
              Upgrade Now
            </Button>
          ) : (
            <Button size="sm" variant="outline" onClick={handleRefresh}>
              Try Again
            </Button>
          )}
        </div>
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
            Last updated: {data.lastUpdate.toLocaleTimeString()}
            {data.count && data.limit && (
              <span className="ml-2">• Showing {data.count}/{data.limit} results</span>
            )}
          </div>
        )}
      </div>
    )
  }

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Search className="w-5 h-5" />
            <CardTitle>Live Scanners</CardTitle>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              variant="outline"
              onClick={handleRefresh}
              disabled={!scannerStatus?.scanners[activeTab]?.enabled || scannerData[activeTab]?.loading}
            >
              <RefreshCw className={`w-4 h-4 ${scannerData[activeTab]?.loading ? 'animate-spin' : ''}`} />
            </Button>
            <Badge variant="outline" className="text-xs">
              <Activity className="w-3 h-3 mr-1" />
              {autoRefresh ? 'Live' : 'Manual'}
            </Badge>
          </div>
        </div>
        <CardDescription>
          Ross Cameron momentum strategies • {tierInfo.name} tier
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
          <TabsList className="grid w-full grid-cols-3 mx-4 mb-4">
            <TabsTrigger value="momentum" className="text-xs">
              <TrendingUp className="w-3 h-3 mr-1" />
              Momentum
            </TabsTrigger>
            <TabsTrigger value="gappers" className="text-xs">
              <Zap className="w-3 h-3 mr-1" />
              Gappers
            </TabsTrigger>
            <TabsTrigger value="low_float" className="text-xs">
              <Volume2 className="w-3 h-3 mr-1" />
              Low Float
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
  )
}

export default ScannerPanel

