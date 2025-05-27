import { NextResponse } from 'next/server';
import { prisma } from '@/db/client';

export async function GET(request) {
    const products = await prisma.product.findMany();
    return NextResponse.json(products);
}

export async function POST(request) {
    const body = await request.json();
    const newProduct = await prisma.product.create({
        data: body,
    });
    return NextResponse.json(newProduct, { status: 201 });
}