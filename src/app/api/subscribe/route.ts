
import { NextResponse } from 'next/server'
import { auth } from '@/lib/authOptions'
import { prisma } from '@/db/client'

export async function POST(req: Request) {
  const session = await auth()
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const body = await req.json()

  await prisma.cliente.update({
    where: { email: session.user.email },
    data: { pushSub: body } // asumimos que agregaste un campo tipo Json al modelo Cliente
  })

  return NextResponse.json({ ok: true })
}
