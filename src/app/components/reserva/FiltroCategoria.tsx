'use client'

import { useRouter } from 'next/navigation'

export function FiltroCategoria({
  categorias,
  rol,
}: {
  categorias: Record<string, string[]>
  rol: 'admin' | 'cliente' | null
}) {
  const router = useRouter()

  return (
    <div className="mb-4 text-center">
      <label htmlFor="categoriaSelect" className="form-label fw-medium me-2">
        Filtrar por categoría:
      </label>
      <select
        id="categoriaSelect"
        className="form-select d-inline w-auto"
        onChange={(e) => {
          const seleccion = e.target.value
          if (seleccion && rol === 'cliente') {
            router.push(`/reserva/categoria/${encodeURIComponent(seleccion)}`)
          } else if (!rol) {
            router.push('/login')
          }
        }}
      >
        <option value="">Seleccionar categoría</option>
        {Object.keys(categorias).map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  )
}
