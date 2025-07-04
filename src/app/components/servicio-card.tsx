'use client'

import { Servicio } from '@/types'
import { useState } from 'react'

interface Props {
  servicio: Servicio
  onClick?: () => void
}

export default function ServicioCard({ servicio, onClick }: Props) {
  const [hover, setHover] = useState(false)

  return (
    <div
      className={`card shadow-sm border-0 h-100 ${hover ? 'bg-light' : ''}`}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      <div className="card-body">
        <h5 className="card-title fw-semibold text-purple">{servicio.nombre}</h5>
        <p className="card-text text-muted">{servicio.descripcion}</p>
        <p className="mb-0">
          <strong>${servicio.precio}</strong> · {servicio.duracion} minutos
        </p>
      </div>
    </div>
  )
}
