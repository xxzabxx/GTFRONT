/**
 * Market Hours Utility for NYSE Trading Schedule
 * Handles pre-market, core trading, extended hours, weekends, and holidays
 */

// NYSE Holiday Calendar (2025-2027)
const NYSE_HOLIDAYS = [
  // 2025
  '2025-01-01', // New Year's Day
  '2025-01-20', // Martin Luther King Jr. Day
  '2025-02-17', // Presidents' Day
  '2025-04-18', // Good Friday
  '2025-05-26', // Memorial Day
  '2025-06-19', // Juneteenth
  '2025-07-04', // Independence Day
  '2025-09-01', // Labor Day
  '2025-11-27', // Thanksgiving
  '2025-12-25', // Christmas Day
  
  // 2026
  '2026-01-01', // New Year's Day
  '2026-01-19', // Martin Luther King Jr. Day
  '2026-02-16', // Presidents' Day
  '2026-04-03', // Good Friday
  '2026-05-25', // Memorial Day
  '2026-06-19', // Juneteenth
  '2026-07-03', // Independence Day (observed)
  '2026-09-07', // Labor Day
  '2026-11-26', // Thanksgiving
  '2026-12-25', // Christmas Day
  
  // 2027
  '2027-01-01', // New Year's Day
  '2027-01-18', // Martin Luther King Jr. Day
  '2027-02-15', // Presidents' Day
  '2027-03-26', // Good Friday
  '2027-05-31', // Memorial Day
  '2027-06-18', // Juneteenth (observed)
  '2027-07-05', // Independence Day (observed)
  '2027-09-06', // Labor Day
  '2027-11-25', // Thanksgiving
  '2027-12-24', // Christmas Day (observed)
]

/**
 * Market session types
 */
export const MARKET_SESSIONS = {
  CLOSED: 'closed',
  PRE_MARKET: 'pre_market',
  CORE_TRADING: 'core_trading',
  EXTENDED_HOURS: 'extended_hours',
  HOLIDAY: 'holiday'
}

/**
 * Trading hours in ET (Eastern Time)
 */
export const TRADING_HOURS = {
  PRE_MARKET_START: { hour: 4, minute: 0 },   // 4:00 AM ET
  PRE_MARKET_END: { hour: 9, minute: 30 },    // 9:30 AM ET
  CORE_TRADING_START: { hour: 9, minute: 30 }, // 9:30 AM ET
  CORE_TRADING_END: { hour: 16, minute: 0 },   // 4:00 PM ET
  EXTENDED_START: { hour: 16, minute: 0 },     // 4:00 PM ET
  EXTENDED_END: { hour: 20, minute: 0 }        // 8:00 PM ET
}

/**
 * Convert time to Eastern Time
 */
function toEasternTime(date = new Date()) {
  return new Date(date.toLocaleString("en-US", { timeZone: "America/New_York" }))
}

/**
 * Check if a date is a NYSE holiday
 */
function isNYSEHoliday(date) {
  const dateStr = date.toISOString().split('T')[0]
  return NYSE_HOLIDAYS.includes(dateStr)
}

/**
 * Check if a date is a weekend (Saturday or Sunday)
 */
function isWeekend(date) {
  const day = date.getDay()
  return day === 0 || day === 6 // Sunday = 0, Saturday = 6
}

/**
 * Check if a time falls within a specific session
 */
function isTimeInSession(time, sessionStart, sessionEnd) {
  const hour = time.getHours()
  const minute = time.getMinutes()
  const timeMinutes = hour * 60 + minute
  
  const startMinutes = sessionStart.hour * 60 + sessionStart.minute
  const endMinutes = sessionEnd.hour * 60 + sessionEnd.minute
  
  return timeMinutes >= startMinutes && timeMinutes < endMinutes
}

/**
 * Get current market session
 */
