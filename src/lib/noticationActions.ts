'use server'

import webpush from 'web-push'
import type { PushSubscription } from 'web-push'
import { prisma } from '@/db/client'

webpush.setVapidDetails(
  'https://aura-beauty-three.vercel.app/',
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
)

export async function subscribeUser(sub: PushSubscription) {
  // Guarda la suscripción en la base de datos
  await prisma.suscripcionAnonima.create({
    data: { sub: JSON.stringify(sub) },
  })
  return { success: true }
}

export async function sendNotification(title: string, message: string) {
  // Recupera todos los suscriptores de la base de datos
  const suscripciones = await prisma.suscripcionAnonima.findMany()
  if (!suscripciones.length) {
    return { success: false, error: 'No hay suscriptores registrados' }
  }
  let successCount = 0
  let failCount = 0
  for (const s of suscripciones) {
    try {
      const sub = typeof s.sub === 'string' ? JSON.parse(s.sub) : s.sub
      await webpush.sendNotification(
        sub,
        JSON.stringify({
          title: title,
          body: message,
          icon: '/icon.png',
        })
      )
      successCount++
    } catch {
      failCount++
    }
  }
  return { success: true, enviados: successCount, fallidos: failCount }
}
