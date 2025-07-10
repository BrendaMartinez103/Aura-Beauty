import Link from 'next/link'
import CategoriasGrid from '../components/list/CategoriaGrid'
import { getCategoriesAndServices } from '@/lib/data'

export default async function ServiciosPage() {
  const categoriasRaw = await getCategoriesAndServices()
  const categorias = categoriasRaw.map((cat) => ({
    nombre: cat.nombre,
    servicios: cat.Servicio.map((serv) => serv.nombre),
  }))

  return (
    <main
      className="min-vh-100"
      style={{ backgroundColor: 'var(--background)' }}
    >
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="text-center mb-5">
              <h1 className="display-4 fw-bold text-purple mb-3">
                Nuestros Servicios
              </h1>
              <p className="fs-5 text-muted-foreground">
                Conocé todo lo que podemos ofrecerte para realzar tu belleza y
                bienestar
              </p>
            </div>

            <CategoriasGrid categorias={categorias} />

            {/* Botón final */}
            <div className="bg-light rounded p-4 text-center">
              <h4 className="h5 fw-semibold text-purple mb-3">
                ¿Querés vivir la experiencia Aura?
              </h4>
              <p className="fs-6 text-muted-foreground mb-3">
                Elegí el servicio que más te guste y dejate cuidar por nuestras
                profesionales.
              </p>
              <Link href="/" className="btn btn-primary">
                Volver al Inicio
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
