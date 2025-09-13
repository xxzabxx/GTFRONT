import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  TrendingUp, 
  Users, 
  Shield, 
  Zap,
  Target,
  Award,
  Clock,
  BarChart3
} from 'lucide-react'
import { Helmet } from 'react-helmet-async'

const AboutPage = () => {
  const stats = [
    {
      icon: <TrendingUp className="w-6 h-6" />,
      value: "99.9%",
      label: "Uptime Guarantee",
      description: "Reliable platform you can count on"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      value: "<200ms",
      label: "Data Latency",
      description: "Lightning-fast market updates"
    },
    {
      icon: <Users className="w-6 h-6" />,
      value: "24/7",
      label: "Market Monitoring",
      description: "Pre-market to extended hours coverage"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      value: "Bank-Level",
      label: "Security",
      description: "Enterprise-grade data protection"
    }
  ]

  const values = [
    {
      icon: <Target className="w-8 h-8" />,
      title: "Precision Trading",
      description: "We believe successful day trading requires precise tools, accurate data, and proven strategies. Our platform delivers all three with institutional-grade technology."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Community First",
      description: "Trading can be isolating. We've built a platform that connects traders, shares knowledge, and creates a supportive environment for learning and growth."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Speed & Reliability",
      description: "In day trading, milliseconds matter. Our infrastructure is optimized for speed and built for reliability, ensuring you never miss an opportunity."
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Proven Strategies",
      description: "We implement time-tested momentum trading strategies used by successful traders worldwide, focusing on high-probability setups and risk management."
    }
  ]

  const features = [
    {
      title: "Advanced Stock Scanners",
      description: "Real-time momentum, gapper, and low float scanners using proven day trading criteria"
    },
    {
      title: "TradingView Integration",
      description: "Professional charting with real-time data, technical indicators, and multiple timeframes"
    },
    {
      title: "Market Hours Intelligence",
      description: "Smart detection of NYSE trading hours, holidays, and automatic data switching"
    },
    {
      title: "Trading Community",
      description: "Active chat rooms, idea sharing, and learning from experienced momentum traders"
    },
    {
      title: "Mobile & Desktop",
      description: "Full-featured platform accessible from any device, anywhere you trade"
    },
    {
      title: "Real-time Alerts",
      description: "Instant notifications for momentum breakouts, volume spikes, and news catalysts"
    }
  ]

  return (
    <>
      <Helmet>
        <title>About GrimmTrading - Professional Day Trading Platform</title>
        <meta name="description" content="Learn about GrimmTrading's mission to provide professional day trading tools, momentum scanners, and TradingView charts for serious traders. Built by traders, for traders." />
        <meta name="keywords" content="about grimmtrading, day trading company, momentum trading platform, trading software company, professional trading tools" />
        <meta property="og:title" content="About GrimmTrading - Professional Day Trading Platform" />
        <meta property="og:description" content="Professional day trading platform built by traders, for traders. Advanced scanners, real-time charts, and proven strategies." />
        <link rel="canonical" href="https://grimmtrading.com/about" />
      </Helmet>

      <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Built by Traders, for Traders
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              GrimmTrading was created to solve the real challenges that day traders face every day: 
              finding high-probability setups quickly, accessing reliable data, and having the right tools 
              to execute profitable trades consistently.
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center border-border/50">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mx-auto mb-4">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="font-medium mb-1">{stat.label}</div>
                  <div className="text-sm text-muted-foreground">{stat.description}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Mission Section */}
          <div className="mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  To democratize professional-grade day trading tools and make momentum trading strategies 
                  accessible to traders at every level. We believe that with the right tools, education, 
                  and community support, any dedicated trader can improve their results.
                </p>
                <p className="text-lg text-muted-foreground mb-6">
                  Our platform combines cutting-edge technology with proven trading methodologies, 
                  delivering the speed, accuracy, and reliability that serious day traders demand.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Momentum Trading</Badge>
                  <Badge variant="secondary">Real-time Data</Badge>
                  <Badge variant="secondary">Professional Tools</Badge>
                  <Badge variant="secondary">Trading Community</Badge>
                </div>
              </div>
              <div>
                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-primary" />
                      Platform Highlights
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {features.map((feature, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                          <div>
                            <div className="font-medium">{feature.title}</div>
                            <div className="text-sm text-muted-foreground">{feature.description}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Core Values</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                These principles guide everything we build and every decision we make as a company.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="border-border/50">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
                      {value.icon}
                    </div>
                    <CardTitle className="text-xl">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {value.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Technology Section */}
          <div className="mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-primary" />
                      Technology Stack
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="font-medium mb-1">Frontend</div>
                        <div className="text-sm text-muted-foreground">React, TradingView Lightweight Charts, Real-time WebSocket connections</div>
                      </div>
                      <div>
                        <div className="font-medium mb-1">Backend</div>
                        <div className="text-sm text-muted-foreground">Python Flask, PostgreSQL, Redis caching, RESTful APIs</div>
                      </div>
                      <div>
                        <div className="font-medium mb-1">Data Sources</div>
                        <div className="text-sm text-muted-foreground">Finnhub API, Real-time market data, News integration</div>
                      </div>
                      <div>
                        <div className="font-medium mb-1">Infrastructure</div>
                        <div className="text-sm text-muted-foreground">Cloud hosting, CDN delivery, 99.9% uptime SLA</div>
                      </div>
                      <div>
                        <div className="font-medium mb-1">Security</div>
                        <div className="text-sm text-muted-foreground">JWT authentication, SSL encryption, SOC 2 compliance</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Built for Performance</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Our platform is engineered from the ground up for speed and reliability. 
                  We use modern cloud infrastructure, intelligent caching, and optimized data pipelines 
                  to ensure you get the fastest, most accurate market data available.
                </p>
                <p className="text-lg text-muted-foreground mb-6">
                  Every component is designed with the day trader in mind - from sub-200ms data latency 
                  to smart market hours detection that prevents unnecessary API calls during closed markets.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Real-time WebSocket connections for instant updates</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Intelligent caching reduces API calls by 95%</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Auto-scaling infrastructure handles peak trading hours</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Global CDN ensures fast loading worldwide</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Trading Methodology Section */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Proven Trading Strategies</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Our scanners implement momentum trading methodologies used by successful traders worldwide.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg">Momentum Trading</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Focus on stocks showing strong price momentum with high relative volume. 
                    Target breakouts above key resistance levels with proper risk management.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div>• Price range: $2-$20</div>
                    <div>• Volume: 2x+ average</div>
                    <div>• Float: Under 10M shares</div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg">Gap Trading</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Identify pre-market gaps of 5%+ with news catalysts. 
                    Trade the continuation or reversal patterns based on volume and price action.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div>• Gap size: 5%+ minimum</div>
                    <div>• News catalyst required</div>
                    <div>• Pre-market volume confirmation</div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg">Low Float Strategy</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Target stocks with low share counts for maximum volatility. 
                    These stocks can move quickly on relatively small volume increases.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div>• Float: Under 5M shares</div>
                    <div>• High short interest preferred</div>
                    <div>• Catalyst-driven moves</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="text-center">
            <Card className="max-w-2xl mx-auto border-primary/20 bg-primary/5">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">Questions About Our Platform?</h3>
                <p className="text-muted-foreground mb-6">
                  We're here to help you succeed in your trading journey. 
                  Reach out to our team for support, feature requests, or general questions.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a href="/contact" className="inline-block">
                    <button className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2 rounded-md font-medium">
                      Contact Us
                    </button>
                  </a>
                  <a href="/pricing" className="inline-block">
                    <button className="border border-border hover:bg-muted px-6 py-2 rounded-md font-medium">
                      View Pricing
                    </button>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}

export default AboutPage

