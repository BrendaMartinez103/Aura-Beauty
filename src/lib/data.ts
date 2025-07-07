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

// Cantidad total de pedidos
export async function getPedidosTotalCount() {
  return await prisma.compra.count()
}

// Cantidad de pedidos en los últimos 7 días
export async function getPedidosCountLastWeek() {
  const hace7dias = new Date()
  hace7dias.setDate(hace7dias.getDate() - 7)
  return await prisma.compra.count({
    where: {
      fechaHora: {
        gte: hace7dias,
      },
    },
  })
}

// Cantidad de pedidos por día (últimos 30 días)
export async function getPedidosGroupedByDate() {
  const hace30dias = new Date()
  hace30dias.setDate(hace30dias.getDate() - 30)
  const pedidos = await prisma.compra.findMany({
    where: {
      fechaHora: {
        gte: hace30dias,
      },
    },
    select: {
      fechaHora: true,
    },
  })
  // Agrupa por fecha (YYYY-MM-DD)
  const conteo: Record<string, number> = {}
  pedidos.forEach((p) => {
    const fecha = p.fechaHora.toISOString().slice(0, 10)
    conteo[fecha] = (conteo[fecha] || 0) + 1
  })
  return conteo
}

// Cantidad de pedidos por categoría de servicio (para gráfico de torta)
export async function getPedidosGroupedByServiceCategory() {
  // Une Compra -> Detalle -> categoria
  const detalles = await prisma.detalle.findMany({
    select: {
      categoria: true,
      cantidad: true,
    },
  })
  const conteo: Record<string, number> = {}
  detalles.forEach((d) => {
    conteo[d.categoria] = (conteo[d.categoria] || 0) + d.cantidad
  })
  return conteo
}

// Cantidad de servicios por categoría (para gráfico de torta)
export async function getServiciosCountByCategory() {
  const categorias = await prisma.categoria.findMany({
    include: {
      Servicio: true,
    },
  })
  const conteo: Record<string, number> = {}
  categorias.forEach((cat) => {
    conteo[cat.nombre] = cat.Servicio.length
  })
  return conteo
}
