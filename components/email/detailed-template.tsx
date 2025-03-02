import React from "react"

interface DetailedEmailTemplateProps {
  userName: string
  portfolioData: {
    ticker: string
    name: string
    shares: number
    price: number
    change: number
    value: number
  }[]
  totalValue: number
  dailyChange: number
  date: string
  summary: string
}

export const DetailedEmailTemplate: React.FC<DetailedEmailTemplateProps> = ({
  userName,
  portfolioData,
  totalValue,
  dailyChange,
  date,
  summary,
}) => {
  const changeColor = dailyChange >= 0 ? "#4ade80" : "#f87171"
  const changeSymbol = dailyChange >= 0 ? "+" : ""

  return (
    <div style={{ fontFamily: "Arial, sans-serif", maxWidth: "600px", margin: "0 auto" }}>
      <div style={{ padding: "20px", backgroundColor: "#f9fafb", borderBottom: "1px solid #e5e7eb" }}>
        <h1 style={{ margin: "0", color: "#111827", fontSize: "24px" }}>StockPulse</h1>
        <p style={{ margin: "5px 0 0", color: "#6b7280", fontSize: "14px" }}>Portfolio Update - {date}</p>
      </div>
      
      <div style={{ padding: "20px" }}>
        <h2 style={{ margin: "0 0 15px", color: "#111827", fontSize: "18px" }}>Hello {userName},</h2>
        
        <div style={{ backgroundColor: "#f9fafb", padding: "15px", borderRadius: "8px", marginBottom: "20px" }}>
          <h3 style={{ margin: "0 0 10px", fontSize: "16px", color: "#111827" }}>Portfolio Summary</h3>
          <p style={{ margin: "0 0 5px", fontSize: "14px", color: "#374151" }}>
            Total Value: <strong>${totalValue.toFixed(2)}</strong>
          </p>
          <p style={{ margin: "0", fontSize: "14px", color: "#374151" }}>
            Today's Change: <span style={{ color: changeColor }}>{changeSymbol}{dailyChange.toFixed(2)}</span>
          </p>
        </div>
        
        <div style={{ marginBottom: "20px" }}>
          <h3 style={{ margin: "0 0 10px", fontSize: "16px", color: "#111827" }}>AI Summary</h3>
          <p style={{ margin: "0", fontSize: "14px", color: "#374151", lineHeight: "1.5" }}>{summary}</p>
        </div>
        
        <div>
          <h3 style={{ margin: "0 0 10px", fontSize: "16px", color: "#111827" }}>Your Stocks</h3>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: "#f9fafb", borderBottom: "1px solid #e5e7eb" }}>
                <th style={{ padding: "10px", textAlign: "left", fontSize: "14px", color: "#6b7280" }}>Stock</th>
                <th style={{ padding: "10px", textAlign: "right", fontSize: "14px", color: "#6b7280" }}>Shares</th>
                <th style={{ padding: "10px", textAlign: "right", fontSize: "14px", color: "#6b7280" }}>Price</th>
                <th style={{ padding: "10px", textAlign: "right", fontSize: "14px", color: "#6b7280" }}>Change</th>
                <th style={{ padding: "10px", textAlign: "right", fontSize: "14px", color: "#6b7280" }}>Value</th>
              </tr>
            </thead>
            <tbody>
              {portfolioData.map((stock, index) => (
                <tr key={index} style={{ borderBottom: "1px solid #e5e7eb" }}>
                  <td style={{ padding: "10px", fontSize: "14px", color: "#111827" }}>
                    <div style={{ fontWeight: "bold" }}>{stock.ticker}</div>
                    <div style={{ fontSize: "12px", color: "#6b7280" }}>{stock.name}</div>
                  </td>
                  <td style={{ padding: "10px", textAlign: "right", fontSize: "14px", color: "#111827" }}>{stock.shares}</td>
                  <td style={{ padding: "10px", textAlign: "right", fontSize: "14px", color: "#111827" }}>${stock.price.toFixed(2)}</td>
                  <td style={{ 
                    padding: "10px", 
                    textAlign: "right", 
                    fontSize: "14px", 
                    color: stock.change >= 0 ? "#4ade80" : "#f87171" 
                  }}>
                    {stock.change >= 0 ? "+" : ""}{stock.change.toFixed(2)}%
                  </td>
                  <td style={{ padding: "10px", textAlign: "right", fontSize: "14px", color: "#111827" }}>${stock.value.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div style={{ padding: "20px", backgroundColor: "#f9fafb", borderTop: "1px solid #e5e7eb", fontSize: "12px", color: "#6b7280" }}>
        <p style={{ margin: "0 0 10px" }}>
          This email was sent according to your preferences. You can update your settings in your StockPulse account.
        </p>
        <p style={{ margin: "0" }}>© 2025 StockPulse. All rights reserved.</p>
      </div>
    </div>
  )
}
