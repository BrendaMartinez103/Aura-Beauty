import { prisma } from '@/db/client'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const sub = await req.json()

  if (!sub || !sub.endpoint) {
    return NextResponse.json({ error: 'Suscripción inválida' }, { status: 400 })
  }

  await prisma.suscripcionAnonima.create({
    data: {
      sub
    }
  })

  return NextResponse.json({ ok: true })
}
