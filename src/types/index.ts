export interface Categoria {
  id: number
  nombre: string
}

export interface Servicio {
  nombre: string
  id: number
  descripcion: string
  imageUrl?: string
  precio: number
  duracion: number
  categoria: Categoria
}
