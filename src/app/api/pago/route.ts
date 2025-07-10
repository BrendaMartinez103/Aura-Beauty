import { NextRequest, NextResponse } from 'next/server'
import { createPreference, initializeMercadoPago } from '@/services/mercadopago'

/* Maneja la creación de una preferencia de pago con Mercado Pago. */
export async function POST(req: NextRequest) {
  try {
    const { items } = await req.json()
    if (!items || !Array.isArray(items)) {
      return NextResponse.json({ error: 'Items inválidos' }, { status: 400 })
    }
    const client = await initializeMercadoPago()
    const response = await createPreference(client, items)
    if (response && response.sandbox_init_point) {
      return NextResponse.json({ init_point: response.sandbox_init_point })
    } else {
      return NextResponse.json(
        { error: 'No se pudo crear la preferencia' },
        { status: 500 }
      )
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}
