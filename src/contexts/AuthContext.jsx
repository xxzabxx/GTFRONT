import { createContext, useContext, useState, useEffect } from 'react'
import { authService } from '../services/authService'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState(localStorage.getItem('token'))

  useEffect(() => {
    // Check if user is logged in on app start
    const initAuth = async () => {
      const savedToken = localStorage.getItem('token')
      if (savedToken) {
        try {
          const userData = await authService.getProfile(savedToken)
          setUser(userData.user)
          setToken(savedToken)
        } catch (error) {
          console.error('Failed to get user profile:', error)
          localStorage.removeItem('token')
          setToken(null)
        }
      }
      setLoading(false)
    }

    initAuth()
  }, [])

  const login = async (credentials) => {
    try {
      const response = await authService.login(credentials)
      const { user: userData, access_token } = response
      
      setUser(userData)
      setToken(access_token)
      localStorage.setItem('token', access_token)
      
      return { success: true, user: userData }
    } catch (error) {
      console.error('Login failed:', error)
      return { 
        success: false, 
        error: error.response?.data?.error || 'Login failed' 
      }
    }
  }

  const register = async (userData) => {
    try {
      const response = await authService.register(userData)
      const { user: newUser, access_token } = response
      
      setUser(newUser)
      setToken(access_token)
      localStorage.setItem('token', access_token)
      
      return { success: true, user: newUser }
    } catch (error) {
      console.error('Registration failed:', error)
      return { 
        success: false, 
        error: error.response?.data?.error || 'Registration failed' 
      }
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('token')
  }

  const updateProfile = async (profileData) => {
    try {
      const response = await authService.updateProfile(profileData, token)
      setUser(response.user)
      return { success: true, user: response.user }
    } catch (error) {
      console.error('Profile update failed:', error)
      return { 
        success: false, 
        error: error.response?.data?.error || 'Profile update failed' 
      }
    }
  }

  const hasPermission = (feature) => {
    if (!user) return false
    if (user.is_admin) return true
    
    const permissions = user.tier_info?.permissions || []
    return permissions.includes(feature)
  }

  const isAdmin = () => {
    return user?.is_admin || false
  }

  const getTierInfo = () => {
    return user?.tier_info || {
      tier: 'free',
      expires: null,
      is_active: true,
      permissions: []
    }
  }

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    updateProfile,
    hasPermission,
    isAdmin,
    getTierInfo,
    isAuthenticated: !!user
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

