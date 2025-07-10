import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/db/client'
import bcrypt from 'bcryptjs'
import { z } from 'zod'

const RegistroSchema = z.object({
  nombre: z.string().min(1),
  documento: z.string().min(1),
  telefono: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(4),
})

/* Maneja el registro de nuevos clientes */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = RegistroSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: 'Datos inválidos',
          detalles: parsed.error.errors,
        },
        { status: 400 }
      )
    }
    const { nombre, documento, telefono, email, password } = parsed.data

    const existe = await prisma.cliente.findFirst({
      where: {
        OR: [{ email }, { documento }],
      },
    })

    if (existe) {
      return NextResponse.json(
        { error: 'Ya existe un usuario con ese email o documento' },
        { status: 409 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const nuevoCliente = await prisma.cliente.create({
      data: {
        nombre,
        documento,
        telefono,
        email,
        password: hashedPassword,
      },
    })

    return NextResponse.json(
      { message: 'Registro exitoso', cliente: nuevoCliente },
      { status: 201 }
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 })
  }
}
