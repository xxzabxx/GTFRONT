import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import './App.css'

// Pages
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import AdminPage from './pages/AdminPage'
import PricingPage from './pages/PricingPage'
import SubscriptionPage from './pages/SubscriptionPage'
import CADPage from './pages/CADPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import TermsPage from './pages/TermsPage'
import PrivacyPage from './pages/PrivacyPage'
import ResourcesPage from './pages/ResourcesPage'

// Components
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'

// Context
import { AuthProvider } from './contexts/AuthContext'

// Component to conditionally render footer
function ConditionalFooter() {
  const location = useLocation()
  
  // Don't show footer on dashboard and admin pages (trading interfaces need full screen)
  const hideFooterPaths = ['/dashboard', '/admin']
  const shouldHideFooter = hideFooterPaths.includes(location.pathname)
  
  return shouldHideFooter ? null : <Footer />
}

// Main app content with location-based key for proper re-rendering
function AppContent({ isDarkMode, setIsDarkMode }) {
  const location = useLocation()
  
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <main className="flex-1">
        <Routes key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/DPSCAD" element={<CADPage />} />
          <Route 
            path="/subscription" 
            element={
              <ProtectedRoute>
                <SubscriptionPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute>
                <AdminPage />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </main>
      <ConditionalFooter />
    </div>
  )
}

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true) // Default to dark mode for trading

  useEffect(() => {
    // Apply dark mode class to document
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  return (
    <AuthProvider>
      <Router>
        <AppContent isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      </Router>
    </AuthProvider>
  )
}

export default App
