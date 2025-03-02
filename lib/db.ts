// This is a mock database implementation
// In a real app, you would use Prisma, Drizzle, or another ORM

interface User {
  id: string
  name: string
  email: string
  emailVerified?: Date
  image?: string
  createdAt: Date
  updatedAt: Date
  isPremium: boolean
}

interface Stock {
  id: string
  userId: string
  ticker: string
  shares: number
  purchasePrice: number
  purchaseDate: Date
  createdAt: Date
  updatedAt: Date
}

interface EmailPreference {
  id: string
  userId: string
  frequency: "daily" | "multiple" | "weekly"
  morning: boolean
  midday: boolean
  evening: boolean
  weekends: boolean
  format: "detailed" | "summary" | "minimal"
  createdAt: Date
  updatedAt: Date
}

// Mock data store
const users: User[] = []
const stocks: Stock[] = []
const emailPreferences: EmailPreference[] = []

// User functions
export async function createUser(data: Omit<User, "id" | "createdAt" | "updatedAt" | "isPremium">) {
  const user: User = {
    id: Math.random().toString(36).substring(2, 15),
    ...data,
    isPremium: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  users.push(user)

  // Create default email preferences
  await createEmailPreference({
    userId: user.id,
    frequency: "daily",
    morning: false,
    midday: false,
    evening: true,
    weekends: false,
    format: "detailed",
  })

  return user
}

export async function getUserByEmail(email: string) {
  return users.find((user) => user.email === email)
}

export async function getUserById(id: string) {
  return users.find((user) => user.id === id)
}

export async function updateUser(id: string, data: Partial<User>) {
  const userIndex = users.findIndex((user) => user.id === id)

  if (userIndex === -1) {
    return null
  }

  users[userIndex] = {
    ...users[userIndex],
    ...data,
    updatedAt: new Date(),
  }

  return users[userIndex]
}

// Stock functions
export async function createStock(data: Omit<Stock, "id" | "createdAt" | "updatedAt">) {
  const stock: Stock = {
    id: Math.random().toString(36).substring(2, 15),
    ...data,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  stocks.push(stock)
  return stock
}

export async function getStocksByUserId(userId: string) {
  return stocks.filter((stock) => stock.userId === userId)
}

export async function updateStock(id: string, data: Partial<Stock>) {
  const stockIndex = stocks.findIndex((stock) => stock.id === id)

  if (stockIndex === -1) {
    return null
  }

  stocks[stockIndex] = {
    ...stocks[stockIndex],
    ...data,
    updatedAt: new Date(),
  }

  return stocks[stockIndex]
}

export async function deleteStock(id: string) {
  const stockIndex = stocks.findIndex((stock) => stock.id === id)

  if (stockIndex === -1) {
    return false
  }

  stocks.splice(stockIndex, 1)
  return true
}

// Email preference functions
export async function createEmailPreference(data: Omit<EmailPreference, "id" | "createdAt" | "updatedAt">) {
  const preference: EmailPreference = {
    id: Math.random().toString(36).substring(2, 15),
    ...data,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  emailPreferences.push(preference)
  return preference
}

export async function getEmailPreferenceByUserId(userId: string) {
  return emailPreferences.find((pref) => pref.userId === userId)
}

export async function updateEmailPreference(id: string, data: Partial<EmailPreference>) {
  const prefIndex = emailPreferences.findIndex((pref) => pref.id === id)

  if (prefIndex === -1) {
    return null
  }

  emailPreferences[prefIndex] = {
    ...emailPreferences[prefIndex],
    ...data,
    updatedAt: new Date(),
  }

  return emailPreferences[prefIndex]
}

