import { prisma } from '@/db/client'
import ListaServiciosPorCategoria from '@/app/components/servicio/lista-servicios-por-categoria'
import Link from 'next/link'
interface Props {
  params: { categoria: string }
  searchParams: { page?: string; search?: string }
}
const SERVICIOS_POR_PAGINA = 4
export default async function ServiciosPorCategoriaPage({ params, searchParams }: Props) {
  const nombreCategoria = decodeURIComponent(params.categoria)
  const paginaActual = parseInt(searchParams.page || '1')
  const search = searchParams.search?.toLowerCase() || ''

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
 const serviciosFiltrados = categoria.Servicio.filter(
    (servicio) =>
      servicio.nombre.toLowerCase().includes(search) ||
      servicio.descripcion.toLowerCase().includes(search)
  )

  const totalPaginas = Math.ceil(serviciosFiltrados.length / SERVICIOS_POR_PAGINA)

  const servicios = serviciosFiltrados.slice(
    (paginaActual - 1) * SERVICIOS_POR_PAGINA,
    paginaActual * SERVICIOS_POR_PAGINA
  )

  return (
    <main className="min-vh-100" style={{ backgroundColor: 'var(--background)' }}>
      <div className="container py-5">
        <h1 className="display-5 fw-bold text-purple mb-4">
          Servicios de {categoria.nombre}
        </h1>
         {/* 🔍 Formulario de búsqueda */}
        <form className="mb-4">
          <input
            type="text"
            name="search"
            defaultValue={search}
            placeholder="Buscar servicio..."
            className="form-control"
          />
        </form>
        <ListaServiciosPorCategoria servicios={servicios} />

        {/* Paginación */}
        <div className="d-flex justify-content-center mt-5 gap-2">
          {[...Array(totalPaginas)].map((_, i) => {
            const pagina = i + 1
            const query = `?page=${pagina}${search ? `&search=${encodeURIComponent(search)}` : ''}`
            return (
              <Link
                key={pagina}
                href={`/reserva/categoria/${encodeURIComponent(nombreCategoria)}${query}`}
              >
                <button
                 className={`btn ${pagina === paginaActual ? 'btn-primary' : 'btn-outline-primary'} btn-sm`}
                >
                  {pagina}
                </button>
              </Link>
            )
          })}
        </div>

        <div className="text-center mt-4">
          <Link href="/reserva">
            <button className="btn btn-outline-primary">← Volver a categorías</button>
          </Link>
        </div>
      </div>
    </main>
  )
}
