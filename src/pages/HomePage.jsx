import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  TrendingUp, 
  BarChart3, 
  Zap, 
  Shield, 
  Users, 
  Clock,
  ArrowRight,
  CheckCircle
} from 'lucide-react'

const HomePage = () => {
  const features = [
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Real-Time Scanners",
      description: "Advanced stock scanners with Ross Cameron's proven criteria. Find momentum plays, pre-market gappers, and low float opportunities."
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Professional Charts",
      description: "TradingView integration with real-time data, technical indicators, and multiple timeframes for precise entry and exit points."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Lightning Fast",
      description: "Sub-second data updates and optimized for day trading speed. Never miss a momentum breakout again."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Trading Community",
      description: "Connect with fellow momentum traders, share ideas, and learn from experienced day traders in real-time chat."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure & Reliable",
      description: "Bank-level security with 99.9% uptime. Your trading data and strategies are always protected."
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Pre-Market Ready",
      description: "Start scanning before market open. Identify gap-ups and news catalysts for the best trading opportunities."
    }
  ]

  const benefits = [
    "Price range: $2-$20 stocks",
    "Float under 10M shares",
    "High relative volume alerts",
    "Pre-market gapper detection",
    "News catalyst integration",
    "Real-time momentum alerts"
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background via-background to-muted/20">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Professional Day Trading
            <span className="block text-primary">Made Simple</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Master momentum trading with our advanced scanners, real-time charts, and proven strategies. 
            Built for serious day traders who demand speed, accuracy, and results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="w-full sm:w-auto">
                Start Trading Today
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Login to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to Trade Like a Pro
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our platform combines cutting-edge technology with proven trading strategies 
              to give you the edge in today's fast-moving markets.
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

      {/* Ross Cameron Methodology Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Built on Proven Trading Strategies
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Our scanners are designed around Ross Cameron's momentum trading methodology, 
                focusing on the setups that consistently produce winning trades.
              </p>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    <span>Live Scanner Results</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                      <div>
                        <span className="font-semibold">DEMO1</span>
                        <div className="text-sm text-muted-foreground">Float: 8.5M</div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">$15.75</div>
                        <div className="text-sm trading-green">+17.12%</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                      <div>
                        <span className="font-semibold">DEMO2</span>
                        <div className="text-sm text-muted-foreground">Float: 6.2M</div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">$8.45</div>
                        <div className="text-sm trading-green">+16.55%</div>
                      </div>
                    </div>
                    <div className="text-center pt-4">
                      <Link to="/register">
                        <Button className="w-full">
                          See Live Results
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

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Trading?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of traders who have improved their results with our platform. 
            Start your journey to consistent profitability today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="w-full sm:w-auto">
                Get Started Free
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage

