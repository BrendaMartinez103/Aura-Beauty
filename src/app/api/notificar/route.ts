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
    try {
      await webpush.sendNotification(sub, JSON.stringify({ title, body }))
    } catch (err) {
      console.error('Error enviando notificación:', err)
    }
  }

  return NextResponse.json({ ok: true })
}
