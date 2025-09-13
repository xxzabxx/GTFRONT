import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  CheckCircle, 
  X, 
  ArrowRight,
  DollarSign,
  Zap,
  Crown,
  Star
} from 'lucide-react'
import { Helmet } from 'react-helmet-async'

const PricingPage = () => {
  const pricingPlans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
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
      cta: "Start Free",
      ctaLink: "/register",
      popular: false,
      icon: <Zap className="w-6 h-6" />
    },
    {
      name: "Basic",
      price: "$29",
      period: "month",
      description: "Essential tools for active day traders",
      features: [
        "Unlimited momentum scanner",
        "Gappers scanner",
        "Advanced TradingView charts",
        "Pre-market scanning (4 AM ET)",
        "Priority email support",
        "Trading community access",
        "Market news integration"
      ],
      limitations: [
        "No low float scanner",
        "No real-time alerts",
        "No mobile app"
      ],
      cta: "Start 7-Day Trial",
      ctaLink: "/register?plan=basic",
      popular: true,
      icon: <Star className="w-6 h-6" />
    },
    {
      name: "Pro",
      price: "$59",
      period: "month",
      description: "Advanced features for serious traders",
      features: [
        "All Basic features",
        "Low float scanner",
        "Real-time push alerts",
        "Mobile app access",
        "Extended hours scanning",
        "Custom watchlists",
        "Advanced filtering",
        "Priority chat support"
      ],
      limitations: [
        "No custom scanners",
        "No API access"
      ],
      cta: "Start 7-Day Trial",
      ctaLink: "/register?plan=pro",
      popular: false,
      icon: <Crown className="w-6 h-6" />
    },
    {
      name: "Premium",
      price: "$99",
      period: "month",
      description: "Complete trading solution with personal coaching",
      features: [
        "All Pro features",
        "Custom scanner creation",
        "API access for automation",
        "1-on-1 monthly coaching call",
        "Advanced analytics dashboard",
        "White-label options",
        "Phone support",
        "Early access to new features"
      ],
      limitations: [],
      cta: "Start 7-Day Trial",
      ctaLink: "/register?plan=premium",
      popular: false,
      icon: <Crown className="w-6 h-6" />
    }
  ]

  const faqs = [
    {
      question: "Can I change plans anytime?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any billing differences."
    },
    {
      question: "Is there a free trial?",
      answer: "Yes! All paid plans include a 7-day free trial. No credit card required to start, and you can cancel anytime during the trial period."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, MasterCard, American Express) and PayPal. All payments are processed securely through Stripe."
    },
    {
      question: "Can I cancel my subscription?",
      answer: "Absolutely. You can cancel your subscription at any time from your account settings. You'll continue to have access until the end of your billing period."
    },
    {
      question: "Do you offer annual billing discounts?",
      answer: "Yes! Save 17% when you choose annual billing. That's like getting 2 months free on any paid plan."
    },
    {
      question: "Is my data secure?",
      answer: "Yes, we use bank-level encryption and security measures. Your trading data is never shared with third parties and is protected by industry-standard security protocols."
    }
  ]

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
            {pricingPlans.map((plan, index) => (
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
                    {plan.price}
                    <span className="text-sm font-normal text-muted-foreground">/{plan.period}</span>
                  </div>
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
                  <Link to={plan.ctaLink} className="w-full">
                    <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
                      {plan.cta}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
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

