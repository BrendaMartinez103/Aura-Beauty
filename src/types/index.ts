export interface Categoria {
  nombre: string
}

export interface Servicio {
  nombre: string
  descripcion: string
  precio: number
  duracion: number
  categoria: Categoria
}