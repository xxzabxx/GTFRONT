const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://gtback-production.up.railway.app'

class ScannerService {
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

  async getScannerStatus(token) {
    return this.makeRequest('/api/scanners/status', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }

  async getMomentumScanner(token) {
    return this.makeRequest('/api/scanners/momentum', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }

  async getGappersScanner(token) {
    return this.makeRequest('/api/scanners/gappers', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }

  async getLowFloatScanner(token) {
    return this.makeRequest('/api/scanners/low-float', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }

  async getMarketQuote(symbol, token) {
    return this.makeRequest(`/api/market/quote/${symbol}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }

  async getMarketStatus(token) {
    return this.makeRequest('/api/market/status', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }

  async searchSymbols(query, token) {
    return this.makeRequest(`/api/market/search?q=${encodeURIComponent(query)}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }
}

export const scannerService = new ScannerService()

