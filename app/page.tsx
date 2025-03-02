"use client"

import React from "react"
import { EmailSettings } from "../components/email/email-settings"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8">Email Automizer and Summarizer</h1>
        <div className="mb-8">
          <p className="mb-4">
            This is a test page to verify that the email automizer and summarizer components are working correctly.
          </p>
        </div>
        <div className="mb-8">
          <EmailSettings userId="user123" />
        </div>
      </div>
    </main>
  )
}
