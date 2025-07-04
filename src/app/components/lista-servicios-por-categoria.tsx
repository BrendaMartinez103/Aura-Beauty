'use client'

import { Servicio } from '@/types'
import ServicioCard from './servicio-card'
import { useRouter } from 'next/navigation'
import { ShoppingCart } from 'lucide-react'

export default function ListaServiciosPorCategoria({ servicios }: { servicios: Servicio[] }) {
  const router = useRouter()

  const handleVerCarrito = () => {
    router.push('/carrito')
  }

  return (
    <div className="row g-4">
      {servicios.length === 0 ? (
        <p className="text-muted">No hay servicios disponibles para esta categoría.</p>
      ) : (
        servicios.map((servicio) => (
          <div key={servicio.id} className="col-12 col-md-6 col-lg-4">
            <ServicioCard servicio={servicio} />
            <button
              className="btn btn-outline-primary mt-2 d-flex align-items-center gap-2"
              onClick={handleVerCarrito}
              title="Ir al carrito"
            >
              <ShoppingCart size={18} /> Ver carrito
            </button>
          </div>
        ))
      )}
    </div>
  )
}
