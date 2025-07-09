'use client'

import { useEffect } from 'react'

export default function PushManagerProvider() {
  useEffect(() => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      navigator.serviceWorker.register('/sw.js').then(async (reg) => {
        const permission = await Notification.requestPermission()
        if (permission === 'granted') {
          const sub = await reg.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY
              ? Uint8Array.from(
                  atob(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY),
                  (c) => c.charCodeAt(0)
                )
              : undefined,
          })

          await fetch('/api/notificar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(sub),
          })
        }
      })
    }
  }, [])
  return null
}
