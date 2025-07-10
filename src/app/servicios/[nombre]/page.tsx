import { getCategoriesAndServices } from '@/lib/data'
import ServicioGrid from '@/app/components/list/ServicioGrid'
import Link from 'next/link'

interface Props {
  params: { nombre: string }
}

export default async function CategoriaPage({ params }: Props) {
  const categoriasRaw = await getCategoriesAndServices()
  const categoria = categoriasRaw.find(
    (cat) =>
      cat.nombre.toLowerCase() ===
      decodeURIComponent(params.nombre).toLowerCase()
  )

  if (!categoria) {
    return (
      <div className="container py-5">
        <h2>Categoría no encontrada</h2>
        <Link href="/servicios" className="btn btn-secondary mt-3">
          Volver
        </Link>
      </div>
    )
  }

  // Filtra solo servicios activos si tienes la propiedad "activo"
  const servicios = categoria.Servicio.filter((serv) => serv.activo !== false)

  return (
    <main
      className="min-vh-100"
      style={{ backgroundColor: 'var(--background)' }}
    >
      <div className="container my-5">
        <h1 className="mb-4 text-purple">{categoria.nombre}</h1>
        <ServicioGrid servicios={servicios} />
        <div className="mt-4">
          <Link href="/servicios" className="btn btn-secondary">
            Volver a categorías
          </Link>
        </div>
      </div>
    </main>
  )
}
