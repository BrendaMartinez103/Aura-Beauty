'use client'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Plus } from 'lucide-react'

const categorias = {
  Peluquería: [
    'Corte',
    'Brushing / Peinado',
    'Planchita o Buclera',
    'Coloración',
    'Baño de crema',
    'Keratina alisadora',
    'Botox capilar',
    'Hidratación profunda',
    'Shock de nutrición',
    'Tratamiento anti frizz',
  ],
  'Pestañas y Cejas': [
    'Pestañas clásicas',
    'Pestañas volumen (2D/3D/Ruso)',
    'Mantenimiento de extensiones',
    'Lifting de pestañas',
    'Tinte de pestañas',
    'Diseño y perfilado de cejas',
    'Laminado de cejas',
  ],
  Uñas: [
    'Manicura tradicional',
    'Manicura semipermanente',
    'Pedicura spa',
    'Esmaltado común o semipermanente',
    'Uñas esculpidas',
    'Reforzamiento de uñas naturales',
    'Spa de manos/pies',
    'Reconstrucción de uñas quebradas',
  ],
  Masajes: [
    'Masaje descontracturante',
    'Masaje relajante',
    'Masaje localizado',
    'Masaje con piedras calientes',
    'Drenaje linfático manual',
    'Masaje con aceites esenciales',
    'Masaje reductor',
  ],
}

export default function ReservaOnlinePage() {
  const router = useRouter()
  const { data: session } = useSession()

  const rol = session?.user?.rol as 'admin' | 'cliente' | null

  const handleClickServicio = (servicio: string) => {
    if (!rol) {
      router.push('/login')
    } else if (rol === 'cliente') {
      router.push(`/reserva/${encodeURIComponent(servicio)}`)
    }
  }

  const handleAgregarServicio = () => {
    router.push('/admin/servicios')
  }

  return (
    <main
      className="min-vh-100"
      style={{ backgroundColor: 'var(--background)' }}
    >
      <div className="container my-5">
        <h1 className="display-4 fw-bold text-purple text-center mb-4">
          Reservá tu turno
        </h1>
        {/* Filtro por categoría */}
        <div className="mb-4 text-center">
          <label
            htmlFor="categoriaSelect"
            className="form-label fw-medium me-2"
          >
            Filtrar por categoría:
          </label>
          <select
            id="categoriaSelect"
            className="form-select d-inline w-auto"
            onChange={(e) => {
              const seleccion = e.target.value
              if (seleccion && rol === 'cliente') {
                router.push(
                  `/reserva/categoria/${encodeURIComponent(seleccion)}`
                )
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

        {rol === 'admin' && (
          <div className="text-end mb-3">
            <button
              className="btn btn-outline-primary"
              onClick={handleAgregarServicio}
            >
              <Plus size={18} />
              Agregar Servicio
            </button>
          </div>
        )}

        {Object.entries(categorias).map(([categoria, servicios]) => (
          <div key={categoria} className="mb-4">
            <h2 className="h4 fw-semibold text-purple">{categoria}</h2>
            <div className="row g-3">
              {servicios.map((servicio) => (
                <div key={servicio} className="col-12 col-md-6 col-lg-4">
                  <button
                    className="btn btn-light border w-100 text-start text-muted-foreground shadow-sm"
                    onClick={() => handleClickServicio(servicio)}
                  >
                    {servicio}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
