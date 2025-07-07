import { prisma } from '@/db/client'
import ListaServiciosPorCategoria from '@/app/components/servicio/lista-servicios-por-categoria'
import Link from 'next/link'
interface Props {
  params: Promise<{ categoria: string }>
}

export default async function ServiciosPorCategoriaPage({ params }: Props) {
  const { categoria: categoriaParam } = await params
  const nombreCategoria = decodeURIComponent(categoriaParam)

  const categoria = await prisma.categoria.findUnique({
    where: { nombre: nombreCategoria },
    include: {
      Servicio: {
        where: { activo: true },
        orderBy: { nombre: 'asc' },
        include: { categoria: true },
      },
    },
  })

  if (!categoria) {
    return (
      <div className="container py-5">
        <h1 className="text-danger">Categoría no encontrada</h1>
      </div>
    )
  }

  return (
    <main
      className="min-vh-100"
      style={{ backgroundColor: 'var(--background)' }}
    >
      <div className="container py-5">
        <h1 className="display-5 fw-bold text-purple mb-4">
          Servicios de {categoria.nombre}
        </h1>
        <ListaServiciosPorCategoria servicios={categoria.Servicio} />
        <div className="text-center mt-5">
          <Link href="/reserva">
            <button className="btn btn-outline-primary">
              ← Volver a categorías
            </button>
          </Link>
        </div>
      </div>
    </main>
  )
}
