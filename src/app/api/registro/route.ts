
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/db/client';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  try {
    const { nombre, documento, telefono, email, password } = await req.json();

    if (!nombre || !documento || !telefono || !email || !password) {
      return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
    }

    const existe = await prisma.cliente.findFirst({
      where: {
        OR: [{ email }, { documento }],
      },
    });

    if (existe) {
      return NextResponse.json({ error: 'Ya existe un usuario con ese email o documento' }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const nuevoCliente = await prisma.cliente.create({
      data: {
        nombre,
        documento,
        telefono,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ message: 'Registro exitoso', cliente: nuevoCliente }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 });
  }
}
