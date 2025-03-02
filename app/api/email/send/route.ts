import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { renderEmailTemplate, EmailFormat } from "../../../lib/email-renderer"

// Configure nodemailer with the environment variables
const transporter = nodemailer.createTransport({
  service: "gmail", // Assuming you're using Gmail. Adjust if using a different service.
  auth: {
    user: process.env.EMAIL_USER || "test@example.com",
    pass: process.env.EMAIL_PASS || "password",
  },
})

export async function POST(request: Request) {
  try {
    const { to, subject, emailData, format = "detailed" } = await request.json()

    if (!to) {
      return NextResponse.json({ error: "Recipient email is required" }, { status: 400 })
    }

    if (!emailData) {
      return NextResponse.json({ error: "Email data is required" }, { status: 400 })
    }

    // Render the email template based on the format
    const htmlContent = renderEmailTemplate(format as EmailFormat, emailData)

    const mailOptions = {
      from: process.env.EMAIL_USER || "test@example.com",
      to: to,
      subject: subject || "Your StockPulse Portfolio Update",
      html: htmlContent,
    }

    await transporter.sendMail(mailOptions)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error sending email:", error)
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
  }
}
