"use client"

import { prisma } from "@/db/client"
import { notFound } from "next/navigation"
import { useState } from "react"

interface Props {
  params: { id: string }
}

export default async function ServicioPage({ params }: Props) {
  const nombre = decodeURIComponent(params.id)

  const servicio = await prisma.servicio.findFirst({
    where: { nombre },
    include: { categoria: true },
  })

  if (!servicio) return notFound()

  // ⚠️ Server Components no pueden usar estado directamente,
  // así que movemos esta parte a un componente cliente aparte ↓↓↓
  return <ServicioUI servicio={servicio} />
}

// 👇 Cliente: muestra el servicio con cantidad interactiva
function ServicioUI({ servicio }: { servicio: any }) {
  const [cantidad, setCantidad] = useState(1)

  const handleAgregarCarrito = () => {
    alert(`Agregado al carrito: ${servicio.nombre} x${cantidad}`)
  }

  const handleComprar = () => {
    alert(`Comprando ahora: ${servicio.nombre} x${cantidad}`)
  }

  return (
    <main className="min-vh-100 bg-light py-5">
      <div className="container">
        <h1 className="text-purple fw-bold mb-4">{servicio.nombre}</h1>
        <p className="text-muted">{servicio.descripcion}</p>

        <p><strong>Precio:</strong> ${servicio.precio}</p>
        <p><strong>Duración:</strong> {servicio.duracion} minutos</p>
        <p><strong>Categoría:</strong> {servicio.categoria.nombre}</p>

        {/* Selector de cantidad */}
        <div className="mb-4 mt-4">
          <label className="form-label fw-semibold">Cantidad</label>
          <input
            type="number"
            min={1}
            className="form-control w-25"
            value={cantidad}
            onChange={(e) => setCantidad(parseInt(e.target.value))}
          />
        </div>

        {/* Botones */}
        <div className="d-flex gap-3 mt-2">
          <button className="btn btn-outline-primary" onClick={handleAgregarCarrito}>
            Agregar al carrito
          </button>
          <button className="btn btn-primary" onClick={handleComprar}>
            Comprar ahora
          </button>
        </div>
      </div>
    </main>
  )
}
