import { prisma } from '@/db/client'
import webpush from 'web-push'
import { NextResponse } from 'next/server'

webpush.setVapidDetails(
  'mailto:admin@aurabeauty.com',
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
)

export async function POST(req: Request) {
  const { title, body } = await req.json()

  const subs = await prisma.suscripcionAnonima.findMany()

  for (const { sub } of subs) {
    if (sub) {
      try {
        const parsedSub = typeof sub === 'string' ? JSON.parse(sub) : sub
        await webpush.sendNotification(
          parsedSub as webpush.PushSubscription,
          JSON.stringify({ title, body })
        )
      } catch (err) {
        console.error('Error enviando notificación:', err)
      }
    } else {
      console.warn('Suscripción nula o inválida encontrada, se omite.')
    }
  }

  return NextResponse.json({ ok: true })
}
