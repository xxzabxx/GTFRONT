import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { 
  CheckCircle, 
  X, 
  ArrowRight,
  DollarSign,
  Zap,
  Crown,
  Star,
  Loader2
} from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { useAuth } from '@/contexts/AuthContext'
import { paymentService } from '@/services/paymentService'
import { toast } from 'sonner'

const PricingPage = () => {
  const { user } = useAuth()
  const [isAnnual, setIsAnnual] = useState(false)
  const [pricing, setPricing] = useState(null)
  const [loading, setLoading] = useState(true)
  const [processingPlan, setProcessingPlan] = useState(null)

  // Load pricing from backend
  useEffect(() => {
    const loadPricing = async () => {
      try {
        const pricingData = await paymentService.getPricing()
        setPricing(pricingData)
      } catch (error) {
        console.error('Failed to load pricing:', error)
        toast.error('Failed to load pricing information')
      } finally {
        setLoading(false)
      }
    }

    loadPricing()
  }, [])

  // Handle subscription purchase
  const handleSubscribe = async (tier, billingInterval) => {
    if (!user) {
      toast.error('Please log in to subscribe')
      return
    }

    setProcessingPlan(`${tier}-${billingInterval}`)
    
    try {
      const successUrl = `${window.location.origin}/subscription/success`
      const cancelUrl = `${window.location.origin}/pricing`
      
      const { checkout_url } = await paymentService.createCheckoutSession(
        tier,
        billingInterval,
        successUrl,
        cancelUrl
      )
      
      // Redirect to Stripe checkout
      window.location.href = checkout_url
    } catch (error) {
      console.error('Failed to create checkout session:', error)
      toast.error(error.message || 'Failed to start checkout process')
      setProcessingPlan(null)
    }
  }

  // Get price for display
  const getPrice = (tier, billingInterval) => {
    if (!pricing || !pricing[tier] || !pricing[tier][billingInterval]) {
      return { amount: 0, price_id: null }
    }
    return pricing[tier][billingInterval]
  }

  // Calculate savings for annual billing
  const calculateSavings = (tier) => {
    if (!pricing || !pricing[tier]) return 0
    
    const monthly = pricing[tier].monthly?.amount || 0
    const yearly = pricing[tier].yearly?.amount || 0
    
    if (monthly === 0 || yearly === 0) return 0
    
    const monthlyAnnual = monthly * 12
    const savings = ((monthlyAnnual - yearly) / monthlyAnnual) * 100
    return Math.round(savings)
  }

  const pricingPlans = [
    {
      id: "free",
      name: "Free",
      description: "Perfect for getting started with momentum trading",
      features: [
        "Momentum scanner (5 results)",
        "Basic TradingView charts",
        "Community access",
        "Market hours detection",
        "Email support"
      ],
      limitations: [
        "Limited scanner results",
        "No real-time alerts",
        "No mobile app",
        "Basic support only"
      ],
      popular: false,
      icon: <Zap className="w-6 h-6" />
    },
    {
      id: "basic",
      name: "Basic",
      description: "Essential tools for active day traders",
      features: [
        "Unlimited momentum scanner",
        "Gappers scanner",
        "Advanced TradingView charts",
        "Pre-market scanning (4 AM ET)",
        "Real-time alerts",
        "Mobile app access",
        "Priority email support",
        "Trading room chat"
      ],
      limitations: [
        "No low float scanner",
        "No API access",
        "No custom indicators"
      ],
      popular: true,
      icon: <Star className="w-6 h-6" />
    },
    {
      id: "pro",
      name: "Pro",
      description: "Advanced features for professional traders",
      features: [
        "Everything in Basic",
        "Low float scanner",
        "Advanced filtering options",
        "Custom watchlists",
        "API access (limited)",
        "Custom indicators",
        "Advanced alerts",
        "Phone support"
      ],
      limitations: [
        "Limited API calls",
        "No white-label options"
      ],
      popular: false,
      icon: <Crown className="w-6 h-6" />
    },
    {
      id: "premium",
      name: "Premium",
      description: "Complete trading suite for institutions",
      features: [
        "Everything in Pro",
        "Unlimited API access",
        "White-label options",
        "Custom integrations",
        "Dedicated account manager",
        "24/7 phone support",
        "Custom training sessions",
        "Priority feature requests"
      ],
      limitations: [],
      popular: false,
      icon: <Crown className="w-6 h-6" />
    }
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Loading pricing...</span>
        </div>
      </div>
    )
  }
  return (
    <>
      <Helmet>
        <title>Pricing Plans - GrimmTrading | Day Trading Platform Subscription</title>
        <meta name="description" content="Choose the perfect day trading plan for your needs. Start with our free momentum scanner or upgrade to Pro for advanced features. 7-day free trial on all paid plans." />
        <meta name="keywords" content="day trading pricing, stock scanner subscription, trading platform cost, momentum trading plans, day trading software pricing" />
        <meta property="og:title" content="GrimmTrading Pricing - Professional Day Trading Plans" />
        <meta property="og:description" content="Flexible pricing plans for day traders. Free tier available, premium plans start at $29/month with 7-day free trial." />
        <link rel="canonical" href="https://grimmtrading.com/pricing" />
      </Helmet>

      <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Choose Your Trading Plan
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Start free and scale as your trading grows. All plans include our core momentum scanning technology 
              with proven day trading strategies.
            </p>
            
            {/* Billing Cycle Toggle */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <Label htmlFor="billing-toggle" className={`text-sm ${!isAnnual ? 'font-semibold' : ''}`}>
                Monthly
              </Label>
              <Switch
                id="billing-toggle"
                checked={isAnnual}
                onCheckedChange={setIsAnnual}
              />
              <Label htmlFor="billing-toggle" className={`text-sm ${isAnnual ? 'font-semibold' : ''}`}>
                Annual
                <Badge variant="secondary" className="ml-2">Save 20%</Badge>
              </Label>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-primary" />
                <span>7-day free trial on paid plans</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-primary" />
                <span>No setup fees</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-primary" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {pricingPlans.map((plan, index) => {
              const billingInterval = isAnnual ? 'yearly' : 'monthly'
              const priceData = getPrice(plan.id, billingInterval)
              const isProcessing = processingPlan === `${plan.id}-${billingInterval}`
              const savings = isAnnual ? calculateSavings(plan.id) : 0
              
              return (
                <Card key={index} className={`relative ${plan.popular ? 'border-primary shadow-lg scale-105' : 'border-border/50'}`}>
                  {plan.popular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary">
                      Most Popular
                    </Badge>
                  )}
                  <CardHeader className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mx-auto mb-4">
                      {plan.icon}
                    </div>
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                    <div className="text-3xl font-bold">
                      {plan.id === 'free' ? (
                        <>
                          $0
                          <span className="text-sm font-normal text-muted-foreground">/forever</span>
                        </>
                      ) : (
                        <>
                          ${priceData.amount}
                          <span className="text-sm font-normal text-muted-foreground">
                            /{isAnnual ? 'year' : 'month'}
                          </span>
                        </>
                      )}
                    </div>
                    {isAnnual && savings > 0 && plan.id !== 'free' && (
                      <div className="text-sm text-green-600 font-medium">
                        Save {savings}% annually
                      </div>
                    )}
                    <CardDescription className="text-sm">
                      {plan.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 mb-6">
                      <div>
                        <h4 className="font-medium text-sm mb-2">Included:</h4>
                        <ul className="space-y-2">
                          {plan.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-center gap-2 text-sm">
                              <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      {plan.limitations.length > 0 && (
                        <div>
                          <h4 className="font-medium text-sm mb-2 text-muted-foreground">Not included:</h4>
                          <ul className="space-y-2">
                            {plan.limitations.map((limitation, limitIndex) => (
                              <li key={limitIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                                <X className="w-4 h-4 flex-shrink-0" />
                                <span>{limitation}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                    
                    {plan.id === 'free' ? (
                      <Link to="/register" className="w-full">
                        <Button className="w-full" variant="outline">
                          Start Free
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                      </Link>
                    ) : (
                      <Button 
                        className="w-full" 
                        variant={plan.popular ? "default" : "outline"}
                        onClick={() => handleSubscribe(plan.id, billingInterval)}
                        disabled={isProcessing}
                      >
                        {isProcessing ? (
                          <>
                            <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            Start 7-Day Trial
                            <ArrowRight className="ml-2 w-4 h-4" />
                          </>
                        )}
                      </Button>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Annual Billing Discount */}
          <div className="text-center mb-16">
            <Card className="max-w-2xl mx-auto border-primary/20 bg-primary/5">
              <CardContent className="p-8">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <DollarSign className="w-6 h-6 text-primary" />
                  <h3 className="text-xl font-bold">Save 17% with Annual Billing</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Choose annual billing and get 2 months free on any paid plan. 
                  Perfect for committed traders looking to maximize their savings.
                </p>
                <div className="flex flex-wrap justify-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    <span>Basic: $29/month → $24/month annually</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    <span>Pro: $59/month → $49/month annually</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Feature Comparison */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Feature Comparison</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 font-medium">Feature</th>
                    <th className="text-center p-4 font-medium">Free</th>
                    <th className="text-center p-4 font-medium">Basic</th>
                    <th className="text-center p-4 font-medium">Pro</th>
                    <th className="text-center p-4 font-medium">Premium</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/50">
                    <td className="p-4">Momentum Scanner Results</td>
                    <td className="text-center p-4">5 results</td>
                    <td className="text-center p-4">Unlimited</td>
                    <td className="text-center p-4">Unlimited</td>
                    <td className="text-center p-4">Unlimited</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="p-4">TradingView Charts</td>
                    <td className="text-center p-4"><CheckCircle className="w-4 h-4 text-primary mx-auto" /></td>
                    <td className="text-center p-4"><CheckCircle className="w-4 h-4 text-primary mx-auto" /></td>
                    <td className="text-center p-4"><CheckCircle className="w-4 h-4 text-primary mx-auto" /></td>
                    <td className="text-center p-4"><CheckCircle className="w-4 h-4 text-primary mx-auto" /></td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="p-4">Gappers Scanner</td>
                    <td className="text-center p-4"><X className="w-4 h-4 text-muted-foreground mx-auto" /></td>
                    <td className="text-center p-4"><CheckCircle className="w-4 h-4 text-primary mx-auto" /></td>
                    <td className="text-center p-4"><CheckCircle className="w-4 h-4 text-primary mx-auto" /></td>
                    <td className="text-center p-4"><CheckCircle className="w-4 h-4 text-primary mx-auto" /></td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="p-4">Low Float Scanner</td>
                    <td className="text-center p-4"><X className="w-4 h-4 text-muted-foreground mx-auto" /></td>
                    <td className="text-center p-4"><X className="w-4 h-4 text-muted-foreground mx-auto" /></td>
                    <td className="text-center p-4"><CheckCircle className="w-4 h-4 text-primary mx-auto" /></td>
                    <td className="text-center p-4"><CheckCircle className="w-4 h-4 text-primary mx-auto" /></td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="p-4">Real-time Alerts</td>
                    <td className="text-center p-4"><X className="w-4 h-4 text-muted-foreground mx-auto" /></td>
                    <td className="text-center p-4"><X className="w-4 h-4 text-muted-foreground mx-auto" /></td>
                    <td className="text-center p-4"><CheckCircle className="w-4 h-4 text-primary mx-auto" /></td>
                    <td className="text-center p-4"><CheckCircle className="w-4 h-4 text-primary mx-auto" /></td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="p-4">Mobile App</td>
                    <td className="text-center p-4"><X className="w-4 h-4 text-muted-foreground mx-auto" /></td>
                    <td className="text-center p-4"><X className="w-4 h-4 text-muted-foreground mx-auto" /></td>
                    <td className="text-center p-4"><CheckCircle className="w-4 h-4 text-primary mx-auto" /></td>
                    <td className="text-center p-4"><CheckCircle className="w-4 h-4 text-primary mx-auto" /></td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="p-4">API Access</td>
                    <td className="text-center p-4"><X className="w-4 h-4 text-muted-foreground mx-auto" /></td>
                    <td className="text-center p-4"><X className="w-4 h-4 text-muted-foreground mx-auto" /></td>
                    <td className="text-center p-4"><X className="w-4 h-4 text-muted-foreground mx-auto" /></td>
                    <td className="text-center p-4"><CheckCircle className="w-4 h-4 text-primary mx-auto" /></td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="p-4">1-on-1 Coaching</td>
                    <td className="text-center p-4"><X className="w-4 h-4 text-muted-foreground mx-auto" /></td>
                    <td className="text-center p-4"><X className="w-4 h-4 text-muted-foreground mx-auto" /></td>
                    <td className="text-center p-4"><X className="w-4 h-4 text-muted-foreground mx-auto" /></td>
                    <td className="text-center p-4"><CheckCircle className="w-4 h-4 text-primary mx-auto" /></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {faqs.map((faq, index) => (
                <Card key={index} className="border-border/50">
                  <CardHeader>
                    <CardTitle className="text-lg">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <Card className="max-w-2xl mx-auto border-primary/20 bg-primary/5">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">Ready to Start Trading?</h3>
                <p className="text-muted-foreground mb-6">
                  Join thousands of traders who trust our platform for their daily momentum trading. 
                  Start with our free plan or try any paid plan risk-free for 7 days.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/register">
                    <Button size="lg" className="w-full sm:w-auto">
                      Start Free Trial
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                  <Link to="/contact">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto">
                      Contact Sales
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}

export default PricingPage

