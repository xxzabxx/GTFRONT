import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import ScannerPanel from '../components/ScannerPanel'
import TradingViewChart from '../components/TradingViewChart'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  TrendingUp, 
  TrendingDown,
  BarChart3, 
  Search, 
  MessageSquare, 
  Newspaper,
  Activity,
  DollarSign,
  Volume2,
  Clock,
  Users,
  Zap
} from 'lucide-react'

const DashboardPage = () => {
  const { user, hasPermission, getTierInfo } = useAuth()
  const [marketStatus, setMarketStatus] = useState('OPEN') // OPEN, CLOSED, PRE_MARKET, AFTER_HOURS
  const [currentTime, setCurrentTime] = useState(new Date())
  const [selectedSymbol, setSelectedSymbol] = useState(null)

  const tierInfo = getTierInfo()

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Handle symbol selection from scanner
  const handleSymbolSelect = (symbol) => {
    setSelectedSymbol(symbol)
    console.log('Selected symbol:', symbol) // For debugging
  }

  // Demo data for scanners
  const scannerResults = [
    { symbol: 'DEMO1', price: 15.75, change: 17.12, volume: '2.5M', float: '8.5M', catalyst: 'Earnings Beat' },
    { symbol: 'DEMO2', price: 8.45, change: 16.55, volume: '1.8M', float: '6.2M', catalyst: 'FDA Approval' },
    { symbol: 'DEMO3', price: 12.30, change: 14.22, volume: '3.1M', float: '9.8M', catalyst: 'Upgrade' },
    { symbol: 'DEMO4', price: 6.85, change: -8.45, volume: '1.2M', float: '7.1M', catalyst: 'Downgrade' },
    { symbol: 'DEMO5', price: 18.90, change: 22.15, volume: '4.2M', float: '5.5M', catalyst: 'News' }
  ]

  // Demo news data
  const newsItems = [
    { title: 'Market Opens Higher on Tech Earnings', time: '9:30 AM', source: 'MarketWatch' },
    { title: 'DEMO1 Beats Q3 Earnings Expectations', time: '9:15 AM', source: 'Reuters' },
    { title: 'Fed Minutes Show Dovish Sentiment', time: '8:45 AM', source: 'Bloomberg' },
    { title: 'Pre-Market Movers: DEMO2 Up 15%', time: '8:30 AM', source: 'CNBC' }
  ]

  // Demo chat messages
  const chatMessages = [
    { user: 'TraderPro', message: 'DEMO1 breaking resistance at $15.50', time: '10:15' },
    { user: 'MomentumKing', message: 'Volume spike on DEMO2, watching for breakout', time: '10:14' },
    { user: 'DayTrader99', message: 'Good morning traders! Ready for another profitable day', time: '10:12' },
    { user: 'SwingMaster', message: 'DEMO3 showing strong momentum, in at $12.20', time: '10:10' }
  ]

  return (
    <div className="min-h-screen bg-background p-4">
      {/* Header with market status */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">
              Welcome back, {user?.first_name || user?.username}!
            </h1>
            <p className="text-muted-foreground">
              {currentTime.toLocaleDateString()} • {currentTime.toLocaleTimeString()}
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <Badge 
              variant={marketStatus === 'OPEN' ? 'default' : 'secondary'}
              className="flex items-center space-x-1"
            >
              <Activity className="w-3 h-3" />
              <span>Market {marketStatus.replace('_', ' ')}</span>
            </Badge>
            <Badge variant="outline" className="flex items-center space-x-1">
              <Users className="w-3 h-3" />
              <span>247 Traders Online</span>
            </Badge>
          </div>
        </div>
      </div>

      {/* Main Dashboard Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
        
        {/* Left Panel - Scanners & Watchlists (25%) */}
        <div className="lg:col-span-1 space-y-4">
          <ScannerPanel onSymbolSelect={handleSymbolSelect} />
        </div>

        {/* Center Panel - Charts (50%) */}
        <div className="lg:col-span-2">
          <TradingViewChart 
            selectedSymbol={selectedSymbol || 'AAPL'}
            onSymbolChange={setSelectedSymbol}
            className="h-full"
          />
        </div>

        {/* Right Panel - News & Chat (25%) */}
        <div className="lg:col-span-1 space-y-4">
          
          {/* News Section */}
          <Card className="h-1/2">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2">
                <Newspaper className="w-5 h-5" />
                <span>Market News</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-2 px-4 pb-4">
                {newsItems.map((news, index) => (
                  <div 
                    key={index}
                    className="p-3 border border-border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                  >
                    <div className="text-sm font-medium mb-1 line-clamp-2">
                      {news.title}
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{news.source}</span>
                      <span>{news.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Chat Section */}
          <Card className="h-1/2">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="w-5 h-5" />
                <span>Trading Room</span>
                <Badge variant="outline" className="ml-auto">
                  <Users className="w-3 h-3 mr-1" />
                  247
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 flex flex-col h-full">
              <div className="flex-1 space-y-2 px-4 pb-2 overflow-y-auto">
                {chatMessages.map((msg, index) => (
                  <div key={index} className="text-sm">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-semibold text-primary">{msg.user}</span>
                      <span className="text-xs text-muted-foreground">{msg.time}</span>
                    </div>
                    <div className="text-foreground">{msg.message}</div>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t border-border">
                <div className="text-center text-muted-foreground">
                  <MessageSquare className="w-6 h-6 mx-auto mb-2 opacity-50" />
                  <p className="text-xs">Chat functionality coming soon</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage

