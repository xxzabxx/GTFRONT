import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Lock, Crown, Zap } from 'lucide-react'

const PermissionGate = ({ 
  feature, 
  children, 
  fallback = null, 
  showUpgrade = true,
  className = ""
}) => {
  const { hasPermission, getTierInfo, user } = useAuth()
  
  // If user has permission, render children
  if (hasPermission(feature)) {
    return <div className={className}>{children}</div>
  }

  // If no fallback and no upgrade prompt, render nothing
  if (!showUpgrade && !fallback) {
    return null
  }

  // If custom fallback provided, use it
  if (fallback) {
    return <div className={className}>{fallback}</div>
  }

  // Default upgrade prompt
  const tierInfo = getTierInfo()
  const currentTier = tierInfo.tier || 'free'
  
  const getRequiredTier = (feature) => {
    const featureTiers = {
      'advanced_scanners': 'premium',
      'real_time_data': 'premium',
      'unlimited_watchlists': 'premium',
      'trading_room': 'premium',
      'level_2_data': 'pro',
      'options_flow': 'pro',
      'ai_alerts': 'pro',
      'api_access': 'pro'
    }
    return featureTiers[feature] || 'premium'
  }

  const requiredTier = getRequiredTier(feature)
  
  const getTierIcon = (tier) => {
    switch (tier) {
      case 'premium': return <Crown className="w-4 h-4" />
      case 'pro': return <Zap className="w-4 h-4" />
      default: return <Lock className="w-4 h-4" />
    }
  }

  const getTierColor = (tier) => {
    switch (tier) {
      case 'premium': return 'bg-blue-500'
      case 'pro': return 'bg-purple-500'
      default: return 'bg-gray-500'
    }
  }

  const getFeatureName = (feature) => {
    const featureNames = {
      'advanced_scanners': 'Advanced Scanners',
      'real_time_data': 'Real-Time Data',
      'unlimited_watchlists': 'Unlimited Watchlists',
      'trading_room': 'Trading Room Chat',
      'level_2_data': 'Level 2 Data',
      'options_flow': 'Options Flow',
      'ai_alerts': 'AI-Powered Alerts',
      'api_access': 'API Access'
    }
    return featureNames[feature] || feature.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())
  }

  return (
    <div className={className}>
      <Card className="border-dashed border-2 border-gray-600 bg-gray-800/50">
        <CardHeader className="text-center pb-4">
          <div className="flex items-center justify-center mb-2">
            <div className={`p-3 rounded-full ${getTierColor(requiredTier)} bg-opacity-20`}>
              {getTierIcon(requiredTier)}
            </div>
          </div>
          <CardTitle className="text-lg text-gray-300">
            {getFeatureName(feature)}
          </CardTitle>
          <CardDescription className="text-gray-400">
            This feature requires a {requiredTier} subscription
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Badge variant="outline" className="text-gray-400 border-gray-600">
              Current: {currentTier}
            </Badge>
            <span className="text-gray-500">→</span>
            <Badge className={`${getTierColor(requiredTier)} text-white`}>
              Required: {requiredTier}
            </Badge>
          </div>
          
          <div className="space-y-2">
            <Button 
              className={`w-full ${getTierColor(requiredTier)} hover:opacity-90`}
              onClick={() => {
                // TODO: Navigate to pricing page or open upgrade modal
                console.log(`Upgrade to ${requiredTier} for ${feature}`)
              }}
            >
              {getTierIcon(requiredTier)}
              <span className="ml-2">Upgrade to {requiredTier}</span>
            </Button>
            
            <p className="text-xs text-gray-500">
              Unlock this feature and more with a {requiredTier} subscription
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default PermissionGate

