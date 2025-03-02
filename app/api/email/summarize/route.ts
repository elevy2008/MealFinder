import { NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(request: Request) {
  try {
    const { portfolioData } = await request.json()

    if (!portfolioData) {
      return NextResponse.json({ error: "Portfolio data is required" }, { status: 400 })
    }

    // Format portfolio data for the prompt
    const portfolioInfo = portfolioData
      .map(
        (stock: any) =>
          `${stock.ticker} (${stock.name}): ${stock.shares} shares at $${stock.price.toFixed(2)}, ${stock.change >= 0 ? "+" : ""}${stock.change.toFixed(2)}%, total value: $${stock.value.toFixed(2)}`,
      )
      .join("\n")

    const totalValue = portfolioData.reduce((sum: number, stock: any) => sum + stock.value, 0).toFixed(2)
    const dailyChange = portfolioData.reduce((sum: number, stock: any) => sum + stock.change * stock.value / 100, 0).toFixed(2)

    const prompt = `
      Generate a concise summary of the following stock portfolio:
      
      Portfolio information:
      ${portfolioInfo}
      
      Total portfolio value: $${totalValue}
      Today's change: $${dailyChange}
      
      Current date: ${new Date().toLocaleDateString()}
      
      Provide a brief analysis of the portfolio's performance, highlighting top performers and underperformers.
      Keep the summary under 150 words and focus on actionable insights.
      Do not include any disclaimers or introductions like "Here's a summary" - just provide the analysis directly.
    `

    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: prompt,
    })

    return NextResponse.json({ summary: text })
  } catch (error) {
    console.error("Error generating summary:", error)
    return NextResponse.json({ error: "Failed to generate summary" }, { status: 500 })
  }
}
