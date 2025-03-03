// Mock database for email preferences and stock data

// User data
const users = [
  {
    id: "user123",
    name: "John Doe",
    email: "john.doe@example.com",
  },
  {
    id: "user456",
    name: "Jane Smith",
    email: "jane.smith@example.com",
  },
];

// Email preferences
const emailPreferences = [
  {
    id: "pref123",
    userId: "user123",
    frequency: "daily",
    morning: true,
    midday: false,
    evening: true,
    weekends: false,
    format: "detailed",
  },
  {
    id: "pref456",
    userId: "user456",
    frequency: "weekly",
    morning: false,
    midday: false,
    evening: true,
    weekends: true,
    format: "summary",
  },
];

// Stock data
const stocks = [
  {
    id: "stock123",
    userId: "user123",
    ticker: "AAPL",
    shares: 10,
  },
  {
    id: "stock124",
    userId: "user123",
    ticker: "MSFT",
    shares: 5,
  },
  {
    id: "stock125",
    userId: "user123",
    ticker: "GOOGL",
    shares: 2,
  },
  {
    id: "stock456",
    userId: "user456",
    ticker: "TSLA",
    shares: 8,
  },
];

// User functions
export async function getUserById(id: string) {
  return users.find((user) => user.id === id) || null;
}

export async function getUserByEmail(email: string) {
  return users.find((user) => user.email === email) || null;
}

export async function createUser(user: any) {
  const newUser = { ...user, id: `user${Date.now()}` };
  users.push(newUser);
  return newUser;
}

export async function updateUser(id: string, data: any) {
  const index = users.findIndex((user) => user.id === id);
  if (index === -1) return null;
  
  users[index] = { ...users[index], ...data };
  return users[index];
}

export async function deleteUser(id: string) {
  const index = users.findIndex((user) => user.id === id);
  if (index === -1) return false;
  
  users.splice(index, 1);
  return true;
}

// Email preference functions
export async function getEmailPreferenceByUserId(userId: string) {
  return emailPreferences.find((pref) => pref.userId === userId) || null;
}

export async function createEmailPreference(preference: any) {
  const newPreference = { ...preference, id: `pref${Date.now()}` };
  emailPreferences.push(newPreference);
  return newPreference;
}

export async function updateEmailPreference(id: string, data: any) {
  const index = emailPreferences.findIndex((pref) => pref.id === id);
  if (index === -1) return null;
  
  emailPreferences[index] = { ...emailPreferences[index], ...data };
  return emailPreferences[index];
}

export async function deleteEmailPreference(id: string) {
  const index = emailPreferences.findIndex((pref) => pref.id === id);
  if (index === -1) return false;
  
  emailPreferences.splice(index, 1);
  return true;
}

// Stock functions
export async function getStocksByUserId(userId: string) {
  return stocks.filter((stock) => stock.userId === userId);
}

export async function getStockById(id: string) {
  return stocks.find((stock) => stock.id === id) || null;
}

export async function createStock(stock: any) {
  const newStock = { ...stock, id: `stock${Date.now()}` };
  stocks.push(newStock);
  return newStock;
}

export async function updateStock(id: string, data: any) {
  const index = stocks.findIndex((stock) => stock.id === id);
  if (index === -1) return null;
  
  stocks[index] = { ...stocks[index], ...data };
  return stocks[index];
}

export async function deleteStock(id: string) {
  const index = stocks.findIndex((stock) => stock.id === id);
  if (index === -1) return false;
  
  stocks.splice(index, 1);
  return true;
}
