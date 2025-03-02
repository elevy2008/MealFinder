import React from "react"

interface MinimalEmailTemplateProps {
  userName: string
  totalValue: number
  dailyChange: number
  date: string
}

export const MinimalEmailTemplate: React.FC<MinimalEmailTemplateProps> = ({
  userName,
  totalValue,
  dailyChange,
  date,
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
