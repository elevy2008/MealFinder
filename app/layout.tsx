import "../styles/globals.css"

export const metadata = {
  title: 'Email Automizer and Summarizer',
  description: 'A Next.js application for email automation and summarization',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
