import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  ExternalLink, 
  BookOpen, 
  Video, 
  TrendingUp,
  Calculator,
  FileText,
  Users,
  Lightbulb,
  BarChart3,
  Clock
} from 'lucide-react'
import { Helmet } from 'react-helmet-async'

const ResourcesPage = () => {
  const tradingEducation = [
    {
      title: "Ross Cameron - Warrior Trading",
      description: "Learn momentum day trading strategies from one of the most successful day traders. Comprehensive courses on small cap momentum trading.",
      url: "https://www.youtube.com/@WarriorTrading",
      type: "YouTube Channel",
      level: "Beginner to Advanced",
      icon: <Video className="w-5 h-5" />
    },
    {
      title: "Timothy Sykes",
      description: "Penny stock trading education and strategies. Focus on pump and dump patterns and small cap trading.",
      url: "https://www.youtube.com/@TimothySykes",
      type: "YouTube Channel", 
      level: "Intermediate",
      icon: <Video className="w-5 h-5" />
    },
    {
      title: "Ricky Gutierrez - TechBud Solutions",
      description: "Technical analysis, swing trading, and day trading education with focus on chart patterns and risk management.",
      url: "https://www.youtube.com/@TechBudSolutions",
      type: "YouTube Channel",
      level: "Beginner to Intermediate",
      icon: <Video className="w-5 h-5" />
    },
    {
      title: "Humbled Trader",
      description: "Realistic day trading education focusing on risk management, psychology, and sustainable trading strategies.",
      url: "https://www.youtube.com/@HumbledTrader",
      type: "YouTube Channel",
      level: "All Levels",
      icon: <Video className="w-5 h-5" />
    }
  ]

  const tradingTools = [
    {
      title: "TradingView",
      description: "Professional charting platform with advanced technical analysis tools, social trading features, and real-time data.",
      url: "https://www.tradingview.com",
      type: "Charting Platform",
      pricing: "Free / $14.95+ per month",
      icon: <BarChart3 className="w-5 h-5" />
    },
    {
      title: "Finviz",
      description: "Stock screener and market visualization tools. Great for finding stocks that meet specific criteria.",
      url: "https://finviz.com",
      type: "Stock Screener",
      pricing: "Free / $24.96 per month",
      icon: <TrendingUp className="w-5 h-5" />
    },
    {
      title: "SEC EDGAR Database",
      description: "Official SEC database for company filings, 10-K reports, and insider trading information.",
      url: "https://www.sec.gov/edgar",
      type: "Regulatory Database",
      pricing: "Free",
      icon: <FileText className="w-5 h-5" />
    },
    {
      title: "Position Size Calculator",
      description: "Calculate proper position sizes based on your account size, risk tolerance, and stop loss levels.",
      url: "https://www.babypips.com/tools/position-size-calculator",
      type: "Risk Management",
      pricing: "Free",
      icon: <Calculator className="w-5 h-5" />
    }
  ]

  const tradingBooks = [
    {
      title: "How to Day Trade for a Living",
      author: "Andrew Aziz",
      description: "Comprehensive guide to day trading with practical strategies, risk management, and trading psychology.",
      level: "Beginner to Intermediate",
      topics: ["Day Trading Basics", "Risk Management", "Trading Psychology"]
    },
    {
      title: "Trade Like a Stock Market Wizard",
      author: "Mark Minervini",
      description: "Growth stock strategies and momentum trading techniques from a champion stock picker.",
      level: "Intermediate to Advanced",
      topics: ["Growth Stocks", "Momentum Trading", "Chart Patterns"]
    },
    {
      title: "The Complete Guide to Day Trading",
      author: "Markus Heitkoetter",
      description: "Practical day trading strategies with focus on technical analysis and market timing.",
      level: "Beginner",
      topics: ["Technical Analysis", "Market Timing", "Trading Strategies"]
    },
    {
      title: "Trading in the Zone",
      author: "Mark Douglas",
      description: "Master the mental game of trading. Essential reading for developing the right trading mindset.",
      level: "All Levels",
      topics: ["Trading Psychology", "Mindset", "Discipline"]
    }
  ]

  const marketData = [
    {
      title: "Yahoo Finance",
      description: "Free real-time quotes, news, and financial data for stocks, options, and markets.",
      url: "https://finance.yahoo.com",
      features: ["Real-time Quotes", "News", "Earnings Calendar", "Screeners"]
    },
    {
      title: "MarketWatch",
      description: "Market news, analysis, and real-time data with focus on breaking financial news.",
      url: "https://www.marketwatch.com",
      features: ["Market News", "Analysis", "Economic Calendar", "Sector Performance"]
    },
    {
      title: "Benzinga",
      description: "Financial news and analysis with focus on trading opportunities and market movers.",
      url: "https://www.benzinga.com",
      features: ["Breaking News", "Earnings", "FDA Calendar", "Trading Ideas"]
    },
    {
      title: "Economic Calendar - Investing.com",
      description: "Track important economic events and announcements that can impact market volatility.",
      url: "https://www.investing.com/economic-calendar/",
      features: ["Economic Events", "Impact Ratings", "Historical Data", "Filters"]
    }
  ]

  const tradingCommunities = [
    {
      title: "r/SecurityAnalysis",
      description: "Reddit community focused on fundamental analysis and value investing discussions.",
      url: "https://www.reddit.com/r/SecurityAnalysis/",
      members: "200K+ members",
      focus: "Fundamental Analysis"
    },
    {
      title: "r/DayTrading",
      description: "Active day trading community sharing strategies, setups, and market discussions.",
      url: "https://www.reddit.com/r/Daytrading/",
      members: "500K+ members", 
      focus: "Day Trading"
    },
    {
      title: "Elite Trader Forum",
      description: "Professional trading community with discussions on strategies, platforms, and market analysis.",
      url: "https://www.elitetrader.com",
      members: "100K+ members",
      focus: "Professional Trading"
    },
    {
      title: "TradingView Community",
      description: "Social trading platform where traders share ideas, analysis, and market insights.",
      url: "https://www.tradingview.com/community/",
      members: "50M+ users",
      focus: "Technical Analysis"
    }
  ]

  const riskManagement = [
    {
      title: "Position Sizing",
      description: "Never risk more than 1-2% of your account on a single trade. Calculate position size based on your stop loss.",
      icon: <Calculator className="w-5 h-5" />
    },
    {
      title: "Stop Losses",
      description: "Always use stop losses to limit downside risk. Set them before entering a trade, not after.",
      icon: <TrendingUp className="w-5 h-5" />
    },
    {
      title: "Risk/Reward Ratio",
      description: "Aim for at least 2:1 risk/reward ratio. If you risk $100, target at least $200 profit.",
      icon: <BarChart3 className="w-5 h-5" />
    },
    {
      title: "Daily Loss Limits",
      description: "Set a maximum daily loss limit. If hit, stop trading for the day to prevent emotional decisions.",
      icon: <Clock className="w-5 h-5" />
    }
  ]

  return (
    <>
      <Helmet>
        <title>Trading Resources - GrimmTrading Education & Tools</title>
        <meta name="description" content="Comprehensive trading resources including educational content, tools, books, and communities. Learn day trading strategies from top traders like Ross Cameron." />
        <meta name="keywords" content="day trading resources, trading education, stock trading tools, trading books, trading communities, momentum trading strategies" />
        <meta property="og:title" content="GrimmTrading Resources - Day Trading Education" />
        <meta property="og:description" content="Free trading resources, educational content, and tools to improve your day trading skills." />
        <link rel="canonical" href="https://grimmtrading.com/resources" />
      </Helmet>

      <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Trading Resources
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Curated collection of the best trading education, tools, and resources to help you 
              improve your day trading skills and develop profitable strategies.
            </p>
          </div>

          {/* Trading Education */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <Video className="w-8 h-8 text-primary" />
              <h2 className="text-3xl font-bold">Trading Education</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tradingEducation.map((resource, index) => (
                <Card key={index} className="border-border/50 hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        {resource.icon}
                        <CardTitle className="text-lg">{resource.title}</CardTitle>
                      </div>
                      <Badge variant="secondary">{resource.level}</Badge>
                    </div>
                    <CardDescription>{resource.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{resource.type}</span>
                      <a href={resource.url} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="sm">
                          Visit Channel
                          <ExternalLink className="ml-2 w-4 h-4" />
                        </Button>
                      </a>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Trading Tools */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <TrendingUp className="w-8 h-8 text-primary" />
              <h2 className="text-3xl font-bold">Trading Tools & Platforms</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tradingTools.map((tool, index) => (
                <Card key={index} className="border-border/50 hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      {tool.icon}
                      <CardTitle className="text-lg">{tool.title}</CardTitle>
                    </div>
                    <CardDescription>{tool.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="text-sm text-muted-foreground">{tool.type}</div>
                        <div className="font-medium">{tool.pricing}</div>
                      </div>
                      <a href={tool.url} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="sm">
                          Visit Site
                          <ExternalLink className="ml-2 w-4 h-4" />
                        </Button>
                      </a>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Risk Management */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <Lightbulb className="w-8 h-8 text-primary" />
              <h2 className="text-3xl font-bold">Risk Management Essentials</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {riskManagement.map((tip, index) => (
                <Card key={index} className="border-border/50">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      {tip.icon}
                      <CardTitle className="text-lg">{tip.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{tip.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Trading Books */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <BookOpen className="w-8 h-8 text-primary" />
              <h2 className="text-3xl font-bold">Recommended Reading</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tradingBooks.map((book, index) => (
                <Card key={index} className="border-border/50">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{book.title}</CardTitle>
                        <CardDescription>by {book.author}</CardDescription>
                      </div>
                      <Badge variant="secondary">{book.level}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{book.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {book.topics.map((topic, topicIndex) => (
                        <Badge key={topicIndex} variant="outline" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Market Data Sources */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <FileText className="w-8 h-8 text-primary" />
              <h2 className="text-3xl font-bold">Market Data & News</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {marketData.map((source, index) => (
                <Card key={index} className="border-border/50 hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <CardTitle className="text-lg">{source.title}</CardTitle>
                    <CardDescription>{source.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {source.features.map((feature, featureIndex) => (
                        <Badge key={featureIndex} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                    <a href={source.url} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm" className="w-full">
                        Visit Site
                        <ExternalLink className="ml-2 w-4 h-4" />
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Trading Communities */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <Users className="w-8 h-8 text-primary" />
              <h2 className="text-3xl font-bold">Trading Communities</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tradingCommunities.map((community, index) => (
                <Card key={index} className="border-border/50 hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <CardTitle className="text-lg">{community.title}</CardTitle>
                    <CardDescription>{community.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-muted-foreground">{community.members}</div>
                        <div className="font-medium">{community.focus}</div>
                      </div>
                      <a href={community.url} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="sm">
                          Join Community
                          <ExternalLink className="ml-2 w-4 h-4" />
                        </Button>
                      </a>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Disclaimer */}
          <Card className="border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-900/20">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <Lightbulb className="w-6 h-6 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                    Educational Resources Disclaimer
                  </h3>
                  <p className="text-yellow-700 dark:text-yellow-300 text-sm">
                    The resources listed above are for educational purposes only and do not constitute financial advice. 
                    Trading involves substantial risk of loss and is not suitable for all investors. 
                    Always do your own research and consider consulting with a qualified financial advisor before making trading decisions.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}

export default ResourcesPage

