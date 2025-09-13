import { Link } from 'react-router-dom'
import { TrendingUp, Mail, FileText, Shield, BookOpen } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card/50 backdrop-blur-sm mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
                <TrendingUp className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">
                Grimm<span className="text-primary">Trading</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Professional day trading platform built for momentum traders. 
              Find high-probability setups with advanced scanners and real-time data.
            </p>
          </div>

          {/* Platform */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Platform
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Resources
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/resources" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                  <BookOpen className="w-3 h-3" />
                  Trading Resources
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                  <Mail className="w-3 h-3" />
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Legal
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                  <FileText className="w-3 h-3" />
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-8 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} GrimmTrading. All rights reserved.
            </div>
            <div className="text-sm text-muted-foreground">
              Built for momentum traders worldwide
            </div>
          </div>
        </div>

        {/* Risk Disclaimer */}
        <div className="mt-6 pt-6 border-t border-border">
          <p className="text-xs text-muted-foreground text-center max-w-4xl mx-auto">
            <strong>Risk Disclaimer:</strong> Trading involves substantial risk of loss and is not suitable for all investors. 
            Past performance is not indicative of future results. You should carefully consider whether trading is suitable for you 
            in light of your circumstances, knowledge, and financial resources. Never trade with money you cannot afford to lose.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

