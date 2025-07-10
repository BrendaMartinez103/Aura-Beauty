'use client'

import { Servicio } from '@/types'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function ServicioUI({ servicio }: { servicio: Servicio }) {
  const [cantidad, setCantidad] = useState(1)
  const router = useRouter()

  const handleAgregarCarrito = async () => {
    try {
      const res = await fetch('/api/carrito', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          servicioId: servicio.id,
          cantidad,
        }),
      })

      if (res.ok) {
        router.push('/carrito')
      } else {
        const data = await res.json()
        alert(data.error || 'Error al agregar al carrito')
      }
    } catch (error) {
      console.error(error)
      alert('Error inesperado al agregar al carrito')
    }
  }

  return (
    <main className="min-vh-100 bg-light py-5">
      <div className="container">
        <h1 className="text-purple fw-bold mb-4">{servicio.nombre}</h1>
        <p className="text-muted">{servicio.descripcion}</p>

        <p>
          <strong>Precio:</strong> ${servicio.precio}
        </p>
        <p>
          <strong>Duración:</strong> {servicio.duracion} minutos
        </p>
        <p>
          <strong>Categoría:</strong> {servicio.categoria.nombre}
        </p>

        <div className="mb-4 mt-4">
          <label className="form-label fw-semibold">Cantidad</label>
          <input
            type="number"
            min={1}
            className="form-control w-25"
            value={cantidad}
            onChange={(e) => setCantidad(Number(e.target.value))}
          />
        </div>

        <div className="d-flex gap-3 mt-2">
          <button
            className="btn btn-outline-primary"
            onClick={handleAgregarCarrito}
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </main>
  )
}
