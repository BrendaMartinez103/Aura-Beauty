'use client'

import type React from 'react'
import type { Metadata } from 'next'
import './globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { SessionProvider } from 'next-auth/react'
import { useEffect } from 'react'

export const metadata: Metadata = {
  title: 'Aura Beauty - Más que belleza, armonía',
  description:
    'Salón de belleza y estética con servicios de pestañas, masajes, manicura y estilismo',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  useEffect(() => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      navigator.serviceWorker.register('/sw.js').then(async (reg) => {
        const permission = await Notification.requestPermission()
        if (permission === 'granted') {
          const sub = await reg.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY
              ? Uint8Array.from(atob(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY), c => c.charCodeAt(0))
              : undefined
          })

          await fetch('/api/subscribe-anon', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(sub)
          })
        }
      })
    }
  }, [])
  return (
    <html lang="es">
      <body>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  )
}
