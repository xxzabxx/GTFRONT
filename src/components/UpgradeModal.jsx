import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Crown, Star, Zap, Check, X, TrendingUp, BarChart3, Activity } from 'lucide-react'
import TierBadge from './TierBadge'

const UpgradeModal = ({ isOpen, onClose, currentTier = 'free', feature = 'scanner' }) => {
  const tierPlans = [
    {
      name: 'basic',
      label: 'Basic',
      icon: Star,
      price: '$29',
      period: '/month',
      description: 'Perfect for getting started with day trading',
      features: [
        'Momentum Scanner',
        'Basic Market Data',
        'Email Alerts',
        'Community Access',
        'Mobile App'
      ],
      limitations: [
        'Limited to 50 scans/day',
        'Basic indicators only'
      ],
      popular: false
    },
    {
      name: 'pro',
      label: 'Pro',
      icon: Zap,
      price: '$79',
      period: '/month',
      description: 'Advanced tools for serious day traders',
      features: [
        'All Basic Features',
        'Gappers Scanner',
        'Low Float Scanner',
        'Real-time Level 2 Data',
        'Advanced Indicators',
        'Custom Alerts',
        'Priority Support'
      ],
      limitations: [],
      popular: true
    },
    {
      name: 'premium',
      label: 'Premium',
      icon: Crown,
      price: '$149',
      period: '/month',
      description: 'Complete trading suite for professionals',
      features: [
        'All Pro Features',
        'Unlimited Scans',
        'AI-Powered Insights',
        'Custom Scanners',
        'Advanced Analytics',
        'Direct Market Access',
        'Personal Trading Coach',
        'API Access'
      ],
      limitations: [],
      popular: false
    }
  ]

  const getFeatureDescription = (feature) => {
    switch (feature) {
      case 'gappers':
        return {
          title: 'Gappers Scanner',
          description: 'Identify stocks with significant overnight gaps for momentum trading opportunities.',
          icon: TrendingUp
        }
      case 'low_float':
        return {
          title: 'Low Float Scanner',
          description: 'Find low float stocks with high volatility potential for explosive moves.',
          icon: BarChart3
        }
      case 'momentum':
        return {
          title: 'Advanced Momentum Scanner',
          description: 'Enhanced momentum scanning with real-time data and advanced filters.',
          icon: Activity
        }
      default:
        return {
          title: 'Premium Scanner',
          description: 'Access advanced scanning tools for professional day trading.',
          icon: TrendingUp
        }
    }
  }

  const featureInfo = getFeatureDescription(feature)
  const FeatureIcon = featureInfo.icon

  const handleUpgrade = (tierName) => {
    // TODO: Integrate with Stripe or payment processor
    console.log(`Upgrading to ${tierName}`)
    // For now, just close the modal
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <FeatureIcon className="w-6 h-6 text-primary" />
            Upgrade Required: {featureInfo.title}
          </DialogTitle>
          <DialogDescription className="text-base">
            {featureInfo.description}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6">
          <div className="text-center mb-8">
            <h3 className="text-lg font-semibold mb-2">Choose Your Trading Plan</h3>
            <p className="text-muted-foreground">
              Unlock powerful scanning tools used by professional day traders
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {tierPlans.map((plan) => {
              const Icon = plan.icon
              const isCurrentTier = currentTier === plan.name
              const isUpgrade = tierPlans.findIndex(t => t.name === currentTier) < tierPlans.findIndex(t => t.name === plan.name)

              return (
                <div
                  key={plan.name}
                  className={`relative p-6 rounded-lg border-2 transition-all ${
                    plan.popular
                      ? 'border-primary bg-primary/5 scale-105'
                      : isCurrentTier
                      ? 'border-green-500 bg-green-500/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  {plan.popular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary">
                      Most Popular
                    </Badge>
                  )}
                  
                  {isCurrentTier && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-green-500">
                      Current Plan
                    </Badge>
                  )}

                  <div className="text-center mb-4">
                    <Icon className="w-8 h-8 mx-auto mb-2 text-primary" />
                    <h4 className="text-lg font-semibold">{plan.label}</h4>
                    <div className="flex items-baseline justify-center gap-1 mt-2">
                      <span className="text-3xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground">{plan.period}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
                  </div>

                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                    {plan.limitations.map((limitation, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <X className="w-4 h-4 text-red-500 flex-shrink-0" />
                        <span>{limitation}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className="w-full"
                    variant={plan.popular ? 'default' : 'outline'}
                    disabled={isCurrentTier}
                    onClick={() => handleUpgrade(plan.name)}
                  >
                    {isCurrentTier ? 'Current Plan' : isUpgrade ? `Upgrade to ${plan.label}` : `Downgrade to ${plan.label}`}
                  </Button>
                </div>
              )
            })}
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground mb-4">
              All plans include 7-day free trial • Cancel anytime • No setup fees
            </p>
            <div className="flex justify-center gap-4">
              <Button variant="ghost" onClick={onClose}>
                Maybe Later
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default UpgradeModal

