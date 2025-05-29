import { NextResponse } from 'next/server';
import { prisma } from '@/db/client';

export async function GET(request: Request) {
  const users = await prisma.usuario.findMany();
  return NextResponse.json(users);
}
export async function POST(request: Request) {
  const body = await request.json();

  const newProduct = await prisma.product.create({
    data: body,
  });

  return NextResponse.json(newProduct, { status: 201 });
}