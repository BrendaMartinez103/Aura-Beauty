import { prisma } from '@/db/client'
import bcrypt from 'bcryptjs'
import { NextRequest, NextResponse } from 'next/server'

/* Maneja el login de clientes y administradores */
export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()

    // Busca primero en administradores
    const admin = await prisma.administrador.findUnique({ where: { email } })
    if (admin) {
      const valid = await bcrypt.compare(password, admin.password)
      if (!valid) {
        return NextResponse.json(
          { error: 'Credenciales inválidas' },
          { status: 401 }
        )
      }

      return NextResponse.json({
        message: 'Login correcto',
        usuario: {
          id: admin.id,
          email: admin.email,
          rol: 'admin',
        },
      })
    }

    // Si no es administrador, busca en clientes
    const cliente = await prisma.cliente.findUnique({ where: { email } })
    if (!cliente) {
      return NextResponse.json(
        { error: 'Usuario no encontrado' },
        { status: 401 }
      )
    }

    const valid = await bcrypt.compare(password, cliente.password)
    if (!valid) {
      return NextResponse.json(
        { error: 'Credenciales inválidas' },
        { status: 401 }
      )
    }

    return NextResponse.json({
      message: 'Login correcto',
      cliente: {
        id: cliente.id,
        email: cliente.email,
        rol: 'cliente',
      },
    })
  } catch (error) {
    console.error('Error en login:', error)
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 })
  }
}
