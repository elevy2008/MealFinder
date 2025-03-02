import ReactDOMServer from "react-dom/server"
import { DetailedEmailTemplate } from "@/components/email/detailed-template"
import { SummaryEmailTemplate } from "@/components/email/summary-template"
import { MinimalEmailTemplate } from "@/components/email/minimal-template"

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

export function renderEmailTemplate(format: EmailFormat, data: EmailData): string {
  switch (format) {
    case "detailed":
      return ReactDOMServer.renderToStaticMarkup(
        DetailedEmailTemplate({
          ...data,
          summary: data.summary || "No summary available.",
        })
      )
    case "summary":
      return ReactDOMServer.renderToStaticMarkup(
        SummaryEmailTemplate({
          ...data,
          summary: data.summary || "No summary available.",
        })
      )
    case "minimal":
      return ReactDOMServer.renderToStaticMarkup(
        MinimalEmailTemplate({
          userName: data.userName,
          totalValue: data.totalValue,
          dailyChange: data.dailyChange,
          date: data.date,
        })
      )
    default:
      return ReactDOMServer.renderToStaticMarkup(
        DetailedEmailTemplate({
          ...data,
          summary: data.summary || "No summary available.",
        })
      )
  }
}
