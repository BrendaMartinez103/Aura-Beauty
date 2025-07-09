import Link from 'next/link'
import { FiltroCategoria } from '../components/reserva/FiltroCategoria'
import { auth } from '@/lib/auth'
import { getCategoriesAndServices } from '@/lib/data'

export default async function ReservaOnlinePage() {
  const session = await auth()

  const categoriasRaw = await getCategoriesAndServices()
  const categorias = categoriasRaw
    .map((categoria) => ({
      nombre: categoria.nombre,
      servicios: categoria.Servicio.map((servicio) => servicio.nombre),
    }))
    .reduce(
      (acc, curr) => {
        acc[curr.nombre] = curr.servicios
        return acc
      },
      {} as Record<string, string[]>
    )

  const rol = session?.user?.rol as 'admin' | 'cliente' | null

  const handleClickServicio = (servicio: string) => {
    if (!rol) {
      return '/login'
    } else if (rol === 'cliente') {
      return `/reserva/${encodeURIComponent(servicio)}`
    }
    return ''
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
        <FiltroCategoria categorias={categorias} rol={rol} />

        {Object.entries(categorias).map(([categoria, servicios]) => (
          <div key={categoria} className="mb-4">
            <h2 className="h4 fw-semibold text-purple">{categoria}</h2>
            <div className="row g-3">
              {servicios.map((servicio) => (
                <div key={servicio} className="col-12 col-md-6 col-lg-4">
                  <Link
                    className="btn btn-light border w-100 text-start text-muted-foreground shadow-sm"
                    href={handleClickServicio(servicio)}
                  >
                    {servicio}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
