"use client"

import * as React from "react"

export interface ToastProps {
  title?: string
  description?: string
  variant?: "default" | "destructive"
}

export function toast(props: ToastProps) {
  // In a real implementation, this would show a toast notification
  console.log("Toast:", props)
  return {
    dismiss: () => {},
  }
}
