export interface Categoria {
  id: number
  nombre: string
}

export interface Servicio {
  id: number  
  nombre: string
  id: number
  descripcion: string
  imageUrl?: string
  precio: number
  duracion: number
  categoria: Categoria
}
export interface CategoryCardData {
  id: number
  name: string
  serviceCount: number
}
export interface ServiceCardData {
  id: number
  nombre: string
  descripcion: string
  imageUrl?: string
  precio: number
  duracion: number
  activo: boolean
}
