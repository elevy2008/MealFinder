export type EmailFormat = "detailed" | "summary" | "minimal"

export interface PortfolioData {
  ticker: string
  name: string
  shares: number
  price: number
  change: number
  value: number
}

export interface EmailData {
  userName: string
  portfolioData: PortfolioData[]
  totalValue: number
  dailyChange: number
  date: string
  summary?: string
}

// Helper function to generate HTML for detailed email template
function renderDetailedTemplate(data: EmailData): string {
  const { userName, portfolioData, totalValue, dailyChange, date, summary } = data
  const changeColor = dailyChange >= 0 ? "#4ade80" : "#f87171"
  const changeSymbol = dailyChange >= 0 ? "+" : ""
  
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="padding: 20px; background-color: #f9fafb; border-bottom: 1px solid #e5e7eb;">
        <h1 style="margin: 0; color: #111827; font-size: 24px;">StockPulse</h1>
        <p style="margin: 5px 0 0; color: #6b7280; font-size: 14px;">Portfolio Update - ${date}</p>
      </div>
      
      <div style="padding: 20px;">
        <h2 style="margin: 0 0 15px; color: #111827; font-size: 18px;">Hello ${userName},</h2>
        
        <div style="background-color: #f9fafb; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="margin: 0 0 10px; font-size: 16px; color: #111827;">Portfolio Summary</h3>
          <p style="margin: 0 0 5px; font-size: 14px; color: #374151;">
            Total Value: <strong>$${totalValue.toFixed(2)}</strong>
          </p>
          <p style="margin: 0; font-size: 14px; color: #374151;">
            Today's Change: <span style="color: ${changeColor};">${changeSymbol}${dailyChange.toFixed(2)}</span>
          </p>
        </div>
        
        <div style="margin-bottom: 20px;">
          <h3 style="margin: 0 0 10px; font-size: 16px; color: #111827;">AI Summary</h3>
          <p style="margin: 0; font-size: 14px; color: #374151; line-height: 1.5;">${summary || "No summary available."}</p>
        </div>
        
        <div>
          <h3 style="margin: 0 0 10px; font-size: 16px; color: #111827;">Your Stocks</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="background-color: #f9fafb; border-bottom: 1px solid #e5e7eb;">
                <th style="padding: 10px; text-align: left; font-size: 14px; color: #6b7280;">Stock</th>
                <th style="padding: 10px; text-align: right; font-size: 14px; color: #6b7280;">Shares</th>
                <th style="padding: 10px; text-align: right; font-size: 14px; color: #6b7280;">Price</th>
                <th style="padding: 10px; text-align: right; font-size: 14px; color: #6b7280;">Change</th>
                <th style="padding: 10px; text-align: right; font-size: 14px; color: #6b7280;">Value</th>
              </tr>
            </thead>
            <tbody>
              ${portfolioData.map((stock) => `
                <tr style="border-bottom: 1px solid #e5e7eb;">
                  <td style="padding: 10px; font-size: 14px; color: #111827;">
                    <div style="font-weight: bold;">${stock.ticker}</div>
                    <div style="font-size: 12px; color: #6b7280;">${stock.name}</div>
                  </td>
                  <td style="padding: 10px; text-align: right; font-size: 14px; color: #111827;">${stock.shares}</td>
                  <td style="padding: 10px; text-align: right; font-size: 14px; color: #111827;">$${stock.price.toFixed(2)}</td>
                  <td style="padding: 10px; text-align: right; font-size: 14px; color: ${stock.change >= 0 ? "#4ade80" : "#f87171"};">
                    ${stock.change >= 0 ? "+" : ""}${stock.change.toFixed(2)}%
                  </td>
                  <td style="padding: 10px; text-align: right; font-size: 14px; color: #111827;">$${stock.value.toFixed(2)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
      
      <div style="padding: 20px; background-color: #f9fafb; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280;">
        <p style="margin: 0 0 10px;">
          This email was sent according to your preferences. You can update your settings in your StockPulse account.
        </p>
        <p style="margin: 0;">© 2025 StockPulse. All rights reserved.</p>
      </div>
    </div>
  `
}

// Helper function to generate HTML for summary email template
function renderSummaryTemplate(data: EmailData): string {
  const { userName, totalValue, dailyChange, date, summary } = data
  const changeColor = dailyChange >= 0 ? "#4ade80" : "#f87171"
  const changeSymbol = dailyChange >= 0 ? "+" : ""
  
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="padding: 20px; background-color: #f9fafb; border-bottom: 1px solid #e5e7eb;">
        <h1 style="margin: 0; color: #111827; font-size: 24px;">StockPulse</h1>
        <p style="margin: 5px 0 0; color: #6b7280; font-size: 14px;">Portfolio Update - ${date}</p>
      </div>
      
      <div style="padding: 20px;">
        <h2 style="margin: 0 0 15px; color: #111827; font-size: 18px;">Hello ${userName},</h2>
        
        <div style="background-color: #f9fafb; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="margin: 0 0 10px; font-size: 16px; color: #111827;">Portfolio Summary</h3>
          <p style="margin: 0 0 5px; font-size: 14px; color: #374151;">
            Total Value: <strong>$${totalValue.toFixed(2)}</strong>
          </p>
          <p style="margin: 0; font-size: 14px; color: #374151;">
            Today's Change: <span style="color: ${changeColor};">${changeSymbol}${dailyChange.toFixed(2)}</span>
          </p>
        </div>
        
        <div style="margin-bottom: 20px;">
          <h3 style="margin: 0 0 10px; font-size: 16px; color: #111827;">AI Summary</h3>
          <p style="margin: 0; font-size: 14px; color: #374151; line-height: 1.5;">${summary || "No summary available."}</p>
        </div>
      </div>
      
      <div style="padding: 20px; background-color: #f9fafb; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280;">
        <p style="margin: 0 0 10px;">
          This email was sent according to your preferences. You can update your settings in your StockPulse account.
        </p>
        <p style="margin: 0;">© 2025 StockPulse. All rights reserved.</p>
      </div>
    </div>
  `
}

// Helper function to generate HTML for minimal email template
function renderMinimalTemplate(data: EmailData): string {
  const { userName, totalValue, dailyChange, date } = data
  const changeColor = dailyChange >= 0 ? "#4ade80" : "#f87171"
  const changeSymbol = dailyChange >= 0 ? "+" : ""
  
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="padding: 20px; background-color: #f9fafb; border-bottom: 1px solid #e5e7eb;">
        <h1 style="margin: 0; color: #111827; font-size: 24px;">StockPulse</h1>
        <p style="margin: 5px 0 0; color: #6b7280; font-size: 14px;">Portfolio Update - ${date}</p>
      </div>
      
      <div style="padding: 20px;">
        <h2 style="margin: 0 0 15px; color: #111827; font-size: 18px;">Hello ${userName},</h2>
        
        <div style="background-color: #f9fafb; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="margin: 0 0 10px; font-size: 16px; color: #111827;">Portfolio Summary</h3>
          <p style="margin: 0 0 5px; font-size: 14px; color: #374151;">
            Total Value: <strong>$${totalValue.toFixed(2)}</strong>
          </p>
          <p style="margin: 0; font-size: 14px; color: #374151;">
            Today's Change: <span style="color: ${changeColor};">${changeSymbol}${dailyChange.toFixed(2)}</span>
          </p>
        </div>
      </div>
      
      <div style="padding: 20px; background-color: #f9fafb; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280;">
        <p style="margin: 0 0 10px;">
          This email was sent according to your preferences. You can update your settings in your StockPulse account.
        </p>
        <p style="margin: 0;">© 2025 StockPulse. All rights reserved.</p>
      </div>
    </div>
  `
}

export function renderEmailTemplate(format: EmailFormat, data: EmailData): string {
  switch (format) {
    case "detailed":
      return renderDetailedTemplate(data)
    case "summary":
      return renderSummaryTemplate(data)
    case "minimal":
      return renderMinimalTemplate(data)
    default:
      return renderDetailedTemplate(data)
  }
}
