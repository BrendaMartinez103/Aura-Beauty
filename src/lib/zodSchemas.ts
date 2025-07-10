import { z } from 'zod'

export const AdministradorSchema = z.object({
  id: z.number().int().optional(),
  nombre: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(4),
  creadoEn: z.date().optional(),
})

export const ClienteSchema = z.object({
  id: z.number().int().optional(),
  documento: z.string().min(1),
  nombre: z.string().min(1),
  telefono: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(4),
  creadoEn: z.date().optional(),
})

export const ServicioSchema = z.object({
  id: z.number().int().optional(),
  nombre: z.string().min(1),
  descripcion: z.string().min(1),
  imageUrl: z.string().optional(),
  precio: z.number().nonnegative(),
  duracion: z.number().int().positive(),
  activo: z.boolean().optional(),
  categoriaId: z.number().int(),
})

export const CategoriaSchema = z.object({
  id: z.number().int().optional(),
  nombre: z.string().min(1),
})

export const CarritoSchema = z.object({
  clienteId: z.number().int(),
  servicioId: z.number().int(),
  cantidad: z.number().int().positive(),
  fechaHora: z.date(),
  creadoEn: z.date().optional(),
})

export const DetalleSchema = z.object({
  id: z.number().int().optional(),
  nombre: z.string().min(1),
  descripcion: z.string().min(1),
  imageUrl: z.string().optional(),
  precio: z.number().nonnegative(),
  duracion: z.number().int().positive(),
  cantidad: z.number().int().positive(),
  categoria: z.string().min(1),
  compraId: z.number().int(),
})

export const CompraSchema = z.object({
  id: z.number().int().optional(),
  clienteId: z.number().int(),
  total: z.number().nonnegative(),
  fechaHora: z.date().optional(),
  creadoEn: z.date().optional(),
  mp_transaction_id: z.string().min(1),
})

export const SuscripcionAnonimaSchema = z.object({
  id: z.number().int().optional(),
  createdAt: z.date().optional(),
  sub: z.any(),
})
