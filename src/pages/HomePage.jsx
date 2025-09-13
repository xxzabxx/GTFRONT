import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  TrendingUp, 
  BarChart3, 
  Zap, 
  Shield, 
  Users, 
  Clock,
  ArrowRight,
  CheckCircle,
  Star,
  ExternalLink,
  DollarSign,
  Target,
  Activity
} from 'lucide-react'
import { Helmet } from 'react-helmet-async'

const HomePage = () => {
  const features = [
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Real-Time Stock Scanners",
      description: "Advanced momentum scanners using proven day trading criteria. Find high-probability setups with pre-market gappers, low float opportunities, and volume breakouts."
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Professional TradingView Charts",
      description: "Integrated TradingView charts with real-time market data, technical indicators, and multiple timeframes for precise entry and exit timing."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Lightning Fast Performance",
      description: "Sub-second data updates optimized for day trading speed. Smart market hours detection ensures you never miss momentum breakouts during trading sessions."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Active Trading Community",
      description: "Connect with momentum traders, share market insights, and learn from experienced day traders in our real-time trading room."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Enterprise Security",
      description: "Bank-level security with 99.9% uptime guarantee. Your trading data and strategies are protected with industry-standard encryption."
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Pre-Market & Extended Hours",
      description: "Start scanning at 4:00 AM ET before market open. Identify gap-ups, news catalysts, and early momentum for the best trading opportunities."
    }
  ]

  const tradingCriteria = [
    "Price range: $2-$20 small cap stocks",
    "Float under 10M shares for volatility",
    "High relative volume alerts (2x+ average)",
    "Pre-market gapper detection (5%+ gaps)",
    "News catalyst integration and alerts",
    "Real-time momentum breakout signals"
  ]

  const notableTraders = [
    {
      name: "Ross Cameron",
      channel: "Warrior Trading",
      url: "https://www.youtube.com/@WarriorTrading"
    },
    {
      name: "Timothy Sykes",
      channel: "Timothy Sykes",
      url: "https://www.youtube.com/@TimothySykes"
    },
    {
      name: "Steven Dux",
      channel: "Steven Dux",
      url: "https://www.youtube.com/@StevenDux"
    }
  ]

  const pricingTiers = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      features: ["Momentum scanner (5 results)", "Basic charts", "Community access"],
      cta: "Start Free",
      popular: false
    },
    {
      name: "Basic",
      price: "$29",
      period: "month",
      features: ["Unlimited momentum scanner", "Gappers scanner", "Advanced charts", "Priority support"],
      cta: "Start 7-Day Trial",
      popular: true
    },
    {
      name: "Pro",
      price: "$59",
      period: "month",
      features: ["All Basic features", "Low float scanner", "Real-time alerts", "Mobile app access"],
      cta: "Start 7-Day Trial",
      popular: false
    },
    {
      name: "Premium",
      price: "$99",
      period: "month",
      features: ["All Pro features", "Custom scanners", "API access", "1-on-1 coaching"],
      cta: "Start 7-Day Trial",
      popular: false
    }
  ]

  return (
    <>
      <Helmet>
        <title>GrimmTrading - Professional Day Trading Platform | Stock Scanner & Charts</title>
        <meta name="description" content="Professional day trading platform with real-time stock scanners, TradingView charts, and momentum trading strategies. Find pre-market gappers, low float stocks, and high-volume breakouts. Start your 7-day free trial today." />
        <meta name="keywords" content="day trading platform, stock scanner, momentum trading, pre market scanner, day trading software, real time stock alerts, TradingView charts, low float stocks, trading platform, stock screener" />
        <meta property="og:title" content="GrimmTrading - Professional Day Trading Platform" />
        <meta property="og:description" content="Master momentum trading with advanced stock scanners and real-time charts. Join thousands of traders using proven strategies." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://grimmtrading.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="GrimmTrading - Professional Day Trading Platform" />
        <meta name="twitter:description" content="Advanced stock scanners and TradingView charts for momentum day trading. 7-day free trial available." />
        <link rel="canonical" href="https://grimmtrading.com" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "GrimmTrading",
            "description": "Professional day trading platform with real-time stock scanners and TradingView charts",
            "url": "https://grimmtrading.com",
            "applicationCategory": "FinanceApplication",
            "operatingSystem": "Web Browser",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD",
              "description": "Free tier available with premium plans starting at $29/month"
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background via-background to-muted/20">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Professional Day Trading Platform
              <span className="block text-primary">Built for Momentum Traders</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Master momentum trading with advanced stock scanners, real-time TradingView charts, and proven strategies used by thousands of successful day traders. 
              Find pre-market gappers, low float opportunities, and high-volume breakouts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link to="/register">
                <Button size="lg" className="w-full sm:w-auto">
                  Start 7-Day Free Trial
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Login to Dashboard
                </Button>
              </Link>
            </div>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-primary" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-primary" />
                <span>Cancel anytime</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-primary" />
                <span>99.9% uptime guarantee</span>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Everything You Need for Day Trading Success
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Our platform combines cutting-edge technology with proven momentum trading strategies 
                to give you the competitive edge in today's fast-moving markets.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="border-border/50 hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Preview Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Choose Your Trading Plan
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Start free and upgrade as your trading grows. All plans include our core momentum scanning technology.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {pricingTiers.map((tier, index) => (
                <Card key={index} className={`relative ${tier.popular ? 'border-primary shadow-lg scale-105' : 'border-border/50'}`}>
                  {tier.popular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary">
                      Most Popular
                    </Badge>
                  )}
                  <CardHeader className="text-center">
                    <CardTitle className="text-lg">{tier.name}</CardTitle>
                    <div className="text-3xl font-bold">
                      {tier.price}
                      <span className="text-sm font-normal text-muted-foreground">/{tier.period}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-6">
                      {tier.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link to="/register" className="w-full">
                      <Button className="w-full" variant={tier.popular ? "default" : "outline"}>
                        {tier.cta}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <Link to="/pricing">
                <Button variant="outline" size="lg">
                  View Full Pricing Details
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Trading Methodology Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Proven Momentum Trading Strategies
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Our scanners implement momentum trading methodologies used by successful day traders worldwide. 
                  These strategies focus on high-probability setups that consistently produce profitable trades.
                </p>
                
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4">Learn from Top Traders:</h3>
                  <div className="space-y-3">
                    {notableTraders.map((trader, index) => (
                      <a 
                        key={index}
                        href={trader.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 rounded-lg border border-border/50 hover:border-primary/50 transition-colors group"
                      >
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <Star className="w-4 h-4 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{trader.name}</div>
                          <div className="text-sm text-muted-foreground">{trader.channel}</div>
                        </div>
                        <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </a>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Key Trading Criteria:</h3>
                  {tradingCriteria.map((criteria, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-foreground">{criteria}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="relative">
                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Activity className="w-5 h-5 text-primary" />
                      <span>Live Scanner Results</span>
                    </CardTitle>
                    <CardDescription>
                      Real-time momentum opportunities (Demo data)
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                        <div>
                          <span className="font-semibold">DEMO1</span>
                          <div className="text-sm text-muted-foreground">Float: 8.5M • Vol: 2.3x</div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">$15.75</div>
                          <div className="text-sm text-green-500">+17.12%</div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                        <div>
                          <span className="font-semibold">DEMO2</span>
                          <div className="text-sm text-muted-foreground">Float: 6.2M • Vol: 3.1x</div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">$8.45</div>
                          <div className="text-sm text-green-500">+16.55%</div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                        <div>
                          <span className="font-semibold">DEMO3</span>
                          <div className="text-sm text-muted-foreground">Float: 4.1M • Vol: 4.2x</div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">$12.33</div>
                          <div className="text-sm text-green-500">+22.87%</div>
                        </div>
                      </div>
                      <div className="text-center pt-4">
                        <Link to="/register">
                          <Button className="w-full">
                            See Live Results
                            <TrendingUp className="ml-2 w-4 h-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/20">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Trusted by Momentum Traders Worldwide
            </h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              Thousands of traders use these proven momentum strategies every day to identify high-probability trading opportunities.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">99.9%</div>
                <div className="text-lg font-medium mb-1">Uptime Guarantee</div>
                <div className="text-muted-foreground">Never miss a trading opportunity</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">&lt;200ms</div>
                <div className="text-lg font-medium mb-1">Data Latency</div>
                <div className="text-muted-foreground">Lightning-fast market updates</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">24/7</div>
                <div className="text-lg font-medium mb-1">Market Monitoring</div>
                <div className="text-muted-foreground">Pre-market to extended hours</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Day Trading?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join the growing community of momentum traders who rely on our platform for consistent market opportunities. 
              Start your 7-day free trial today - no credit card required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" className="w-full sm:w-auto">
                  Start Free Trial
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link to="/pricing">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  View Pricing
                  <DollarSign className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default HomePage

