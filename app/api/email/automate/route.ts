import { NextResponse } from "next/server"
// Import directly from the file path
import { shouldSendEmail, prepareEmailData } from "../../../lib/email-scheduler.js"

// Mock function to get all user emails - in a real app, this would fetch from a database
async function getAllUserEmails() {
  return ["user1@example.com", "user2@example.com", "user3@example.com"]
}

export async function POST(request: Request) {
  try {
    // This endpoint would typically be called by a cron job or scheduler
    const currentTime = new Date()
    
    // Get all user emails
    const userEmails = await getAllUserEmails()
    
    // Track results
    const results = {
      total: userEmails.length,
      sent: 0,
      skipped: 0,
      failed: 0,
    }
    
    // Process each user
    for (const email of userEmails) {
      try {
        // Check if email should be sent based on user preferences
        const shouldSend = await shouldSendEmail(email, currentTime)
        
        if (shouldSend) {
          // Prepare email data
          const emailData = await prepareEmailData(email)
          
          // Send the email
          const response = await fetch("/api/email/send", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(emailData),
          })
          
          if (response.ok) {
            results.sent++
          } else {
            results.failed++
          }
        } else {
          results.skipped++
        }
      } catch (error) {
        console.error(`Error processing email for ${email}:`, error)
        results.failed++
      }
    }
    
    return NextResponse.json({ success: true, results })
  } catch (error) {
    console.error("Error automating emails:", error)
    return NextResponse.json({ error: "Failed to automate emails" }, { status: 500 })
  }
}
