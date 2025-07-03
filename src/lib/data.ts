'use server'

import { prisma } from '@/db/client'

export async function getAllCategories() {
  return await prisma.categoria.findMany()
}

export async function getAllServices() {
  return await prisma.servicio.findMany()
}

export async function getServiceByCategoryId(categoryId: number) {
  return await prisma.servicio.findMany({
    where: { categoriaId: categoryId },
  })
}

export async function getCountServicesByCategoryId(categoryId: number) {
  const count = await prisma.servicio.count({
    where: { categoriaId: categoryId },
  })
  return count
}

export async function createCategory(nombre: string) {
  return await prisma.categoria.create({
    data: { nombre },
  })
}
