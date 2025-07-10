'use server'
import { MercadoPagoConfig, Preference } from 'mercadopago'
import { PreferenceResponse } from 'mercadopago/dist/clients/preference/commonTypes'
import { z } from 'zod'

const ACCESS_TOKEN = process.env.MERCADOPAGO_ACCESS_TOKEN || 'token' // Ensure to set this in your environment variables
const BACK_URL = process.env.MERCADOPAGO_BACK_URL || 'http://localhost:3000'

const ItemSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  quantity: z.number().int().positive(),
  unit_price: z.number().positive(),
})

export const initializeMercadoPago = async () => {
  return new MercadoPagoConfig({ accessToken: ACCESS_TOKEN })
}

export const createPreference = async (
  client: MercadoPagoConfig,
  items: { id: string; title: string; quantity: number; unit_price: number }[]
): Promise<PreferenceResponse> => {
  // Validación de items
  const parsed = z.array(ItemSchema).safeParse(items)
  if (!parsed.success) {
    const error = new Error('Error de validación en items de MercadoPago')
    error.message = JSON.stringify(parsed.error.errors)
    throw error
  }
  const preference = new Preference(client)
  try {
    const response = await preference.create({
      body: {
        items: items,
        back_urls: {
          success: `${BACK_URL}/success`,
          failure: `${BACK_URL}/failure`,
        },
        auto_return: 'approved',
      },
    })
    return response
  } catch (error) {
    throw new Error(
      'Error al crear preferencia en MercadoPago: ' +
        (error instanceof Error ? error.message : String(error))
    )
  }
}
