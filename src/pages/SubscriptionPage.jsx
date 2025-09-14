import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  CreditCard, 
  Calendar, 
  DollarSign, 
  Settings, 
  AlertTriangle,
  CheckCircle,
  ExternalLink,
  Loader2,
  Crown,
  Star,
  Zap
} from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { useAuth } from '@/contexts/AuthContext'
import { paymentService } from '@/services/paymentService'
import { toast } from 'sonner'

const SubscriptionPage = () => {
  const { user, refreshUser } = useAuth()
  const [subscription, setSubscription] = useState(null)
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(null)

  // Load subscription and payment data
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        
        // Load subscription info
        const subData = await paymentService.getSubscription()
        setSubscription(subData.subscription)
        
        // Load payment history
        const paymentData = await paymentService.getPaymentHistory(1, 5)
        setPayments(paymentData.payments || [])
        
      } catch (error) {
        console.error('Failed to load subscription data:', error)
        toast.error('Failed to load subscription information')
      } finally {
        setLoading(false)
      }
    }

    if (user) {
      loadData()
    }
  }, [user])

  // Handle subscription cancellation
  const handleCancel = async () => {
    if (!window.confirm('Are you sure you want to cancel your subscription? You will continue to have access until the end of your billing period.')) {
      return
    }

    setActionLoading('cancel')
    try {
      await paymentService.cancelSubscription()
      toast.success('Subscription canceled successfully')
      
      // Refresh subscription data
      const subData = await paymentService.getSubscription()
      setSubscription(subData.subscription)
      await refreshUser()
    } catch (error) {
      console.error('Failed to cancel subscription:', error)
      toast.error(error.message || 'Failed to cancel subscription')
    } finally {
      setActionLoading(null)
    }
  }

  // Handle subscription reactivation
  const handleReactivate = async () => {
    setActionLoading('reactivate')
    try {
      await paymentService.reactivateSubscription()
      toast.success('Subscription reactivated successfully')
      
      // Refresh subscription data
      const subData = await paymentService.getSubscription()
      setSubscription(subData.subscription)
      await refreshUser()
    } catch (error) {
      console.error('Failed to reactivate subscription:', error)
      toast.error(error.message || 'Failed to reactivate subscription')
    } finally {
      setActionLoading(null)
    }
  }

  // Handle billing portal access
  const handleBillingPortal = async () => {
    setActionLoading('billing')
    try {
      const returnUrl = `${window.location.origin}/subscription`
      const { portal_url } = await paymentService.createBillingPortalSession(returnUrl)
      window.location.href = portal_url
    } catch (error) {
      console.error('Failed to open billing portal:', error)
      toast.error(error.message || 'Failed to open billing portal')
      setActionLoading(null)
    }
  }

  // Get tier icon
  const getTierIcon = (tier) => {
    switch (tier) {
      case 'basic':
        return <Star className="w-5 h-5" />
      case 'pro':
        return <Crown className="w-5 h-5" />
      case 'premium':
        return <Crown className="w-5 h-5" />
      default:
        return <Zap className="w-5 h-5" />
    }
  }

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'canceled':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'past_due':
        return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'trialing':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Loading subscription...</span>
        </div>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>Subscription Management - GrimmTrading</title>
        <meta name="description" content="Manage your GrimmTrading subscription, view billing history, and update payment methods." />
      </Helmet>

      <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Subscription Management</h1>
            <p className="text-muted-foreground">
              Manage your subscription, billing, and payment methods
            </p>
          </div>

          {/* Current Subscription */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Current Subscription
              </CardTitle>
            </CardHeader>
            <CardContent>
              {subscription ? (
                <div className="space-y-6">
                  {/* Subscription Info */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                        {getTierIcon(subscription.tier)}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold capitalize">
                          {paymentService.getTierDisplay(subscription.tier)} Plan
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {paymentService.formatCurrency(subscription.amount)} / {paymentService.getBillingIntervalDisplay(subscription.billing_interval)}
                        </p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(subscription.status)}>
                      {paymentService.getStatusDisplay(subscription.status)}
                    </Badge>
                  </div>

                  {/* Billing Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">
                        <strong>Current Period:</strong> {paymentService.formatDate(subscription.current_period_start)} - {paymentService.formatDate(subscription.current_period_end)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">
                        <strong>Next Billing:</strong> {paymentService.formatDate(subscription.current_period_end)}
                      </span>
                    </div>
                  </div>

                  {/* Cancellation Notice */}
                  {subscription.cancel_at_period_end && (
                    <Alert>
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        Your subscription is scheduled to cancel on {paymentService.formatDate(subscription.current_period_end)}. 
                        You can reactivate it anytime before then.
                      </AlertDescription>
                    </Alert>
                  )}

                  {/* Actions */}
                  <div className="flex flex-wrap gap-3">
                    <Button
                      onClick={handleBillingPortal}
                      disabled={actionLoading === 'billing'}
                      className="flex items-center gap-2"
                    >
                      {actionLoading === 'billing' ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Settings className="w-4 h-4" />
                      )}
                      Manage Billing
                      <ExternalLink className="w-3 h-3" />
                    </Button>

                    {subscription.cancel_at_period_end ? (
                      <Button
                        variant="outline"
                        onClick={handleReactivate}
                        disabled={actionLoading === 'reactivate'}
                        className="flex items-center gap-2"
                      >
                        {actionLoading === 'reactivate' ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <CheckCircle className="w-4 h-4" />
                        )}
                        Reactivate Subscription
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        onClick={handleCancel}
                        disabled={actionLoading === 'cancel'}
                        className="flex items-center gap-2 text-red-600 hover:text-red-700"
                      >
                        {actionLoading === 'cancel' ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <AlertTriangle className="w-4 h-4" />
                        )}
                        Cancel Subscription
                      </Button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <CreditCard className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">No Active Subscription</h3>
                  <p className="text-muted-foreground mb-4">
                    You're currently on the free plan. Upgrade to unlock premium features.
                  </p>
                  <Button asChild>
                    <a href="/pricing">View Plans</a>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Payment History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Payment History
              </CardTitle>
              <CardDescription>
                Your recent payment transactions
              </CardDescription>
            </CardHeader>
            <CardContent>
              {payments.length > 0 ? (
                <div className="space-y-4">
                  {payments.map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${
                          payment.status === 'succeeded' ? 'bg-green-500' : 
                          payment.status === 'failed' ? 'bg-red-500' : 'bg-yellow-500'
                        }`} />
                        <div>
                          <p className="font-medium">{payment.description}</p>
                          <p className="text-sm text-muted-foreground">
                            {paymentService.formatDateTime(payment.paid_at || payment.created_at)}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          {paymentService.formatCurrency(payment.amount, payment.currency)}
                        </p>
                        <p className="text-sm text-muted-foreground capitalize">
                          {payment.status}
                        </p>
                      </div>
                    </div>
                  ))}
                  
                  {/* View All Payments Link */}
                  <div className="text-center pt-4">
                    <Button variant="outline" size="sm">
                      View All Payments
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <DollarSign className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">No Payment History</h3>
                  <p className="text-muted-foreground">
                    Your payment transactions will appear here once you subscribe to a plan.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}

export default SubscriptionPage

