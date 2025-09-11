# GrimmTrading Frontend

Professional day trading platform frontend built with React 18, TypeScript, Tailwind CSS, and shadcn/ui components.

## Features

- 🎨 **Dark Trading Theme** - Professional dark UI optimized for trading
- 🔐 **Authentication** - Login, register, protected routes
- 📊 **Optimal Dashboard Layout** - 3-panel layout (scanners, charts, news/chat)
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile
- ⚡ **Modern Stack** - React 18, Vite, Tailwind CSS, shadcn/ui
- 🎯 **Trading-Focused** - Built specifically for day traders

## Quick Start

### Local Development

1. **Install dependencies:**
   ```bash
   cd gtfront
   pnpm install
   ```

2. **Configure environment:**
   ```bash
   cp .env.example .env
   # Edit .env with your backend URL
   ```

3. **Start development server:**
   ```bash
   pnpm run dev
   ```

   App will start at `http://localhost:5173`

### Netlify Deployment

1. **Build the project:**
   ```bash
   pnpm run build
   ```

2. **Deploy to Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Create new site from Git
   - Connect your GitHub repository
   - Netlify will auto-detect `netlify.toml` configuration

3. **Configure environment variables in Netlify:**
   ```
   VITE_API_URL=https://your-backend-url.railway.app
   ```

## Dashboard Layout

### Optimal Trading Layout (Inspired by Ross Cameron/Warrior Trading)

```
┌─────────────────────────────────────────────────────────────┐
│                    Navigation Bar                           │
├─────────────┬─────────────────────────┬─────────────────────┤
│   Scanners  │         Charts          │    News & Chat     │
│   (25%)     │         (50%)           │       (25%)        │
│             │                         │                     │
│ • Momentum  │  TradingView Integration│ • Market News      │
│ • Gappers   │  • Real-time data       │ • Trading Room     │
│ • Low Float │  • Technical indicators │ • Community Chat   │
│ • Volume    │  • Multiple timeframes  │ • Live Updates     │
│             │  • Drawing tools        │                     │
└─────────────┴─────────────────────────┴─────────────────────┘
```

### Key Components

- **Left Panel (25%)**: Stock scanners with Ross Cameron's criteria
- **Center Panel (50%)**: Main chart area with TradingView integration
- **Right Panel (25%)**: Market news and trading room chat

## Pages

### 🏠 Home Page
- Professional landing page
- Feature highlights
- Call-to-action for registration
- Trading methodology explanation

### 🔐 Authentication Pages
- **Login**: Username/email + password with demo credentials
- **Register**: Full registration form with password validation
- **Protected Routes**: Dashboard requires authentication

### 📊 Dashboard
- **Live Scanners**: Momentum, gappers, volume leaders
- **Chart Area**: Placeholder for TradingView integration
- **Market News**: Real-time financial news feed
- **Trading Room**: Community chat (placeholder)
- **Market Status**: Live market hours indicator

## Technology Stack

- **React 18** - Latest React with hooks and concurrent features
- **TypeScript** - Type safety and better development experience
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality React components
- **React Router** - Client-side routing
- **Lucide Icons** - Beautiful icon library
- **Framer Motion** - Animation library (pre-installed)

## Environment Variables

```bash
# API Configuration
VITE_API_URL=http://localhost:5001

# App Configuration
VITE_APP_NAME=GrimmTrading
VITE_APP_VERSION=1.0.0

# Feature Flags
VITE_ENABLE_CHAT=false
VITE_ENABLE_REAL_DATA=false
```

## Project Structure

```
gtfront/
├── public/                  # Static assets
├── src/
│   ├── components/
│   │   ├── ui/             # shadcn/ui components
│   │   ├── Navbar.jsx      # Navigation component
│   │   └── ProtectedRoute.jsx
│   ├── pages/
│   │   ├── HomePage.jsx    # Landing page
│   │   ├── LoginPage.jsx   # Authentication
│   │   ├── RegisterPage.jsx
│   │   └── DashboardPage.jsx # Main trading dashboard
│   ├── contexts/
│   │   └── AuthContext.jsx # Authentication state
│   ├── services/
│   │   └── authService.js  # API communication
│   ├── App.jsx            # Main app component
│   ├── App.css           # Trading theme styles
│   └── main.jsx          # Entry point
├── netlify.toml          # Netlify deployment config
├── package.json          # Dependencies and scripts
└── README.md            # This file
```

## Styling

### Dark Trading Theme
- **Background**: Deep dark colors for reduced eye strain
- **Primary**: Green accent color for positive movements
- **Secondary**: Red for negative movements
- **Text**: High contrast for readability
- **Cards**: Subtle borders and backgrounds

### Custom CSS Classes
```css
.trading-green { color: var(--trading-green); }
.trading-red { color: var(--trading-red); }
.trading-yellow { color: var(--trading-yellow); }
```

## Development

### Adding New Components
1. Create component in appropriate directory
2. Use shadcn/ui components when possible
3. Follow the established dark theme patterns
4. Ensure mobile responsiveness

### State Management
- **Authentication**: React Context (AuthContext)
- **Local State**: useState for component state
- **Future**: Consider Zustand for complex state

### API Integration
- All API calls go through `authService.js`
- JWT tokens handled automatically
- Error handling with user-friendly messages

## Deployment Checklist

- [ ] Update `VITE_API_URL` in Netlify environment variables
- [ ] Test authentication flow with backend
- [ ] Verify responsive design on mobile
- [ ] Check all routes work correctly
- [ ] Confirm dark theme displays properly

## Future Enhancements

- 📈 **Real TradingView Integration**
- 💬 **Live Chat with WebSocket**
- 📊 **Real Market Data APIs**
- 🔔 **Push Notifications**
- 📱 **Mobile App (React Native)**
- 🤖 **Trading Alerts & Automation**

## Support

For issues or questions:
1. Check browser console for errors
2. Verify backend is running and accessible
3. Check network requests in browser dev tools
4. Ensure environment variables are set correctly

