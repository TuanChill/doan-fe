"use client"

import type React from "react"

import { useEffect, useState } from "react"

const TOAST_LIMIT = 5
const TOAST_REMOVE_DELAY = 5000

type ToastActionElement = React.ReactElement

export type Toast = {
  id: string
  title?: string
  description?: string
  action?: ToastActionElement
  variant?: "default" | "destructive"
}

let count = 0

function generateId() {
  return `${count++}`
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])

  function toast({ title, description, action, variant }: Omit<Toast, "id">) {
    const id = generateId()

    setToasts((toasts) => {
      const newToasts = [...toasts, { id, title, description, action, variant }]
      return newToasts.slice(-TOAST_LIMIT)
    })

    return {
      id,
      dismiss: () => dismiss(id),
      update: (props: Omit<Toast, "id">) => update(id, props),
    }
  }

  function dismiss(id: string) {
    setToasts((toasts) => toasts.filter((toast) => toast.id !== id))
  }

  function update(id: string, props: Omit<Toast, "id">) {
    setToasts((toasts) => toasts.map((toast) => (toast.id === id ? { ...toast, ...props } : toast)))
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setToasts((toasts) => toasts.slice(1))
    }, TOAST_REMOVE_DELAY)

    return () => clearTimeout(timer)
  }, [toasts])

  return {
    toasts,
    toast,
    dismiss,
    update,
  }
}

