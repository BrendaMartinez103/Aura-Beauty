'use client'

import { useState, useEffect } from 'react'
import { subscribeUser } from '@/lib/noticationActions'

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

export default function PushNotificationManager() {
  const [subscription, setSubscription] = useState<PushSubscription | null>(
    null
  )

  async function subscribeToPush() {
    const registration = await navigator.serviceWorker.ready
    let sub = await registration.pushManager.getSubscription()
    if (!sub) {
      sub = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
        ),
      })
      setSubscription(sub)
      const serializedSub = JSON.parse(JSON.stringify(sub))
      await subscribeUser(serializedSub)
    } else {
      setSubscription(sub)
    }
  }

  async function registerServiceWorker() {
    try {
      // Verifica si el usuario ya negó el permiso
      if (Notification.permission === 'denied') return

      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/',
        updateViaCache: 'none',
      })
      const sub = await registration.pushManager.getSubscription()
      setSubscription(sub)
    } catch (error) {
      console.warn(error)
    }
  }

  useEffect(() => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      // Solo intenta registrar si el permiso no está denegado
      if (Notification.permission !== 'denied') {
        registerServiceWorker()
        if (!subscription) {
          subscribeToPush()
        }
      }
    }
  }, [subscription])

  return null
}
