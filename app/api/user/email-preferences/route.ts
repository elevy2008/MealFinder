import { NextResponse } from "next/server"
import { getEmailPreferenceByUserId, updateEmailPreference } from "../../../lib/db"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    const preferences = await getEmailPreferenceByUserId(userId)

    if (!preferences) {
      return NextResponse.json({ error: "Email preferences not found" }, { status: 404 })
    }

    return NextResponse.json(preferences)
  } catch (error) {
    console.error("Error fetching email preferences:", error)
    return NextResponse.json({ error: "Failed to fetch email preferences" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json()

    if (!data.id || !data.userId) {
      return NextResponse.json({ error: "Invalid email preference data" }, { status: 400 })
    }

    const updatedPreferences = await updateEmailPreference(data.id, {
      frequency: data.frequency,
      morning: data.morning,
      midday: data.midday,
      evening: data.evening,
      weekends: data.weekends,
      format: data.format,
    })

    if (!updatedPreferences) {
      return NextResponse.json({ error: "Email preferences not found" }, { status: 404 })
    }

    return NextResponse.json(updatedPreferences)
  } catch (error) {
    console.error("Error updating email preferences:", error)
    return NextResponse.json({ error: "Failed to update email preferences" }, { status: 500 })
  }
}