export function getCurrentMarketSession(date = new Date()) {
  const etTime = toEasternTime(date)
  
  // Check if it's a holiday
  if (isNYSEHoliday(etTime)) {
    return {
      session: MARKET_SESSIONS.HOLIDAY,
      isOpen: false,
      description: 'NYSE Holiday',
      nextSession: getNextTradingDay(etTime)
    }
  }
  
  // Check if it's a weekend
  if (isWeekend(etTime)) {
    return {
      session: MARKET_SESSIONS.CLOSED,
      isOpen: false,
      description: 'Weekend',
      nextSession: getNextTradingDay(etTime)
    }
  }
  
  // Check trading sessions
  if (isTimeInSession(etTime, TRADING_HOURS.PRE_MARKET_START, TRADING_HOURS.PRE_MARKET_END)) {
    return {
      session: MARKET_SESSIONS.PRE_MARKET,
      isOpen: true,
      description: 'Pre-Market',
      nextSession: 'Core Trading at 9:30 AM ET'
    }
  }
  
  if (isTimeInSession(etTime, TRADING_HOURS.CORE_TRADING_START, TRADING_HOURS.CORE_TRADING_END)) {
    return {
      session: MARKET_SESSIONS.CORE_TRADING,
      isOpen: true,
      description: 'Market Open',
      nextSession: 'Extended Hours at 4:00 PM ET'
    }
  }
  
  if (isTimeInSession(etTime, TRADING_HOURS.EXTENDED_START, TRADING_HOURS.EXTENDED_END)) {
    return {
      session: MARKET_SESSIONS.EXTENDED_HOURS,
      isOpen: true,
      description: 'Extended Hours',
      nextSession: 'Market Closed at 8:00 PM ET'
    }
  }
  
  // Market is closed
  return {
    session: MARKET_SESSIONS.CLOSED,
    isOpen: false,
    description: 'Market Closed',
    nextSession: getNextTradingDay(etTime)
  }
}

/**
 * Get the next trading day
 */
function getNextTradingDay(date) {
  const nextDay = new Date(date)
  nextDay.setDate(nextDay.getDate() + 1)
  
  // Skip weekends and holidays
  while (isWeekend(nextDay) || isNYSEHoliday(nextDay)) {
    nextDay.setDate(nextDay.getDate() + 1)
  }
  
  return `Pre-Market opens ${nextDay.toLocaleDateString()} at 4:00 AM ET`
}

/**
 * Check if market is open for trading (any session)
 */
export function isMarketOpen(date = new Date()) {
  const session = getCurrentMarketSession(date)
  return session.isOpen
}

/**
 * Check if market is in core trading hours
 */
export function isCoreMarketHours(date = new Date()) {
  const session = getCurrentMarketSession(date)
  return session.session === MARKET_SESSIONS.CORE_TRADING
}

/**
 * Check if market is in pre-market hours
 */
export function isPreMarketHours(date = new Date()) {
  const session = getCurrentMarketSession(date)
  return session.session === MARKET_SESSIONS.PRE_MARKET
}

/**
 * Check if market is in extended hours
 */
export function isExtendedHours(date = new Date()) {
  const session = getCurrentMarketSession(date)
  return session.session === MARKET_SESSIONS.EXTENDED_HOURS
}

/**
 * Get market status with detailed information
 */
export function getMarketStatus(date = new Date()) {
  const session = getCurrentMarketSession(date)
  const etTime = toEasternTime(date)
  
  return {
    ...session,
    currentTime: etTime.toLocaleTimeString('en-US', {
      timeZone: 'America/New_York',
      hour12: true,
      hour: 'numeric',
      minute: '2-digit'
    }),
    timeZone: 'ET',
    shouldAutoRefresh: session.isOpen, // Only auto-refresh during trading hours
    dataStrategy: session.isOpen ? 'live' : 'previous_close'
  }
}

/**
 * Get time until next market session
 */
export function getTimeUntilNextSession(date = new Date()) {
  const etTime = toEasternTime(date)
  const session = getCurrentMarketSession(date)
  
  if (session.isOpen) {
    return null // Market is currently open
  }
  
  // Calculate time until next pre-market session
  const nextPreMarket = new Date(etTime)
  
  // If it's after extended hours today, move to next day
  if (etTime.getHours() >= 20) {
    nextPreMarket.setDate(nextPreMarket.getDate() + 1)
  }
  
  // Skip weekends and holidays
  while (isWeekend(nextPreMarket) || isNYSEHoliday(nextPreMarket)) {
    nextPreMarket.setDate(nextPreMarket.getDate() + 1)
  }
  
  // Set to 4:00 AM ET
  nextPreMarket.setHours(4, 0, 0, 0)
  
  const timeDiff = nextPreMarket.getTime() - etTime.getTime()
  const hours = Math.floor(timeDiff / (1000 * 60 * 60))
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60))
  
  return {
    hours,
    minutes,
    totalMinutes: Math.floor(timeDiff / (1000 * 60)),
    nextSessionTime: nextPreMarket
  }
}

export default {
  getCurrentMarketSession,
  isMarketOpen,
  isCoreMarketHours,
  isPreMarketHours,
  isExtendedHours,
  getMarketStatus,
  getTimeUntilNextSession,
  MARKET_SESSIONS,
  TRADING_HOURS
}

