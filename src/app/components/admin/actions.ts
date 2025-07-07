"use server"
import { getPedidosGroupedByServiceCategory } from '@/lib/data'

export async function getCategoriasPieData() {
  // Devuelve el objeto { categoria: cantidad }
  return await getPedidosGroupedByServiceCategory()
}
