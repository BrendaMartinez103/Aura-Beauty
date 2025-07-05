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

export async function updateCategory(id: number, nombre: string) {
  return await prisma.categoria.update({
    where: { id },
    data: { nombre },
  })
}

export async function deleteCategory(id: number) {
  return await prisma.categoria.delete({
    where: { id },
  })
}

export async function createService(
  nombre: string,
  descripcion: string,
  precio: number,
  duracion: number,
  activo: boolean,
  categoriaId: number,
  imageUrl?: string
) {
  return await prisma.servicio.create({
    data: {
      nombre,
      descripcion,
      imageUrl,
      duracion,
      precio,
      activo,
      categoriaId,
    },
  })
}

export async function updateService(
  id: number,
  data: Partial<{
    nombre: string
    descripcion: string
    precio: number
    duracion: number
    activo: boolean
    categoriaId: number
    imageUrl?: string
  }>
) {
  return await prisma.servicio.update({
    where: { id },
    data,
  })
}

export async function deleteService(id: number) {
  return await prisma.servicio.delete({
    where: { id },
  })
}

export async function getAllPedidos() {
  return await prisma.compra.findMany({
    include: {
      cliente: true,
      Detalle: true,
    },
    orderBy: { fechaHora: 'desc' },
  })
}

export async function getPedidoById(id: number) {
  return await prisma.compra.findUnique({
    where: { id },
    include: {
      cliente: true,
      Detalle: true,
    },
  })
}

export async function getAllClientes() {
  return await prisma.cliente.findMany({
    orderBy: { creadoEn: 'desc' },
  })
}

export async function deleteCliente(id: number) {
  try {
    await prisma.cliente.delete({ where: { id } })
    return true
  } catch {
    return false
  }
}
