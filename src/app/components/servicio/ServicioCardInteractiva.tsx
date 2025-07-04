'use client'

import { Servicio } from '@/types'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function ServicioCardInteractiva({ servicio }: { servicio: Servicio }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const agregarAlCarrito = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/carrito', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ servicioId: servicio.id, cantidad: 1 }),
      })
      if (res.ok) {
        router.push('/carrito')
      } else {
        const data = await res.json()
        alert(data.error || 'Error al agregar al carrito')
      }
    } /*catch (error) {
      alert('Error inesperado')
    } */finally {
      setLoading(false)
    }
  }

  return (
    <div className="card shadow-sm h-100">
      <div className="card-body">
        <h5 className="card-title fw-bold text-purple">{servicio.nombre}</h5>
        <p className="card-text text-muted">{servicio.descripcion}</p>
        <p><strong>${servicio.precio}</strong> · {servicio.duracion} minutos</p>
        <button
          onClick={agregarAlCarrito}
          className="btn btn-sm btn-outline-primary mt-2"
          disabled={loading}
        >
          🛒 Agregar al carrito
        </button>
      </div>
    </div>
  )
}
