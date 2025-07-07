import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/db/client'
import { auth } from '@/lib/auth'

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const { servicioId, cantidad } = await req.json()
  if (!servicioId || !cantidad) {
    return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 })
  }

  const cliente = await prisma.cliente.findUnique({
    where: { email: session.user.email },
  })
  if (!cliente) {
    return NextResponse.json(
      { error: 'Cliente no encontrado' },
      { status: 404 }
    )
  }

  const ahora = new Date()

  const existente = await prisma.carrito.findFirst({
    where: {
      clienteId: cliente.id,
      servicioId,
    },
    orderBy: {
      fechaHora: 'desc',
    },
  })

  if (existente) {
    await prisma.carrito.update({
      where: {
        clienteId_servicioId_fechaHora: {
          clienteId: cliente.id,
          servicioId,
          fechaHora: existente.fechaHora,
        },
      },
      data: {
        cantidad: existente.cantidad + cantidad,
      },
    })
  } else {
    await prisma.carrito.create({
      data: {
        clienteId: cliente.id,
        servicioId,
        cantidad,
        fechaHora: ahora,
      },
    })
  }

  return NextResponse.json({ ok: true })
}

export async function GET() {
  const session = await auth()
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const cliente = await prisma.cliente.findUnique({
    where: { email: session.user.email },
    include: {
      Carritos: {
        include: {
          servicio: {
            include: {
              categoria: true,
            },
          },
        },
      },
    },
  })

  if (!cliente) {
    return NextResponse.json(
      { error: 'Cliente no encontrado' },
      { status: 404 }
    )
  }

  const items = cliente.Carritos.map((item) => ({
    servicioId: item.servicioId,
    nombre: item.servicio.nombre,
    precio: item.servicio.precio,
    cantidad: item.cantidad,
    imageUrl: item.servicio.imageUrl,
  }))

  return NextResponse.json(items)
}

export async function DELETE(req: NextRequest) {
  const session = await auth()
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const { servicioId } = await req.json()
  if (!servicioId) {
    return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 })
  }

  const cliente = await prisma.cliente.findUnique({
    where: { email: session.user.email },
  })

  if (!cliente) {
    return NextResponse.json(
      { error: 'Cliente no encontrado' },
      { status: 404 }
    )
  }

  await prisma.carrito.deleteMany({
    where: {
      clienteId: cliente.id,
      servicioId,
    },
  })

  return NextResponse.json({ ok: true })
}
export async function PATCH(req: NextRequest) {
  const session = await auth()
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const { servicioId, cantidad } = await req.json()
  if (!servicioId || cantidad == null) {
    return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 })
  }

  const cliente = await prisma.cliente.findUnique({
    where: { email: session.user.email },
  })

  if (!cliente) {
    return NextResponse.json(
      { error: 'Cliente no encontrado' },
      { status: 404 }
    )
  }

  const existente = await prisma.carrito.findFirst({
    where: {
      clienteId: cliente.id,
      servicioId,
    },
    orderBy: {
      fechaHora: 'desc',
    },
  })

  if (!existente) {
    return NextResponse.json(
      { error: 'Elemento no encontrado' },
      { status: 404 }
    )
  }

  if (cantidad <= 0) {
    // Si la cantidad nueva es 0 o menor, eliminamos el ítem
    await prisma.carrito.delete({
      where: {
        clienteId_servicioId_fechaHora: {
          clienteId: cliente.id,
          servicioId,
          fechaHora: existente.fechaHora,
        },
      },
    })
  } else {
    // Si es válida, actualizamos
    await prisma.carrito.update({
      where: {
        clienteId_servicioId_fechaHora: {
          clienteId: cliente.id,
          servicioId,
          fechaHora: existente.fechaHora,
        },
      },
      data: {
        cantidad: cantidad,
      },
    })
  }

  return NextResponse.json({ ok: true })
}
