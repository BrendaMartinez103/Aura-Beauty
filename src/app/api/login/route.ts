import { prisma } from "@/db/client"
import bcrypt from "bcryptjs"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const { email, password } = await req.json()

  const usuario = await prisma.cliente.findUnique({ where: { email } })

  if (!usuario) {
    return NextResponse.json({ error: "Usuario no encontrado" }, { status: 401 })
  }

  const match = await bcrypt.compare(password, usuario.password)

  if (!match) {
    return NextResponse.json({ error: "Credenciales inválidas" }, { status: 401 })
  }

  // Aquí podrías devolver un token, cookie o redirigir
  return NextResponse.json({ message: "Login correcto", usuario })
}
