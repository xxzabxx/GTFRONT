const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://gtback-production.up.railway.app'

class AuthService {
  async makeRequest(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    }

    const response = await fetch(url, config)
    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || 'Request failed')
    }

    return data
  }

  async login(credentials) {
    return this.makeRequest('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    })
  }

  async register(userData) {
    return this.makeRequest('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    })
  }

  async getProfile(token) {
    return this.makeRequest('/api/auth/profile', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }

  async updateProfile(profileData, token) {
    return this.makeRequest('/api/auth/profile', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(profileData)
    })
  }

  async changePassword(passwordData, token) {
    return this.makeRequest('/api/auth/change-password', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(passwordData)
    })
  }

  async refreshToken(refreshToken) {
    return this.makeRequest('/api/auth/refresh', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${refreshToken}`
      }
    })
  }

  async checkHealth() {
    return this.makeRequest('/api/health')
  }

  // Admin methods
  async getAdminUsers(params = {}) {
    const queryString = new URLSearchParams(params).toString()
    return this.makeRequest(`/api/admin/users?${queryString}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
  }

  async getAdminStats() {
    return this.makeRequest('/api/admin/stats', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
  }

  async updateUserTier(userId, tier, expiresInDays = 30) {
    return this.makeRequest(`/api/admin/users/${userId}/tier`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ tier, expires_in_days: expiresInDays })
    })
  }

  async updateUserStatus(userId, isActive) {
    return this.makeRequest(`/api/admin/users/${userId}/status`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ is_active: isActive })
    })
  }

  async updateUserAdmin(userId, isAdmin) {
    return this.makeRequest(`/api/admin/users/${userId}/admin`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ is_admin: isAdmin })
    })
  }

  async getUserDetails(userId) {
    return this.makeRequest(`/api/admin/users/${userId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
  }
}

export const authService = new AuthService()

