import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Crown, Star, Zap, Shield } from 'lucide-react'

const TierBadge = ({ tier, size = 'default', showIcon = true, className = '' }) => {
  const getTierConfig = (tierName) => {
    switch (tierName?.toLowerCase()) {
      case 'free':
        return {
          label: 'Free',
          icon: Shield,
          variant: 'secondary',
          className: 'bg-gray-500/10 text-gray-400 border-gray-500/20'
        }
      case 'basic':
        return {
          label: 'Basic',
          icon: Star,
          variant: 'outline',
          className: 'bg-blue-500/10 text-blue-400 border-blue-500/20'
        }
      case 'pro':
        return {
          label: 'Pro',
          icon: Zap,
          variant: 'default',
          className: 'bg-purple-500/10 text-purple-400 border-purple-500/20'
        }
      case 'premium':
        return {
          label: 'Premium',
          icon: Crown,
          variant: 'default',
          className: 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-400 border-yellow-500/30'
        }
      default:
        return {
          label: 'Unknown',
          icon: Shield,
          variant: 'secondary',
          className: 'bg-gray-500/10 text-gray-400 border-gray-500/20'
        }
    }
  }

  const config = getTierConfig(tier)
  const Icon = config.icon

  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    default: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-2'
  }

  return (
    <Badge 
      variant={config.variant}
      className={`${config.className} ${sizeClasses[size]} ${className} flex items-center gap-1`}
    >
      {showIcon && <Icon className={`${size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'}`} />}
      {config.label}
    </Badge>
  )
}

export default TierBadge

