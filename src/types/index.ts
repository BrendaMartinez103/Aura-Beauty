export interface Categoria {
  nombre: string
}

export interface Servicio {
  id: number  
  nombre: string
  descripcion: string
  precio: number
  duracion: number
  categoria: Categoria
}