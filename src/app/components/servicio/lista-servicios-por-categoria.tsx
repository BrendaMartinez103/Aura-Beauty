'use client'

import { Servicio } from '@/types'
import ServicioCardInteractiva from './ServicioCardInteractiva'

export default function ListaServiciosPorCategoria({ servicios }: { servicios: Servicio[] }) {
  if (servicios.length === 0) {
    return <p className="text-muted">No hay servicios disponibles para esta categoría.</p>
  }

  return (
    <div className="row g-4">
      {servicios.map((servicio) => (
        <div key={servicio.id} className="col-12 col-md-6 col-lg-4">
          <ServicioCardInteractiva servicio={servicio} />
        </div>
      ))}
    </div>
  )
}
