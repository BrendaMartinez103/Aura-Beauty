'use client'

import { Servicio } from '@/types'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ShoppingCart } from 'lucide-react'

export default function ServicioCardInteractiva({
  servicio,
}: {
  servicio: Servicio
}) {
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
    <div className="card shadow-sm h-100">
      <div className="card-body">
        <h5 className="card-title text-purple fw-bold">{servicio.nombre}</h5>
        <p className="card-text text-muted">{servicio.descripcion}</p>
        <p className="mb-2">
          <strong>${servicio.precio}</strong> · {servicio.duracion} min
        </p>

        {/* Input de cantidad */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Cantidad</label>
          <input
            type="number"
            min={1}
            className="form-control w-50"
            value={cantidad}
            onChange={(e) => setCantidad(Number(e.target.value))}
          />
        </div>

        {/* Botón agregar */}
        <button
          className="btn btn-outline-primary w-100 d-flex justify-content-center align-items-center gap-2"
          onClick={handleAgregarCarrito}
        >
          <ShoppingCart size={18} /> Agregar al carrito
        </button>
      </div>
    </div>
  )
}
