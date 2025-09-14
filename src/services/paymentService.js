/**
 * Payment service for handling Stripe integration API calls
 */

import { authService } from './authService';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

class PaymentService {
  /**
   * Get pricing information for all plans
   */
  async getPricing() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/payments/pricing`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to get pricing');
      }

      return data.pricing;
    } catch (error) {
      console.error('Error getting pricing:', error);
      throw error;
    }
  }

  /**
   * Create a Stripe checkout session
   */
  async createCheckoutSession(tier, billingInterval, successUrl, cancelUrl) {
    try {
      const token = authService.getToken();
      if (!token) {
        throw new Error('Authentication required');
      }

      const response = await fetch(`${API_BASE_URL}/api/payments/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          tier,
          billing_interval: billingInterval,
          success_url: successUrl,
          cancel_url: cancelUrl,
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      return data;
    } catch (error) {
      console.error('Error creating checkout session:', error);
      throw error;
    }
  }

  /**
   * Get current user's subscription information
   */
  async getSubscription() {
    try {
      const token = authService.getToken();
      if (!token) {
        throw new Error('Authentication required');
      }

      const response = await fetch(`${API_BASE_URL}/api/payments/subscription`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to get subscription');
      }

      return data;
    } catch (error) {
      console.error('Error getting subscription:', error);
      throw error;
    }
  }

  /**
   * Cancel subscription at period end
   */
  async cancelSubscription() {
    try {
      const token = authService.getToken();
      if (!token) {
        throw new Error('Authentication required');
      }

      const response = await fetch(`${API_BASE_URL}/api/payments/subscription/cancel`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to cancel subscription');
      }

      return data;
    } catch (error) {
      console.error('Error canceling subscription:', error);
      throw error;
    }
  }

  /**
   * Reactivate a canceled subscription
   */
  async reactivateSubscription() {
    try {
      const token = authService.getToken();
      if (!token) {
        throw new Error('Authentication required');
      }

      const response = await fetch(`${API_BASE_URL}/api/payments/subscription/reactivate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to reactivate subscription');
      }

      return data;
    } catch (error) {
      console.error('Error reactivating subscription:', error);
      throw error;
    }
  }

  /**
   * Upgrade subscription immediately
   */
  async upgradeSubscription(tier, billingInterval) {
    try {
      const token = authService.getToken();
      if (!token) {
        throw new Error('Authentication required');
      }

      const response = await fetch(`${API_BASE_URL}/api/payments/subscription/upgrade`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          tier,
          billing_interval: billingInterval,
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to upgrade subscription');
      }

      return data;
    } catch (error) {
      console.error('Error upgrading subscription:', error);
      throw error;
    }
  }

  /**
   * Schedule subscription downgrade at period end
   */
  async downgradeSubscription(tier, billingInterval) {
    try {
      const token = authService.getToken();
      if (!token) {
        throw new Error('Authentication required');
      }

      const response = await fetch(`${API_BASE_URL}/api/payments/subscription/downgrade`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          tier,
          billing_interval: billingInterval,
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to schedule downgrade');
      }

      return data;
    } catch (error) {
      console.error('Error scheduling downgrade:', error);
      throw error;
    }
  }

  /**
   * Create billing portal session
   */
  async createBillingPortalSession(returnUrl) {
    try {
      const token = authService.getToken();
      if (!token) {
        throw new Error('Authentication required');
      }

      const response = await fetch(`${API_BASE_URL}/api/payments/billing-portal`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          return_url: returnUrl,
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to create billing portal session');
      }

      return data;
    } catch (error) {
      console.error('Error creating billing portal session:', error);
      throw error;
    }
  }

  /**
   * Get payment history
   */
  async getPaymentHistory(page = 1, perPage = 10) {
    try {
      const token = authService.getToken();
      if (!token) {
        throw new Error('Authentication required');
      }

      const response = await fetch(`${API_BASE_URL}/api/payments/payments?page=${page}&per_page=${perPage}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to get payment history');
      }

      return data;
    } catch (error) {
      console.error('Error getting payment history:', error);
      throw error;
    }
  }

  /**
   * Admin: Get all subscriptions
   */
  async getAdminSubscriptions(page = 1, perPage = 20) {
    try {
      const token = authService.getToken();
      if (!token) {
        throw new Error('Authentication required');
      }

      const response = await fetch(`${API_BASE_URL}/api/payments/admin/subscriptions?page=${page}&per_page=${perPage}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to get admin subscriptions');
      }

      return data;
    } catch (error) {
      console.error('Error getting admin subscriptions:', error);
      throw error;
    }
  }

  /**
   * Admin: Get all payments
   */
  async getAdminPayments(page = 1, perPage = 20) {
    try {
      const token = authService.getToken();
      if (!token) {
        throw new Error('Authentication required');
      }

      const response = await fetch(`${API_BASE_URL}/api/payments/admin/payments?page=${page}&per_page=${perPage}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to get admin payments');
      }

      return data;
    } catch (error) {
      console.error('Error getting admin payments:', error);
      throw error;
    }
  }

  /**
   * Format currency amount for display
   */
  formatCurrency(amount, currency = 'USD') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  }

  /**
   * Format date for display
   */
  formatDate(dateString) {
    if (!dateString) return 'N/A';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }

  /**
   * Format date and time for display
   */
  formatDateTime(dateString) {
    if (!dateString) return 'N/A';
    
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  /**
   * Get subscription status display text
   */
  getStatusDisplay(status) {
    const statusMap = {
      'active': 'Active',
      'canceled': 'Canceled',
      'past_due': 'Past Due',
      'unpaid': 'Unpaid',
      'trialing': 'Trial',
      'incomplete': 'Incomplete',
      'incomplete_expired': 'Expired',
    };
    
    return statusMap[status] || status;
  }

  /**
   * Get subscription status color for UI
   */
  getStatusColor(status) {
    const colorMap = {
      'active': 'green',
      'trialing': 'blue',
      'canceled': 'red',
      'past_due': 'orange',
      'unpaid': 'red',
      'incomplete': 'yellow',
      'incomplete_expired': 'red',
    };
    
    return colorMap[status] || 'gray';
  }

  /**
   * Get tier display name
   */
  getTierDisplay(tier) {
    const tierMap = {
      'free': 'Free',
      'basic': 'Basic',
      'pro': 'Pro',
      'premium': 'Premium',
    };
    
    return tierMap[tier] || tier;
  }

  /**
   * Get billing interval display text
   */
  getBillingIntervalDisplay(interval) {
    const intervalMap = {
      'monthly': 'Monthly',
      'quarterly': 'Quarterly',
      'yearly': 'Yearly',
    };
    
    return intervalMap[interval] || interval;
  }
}

export const paymentService = new PaymentService();

