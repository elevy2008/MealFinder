"use client"

import React, { useState, useEffect } from "react"
import { Clock, Bell, Mail } from "lucide-react"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Label } from "../ui/label"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Switch } from "../ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { toast } from "../ui/use-toast"

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
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold tracking-tight">Settings</h3>
        <p className="text-muted-foreground">Manage your account settings and email preferences.</p>
      </div>
      <Tabs defaultValue="email" className="space-y-4">
        <TabsList>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        <TabsContent value="email" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Email Preferences</CardTitle>
              <CardDescription>Configure when and how often you receive portfolio updates.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Update Frequency</Label>
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
                      <Clock className="mb-3 h-6 w-6" />
                      <span className="text-sm font-medium">Daily</span>
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="multiple" id="multiple" className="peer sr-only" />
                    <Label
                      htmlFor="multiple"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <Bell className="mb-3 h-6 w-6" />
                      <span className="text-sm font-medium">Multiple</span>
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="weekly" id="weekly" className="peer sr-only" />
                    <Label
                      htmlFor="weekly"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <Mail className="mb-3 h-6 w-6" />
                      <span className="text-sm font-medium">Weekly</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-4">
                <Label>Email Timing</Label>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="morning" className="flex items-center gap-2">
                      <span>Morning Update (9:00 AM)</span>
                      {preferences.frequency === "multiple" && (
                        <span className="text-xs text-muted-foreground">Premium</span>
                      )}
                    </Label>
                    <Switch
                      id="morning"
                      checked={preferences.morning}
                      onCheckedChange={(checked) => setPreferences({ ...preferences, morning: checked })}
                      disabled={preferences.frequency === "weekly"}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="midday" className="flex items-center gap-2">
                      <span>Midday Update (12:00 PM)</span>
                      <span className="text-xs text-muted-foreground">Premium</span>
                    </Label>
                    <Switch
                      id="midday"
                      checked={preferences.midday}
                      onCheckedChange={(checked) => setPreferences({ ...preferences, midday: checked })}
                      disabled={preferences.frequency !== "multiple"}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="evening" className="flex items-center gap-2">
                      <span>Evening Update (5:00 PM)</span>
                      {preferences.frequency === "multiple" && (
                        <span className="text-xs text-muted-foreground">Premium</span>
                      )}
                    </Label>
                    <Switch
                      id="evening"
                      checked={preferences.evening}
                      onCheckedChange={(checked) => setPreferences({ ...preferences, evening: checked })}
                      disabled={preferences.frequency === "weekly"}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="weekends" className="flex items-center gap-2">
                      <span>Weekend Updates</span>
                      <span className="text-xs text-muted-foreground">Premium</span>
                    </Label>
                    <Switch
                      id="weekends"
                      checked={preferences.weekends}
                      onCheckedChange={(checked) => setPreferences({ ...preferences, weekends: checked })}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Email Format</Label>
                <Select
                  value={preferences.format}
                  onValueChange={(value) =>
                    setPreferences({ ...preferences, format: value as "detailed" | "summary" | "minimal" })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="detailed">Detailed (with charts)</SelectItem>
                    <SelectItem value="summary">Summary (text only)</SelectItem>
                    <SelectItem value="minimal">Minimal (just numbers)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} disabled={saving}>
                {saving ? "Saving..." : "Save Email Preferences"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>Update your account details.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Account settings will be implemented in a future update.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Configure when you receive notifications.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Notification settings will be implemented in a future update.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
