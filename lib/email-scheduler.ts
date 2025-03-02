import { getUserByEmail, getEmailPreferenceByUserId, getStocksByUserId } from "@/lib/db"

// Mock function to get stock data - in a real app, this would fetch from an API
async function getStockData(tickers: string[]) {
  // Mock stock data
  const mockStockData: Record<string, { name: string; price: number; change: number }> = {
    AAPL: { name: "Apple Inc.", price: 182.52, change: 1.25 },
    MSFT: { name: "Microsoft Corp.", price: 415.5, change: -0.75 },
    GOOGL: { name: "Alphabet Inc.", price: 175.98, change: 2.34 },
    AMZN: { name: "Amazon.com Inc.", price: 178.75, change: 0.45 },
    TSLA: { name: "Tesla Inc.", price: 177.8, change: -1.2 },
  }

  return tickers.map((ticker) => {
    const stockData = mockStockData[ticker] || { name: "Unknown", price: 0, change: 0 }
    return {
      ticker,
      ...stockData,
    }
  })
}

export async function shouldSendEmail(userEmail: string, currentTime: Date) {
  try {
    // Get user and their email preferences
    const user = await getUserByEmail(userEmail)
    if (!user) return false

    const preferences = await getEmailPreferenceByUserId(user.id)
    if (!preferences) return false

    const hour = currentTime.getHours()
    const dayOfWeek = currentTime.getDay() // 0 = Sunday, 6 = Saturday

    // Check if it's a weekend
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6
    if (isWeekend && !preferences.weekends) return false

    // Check frequency and timing
    switch (preferences.frequency) {
      case "daily":
        if (
          (hour === 9 && preferences.morning) ||
          (hour === 17 && preferences.evening)
        ) {
          return true
        }
        break
      case "multiple":
        if (
          (hour === 9 && preferences.morning) ||
          (hour === 12 && preferences.midday) ||
          (hour === 17 && preferences.evening)
        ) {
          return true
        }
        break
      case "weekly":
        // Send weekly emails on Friday evening
        if (dayOfWeek === 5 && hour === 17) {
          return true
        }
        break
    }

    return false
  } catch (error) {
    console.error("Error checking if email should be sent:", error)
    return false
  }
}

export async function prepareEmailData(userEmail: string) {
  try {
    // Get user and their stocks
    const user = await getUserByEmail(userEmail)
    if (!user) throw new Error("User not found")

    const stocks = await getStocksByUserId(user.id)
    if (!stocks || stocks.length === 0) throw new Error("No stocks found for user")

    // Get stock data
    const tickers = stocks.map((stock) => stock.ticker)
    const stockData = await getStockData(tickers)

    // Prepare portfolio data
    const portfolioData = stocks.map((stock) => {
      const data = stockData.find((s) => s.ticker === stock.ticker) || {
        name: "Unknown",
        price: 0,
        change: 0,
      }
      return {
        ticker: stock.ticker,
        name: data.name,
        shares: stock.shares,
        price: data.price,
        change: data.change,
        value: stock.shares * data.price,
      }
    })

    // Calculate total value and daily change
    const totalValue = portfolioData.reduce((sum, stock) => sum + stock.value, 0)
    const dailyChange = portfolioData.reduce((sum, stock) => sum + (stock.change * stock.value) / 100, 0)

    // Get email preferences
    const preferences = await getEmailPreferenceByUserId(user.id)
    if (!preferences) throw new Error("Email preferences not found")

    // Prepare email data
    return {
      to: user.email,
      subject: `StockPulse Portfolio Update - ${new Date().toLocaleDateString()}`,
      emailData: {
        userName: user.name,
        portfolioData,
        totalValue,
        dailyChange,
        date: new Date().toLocaleDateString(),
      },
      format: preferences.format || "detailed",
    }
  } catch (error) {
    console.error("Error preparing email data:", error)
    throw error
  }
}
