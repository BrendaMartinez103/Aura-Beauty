'use server'
import { MercadoPagoConfig, Preference } from 'mercadopago'
import { PreferenceResponse } from 'mercadopago/dist/clients/preference/commonTypes'

const ACCESS_TOKEN = process.env.MERCADOPAGO_ACCESS_TOKEN || 'token' // Ensure to set this in your environment variables
const BACK_URL = process.env.MERCADOPAGO_BACK_URL || 'http://localhost:3000'

export const initializeMercadoPago = async () => {
  return new MercadoPagoConfig({ accessToken: ACCESS_TOKEN })
}

export const createPreference = async (
  client: MercadoPagoConfig,
  items: { id: string; title: string; quantity: number; unit_price: number }[]
): Promise<PreferenceResponse | null> => {
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
    console.log('Preference created successfully:', response)
    return response
  } catch (error) {
    console.log(error)
    return null
  }
}

export const getPaymentStatus = async () => {}
