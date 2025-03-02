"use client"

import React, { useState, useEffect } from "react"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { Checkbox } from "../../components/ui/checkbox"
import { Label } from "../../components/ui/label"
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { toast } from "../../components/ui/use-toast"

interface EmailPreference {
  id: string
  userId: string
  frequency: "daily" | "multiple" | "weekly"
  morning: boolean
  midday: boolean
  evening: boolean
  weekends: boolean
  format: "detailed" | "summary" | "minimal"
}

export function EmailSettings({ userId }: { userId: string }) {
  const [preferences, setPreferences] = useState<EmailPreference | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    // Fetch user's email preferences
    const fetchPreferences = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/user/email-preferences?userId=${userId}`)
        if (response.ok) {
          const data = await response.json()
          setPreferences(data)
        } else {
          toast({
            title: "Error",
            description: "Failed to load email preferences",
            variant: "destructive",
          })
        }
      } catch (error) {
        console.error("Error fetching email preferences:", error)
        toast({
          title: "Error",
          description: "Failed to load email preferences",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchPreferences()
  }, [userId])

  const handleSave = async () => {
    if (!preferences) return

    try {
      setSaving(true)
      const response = await fetch("/api/user/email-preferences", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(preferences),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Email preferences saved successfully",
        })
      } else {
        toast({
          title: "Error",
          description: "Failed to save email preferences",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error saving email preferences:", error)
      toast({
        title: "Error",
        description: "Failed to save email preferences",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Email Settings</CardTitle>
          <CardDescription>Loading your email preferences...</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  if (!preferences) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Email Settings</CardTitle>
          <CardDescription>No email preferences found</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Email Settings</CardTitle>
        <CardDescription>Configure how and when you receive portfolio updates</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Email Frequency</h3>
          <RadioGroup
            value={preferences.frequency}
            onValueChange={(value) =>
              setPreferences({ ...preferences, frequency: value as "daily" | "multiple" | "weekly" })
            }
            className="grid grid-cols-3 gap-4"
          >
            <div>
              <RadioGroupItem value="daily" id="daily" className="peer sr-only" />
              <Label
                htmlFor="daily"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <span>Daily</span>
              </Label>
            </div>
            <div>
              <RadioGroupItem value="multiple" id="multiple" className="peer sr-only" />
              <Label
                htmlFor="multiple"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <span>Multiple</span>
              </Label>
            </div>
            <div>
              <RadioGroupItem value="weekly" id="weekly" className="peer sr-only" />
              <Label
                htmlFor="weekly"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <span>Weekly</span>
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-medium">Email Format</h3>
          <RadioGroup
            value={preferences.format}
            onValueChange={(value) =>
              setPreferences({ ...preferences, format: value as "detailed" | "summary" | "minimal" })
            }
            className="grid grid-cols-3 gap-4"
          >
            <div>
              <RadioGroupItem value="detailed" id="detailed" className="peer sr-only" />
              <Label
                htmlFor="detailed"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <span>Detailed</span>
              </Label>
            </div>
            <div>
              <RadioGroupItem value="summary" id="summary" className="peer sr-only" />
              <Label
                htmlFor="summary"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <span>Summary</span>
              </Label>
            </div>
            <div>
              <RadioGroupItem value="minimal" id="minimal" className="peer sr-only" />
              <Label
                htmlFor="minimal"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <span>Minimal</span>
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-medium">Time of Day</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="morning"
                checked={preferences.morning}
                onCheckedChange={(checked) =>
                  setPreferences({ ...preferences, morning: checked === true })
                }
              />
              <Label htmlFor="morning">Morning (9 AM)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="midday"
                checked={preferences.midday}
                onCheckedChange={(checked) =>
                  setPreferences({ ...preferences, midday: checked === true })
                }
              />
              <Label htmlFor="midday">Midday (12 PM)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="evening"
                checked={preferences.evening}
                onCheckedChange={(checked) =>
                  setPreferences({ ...preferences, evening: checked === true })
                }
              />
              <Label htmlFor="evening">Evening (5 PM)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="weekends"
                checked={preferences.weekends}
                onCheckedChange={(checked) =>
                  setPreferences({ ...preferences, weekends: checked === true })
                }
              />
              <Label htmlFor="weekends">Include Weekends</Label>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </CardFooter>
    </Card>
  )
}
