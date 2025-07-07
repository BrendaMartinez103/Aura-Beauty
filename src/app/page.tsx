'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ShoppingCart } from 'lucide-react'

export default function Home() {
  const router = useRouter()

  const handleVerCarrito = () => {
    router.push('/carrito')
  }

  return (
    <main
      className="min-vh-100"
      style={{ backgroundColor: 'var(--background)' }}
    >
      {/* Botón de carrito */}
      <div className="container mt-3 text-end">
        <button
          className="btn btn-outline-primary d-inline-flex align-items-center gap-2"
          onClick={handleVerCarrito}
          title="Ir al carrito"
        >
          <ShoppingCart size={18} /> carrito
        </button>
      </div>

      {/* Imagen principal */}
      <div className="container my-4 d-flex justify-content-center">
        <Image
          src="/imagenPrincipal.jpeg"
          alt="Servicios de belleza: pestañas y cejas, masajes, manicura y pedicura y estilismo"
          width={300}
          height={100}
          className="rounded shadow-sm"
        />
      </div>

      {/* Nombre y slogan */}
      <div className="container text-center my-5">
        <h1 className="display-4 fw-bold text-purple">Aura Beauty</h1>
        <p className="fs-4 text-muted-foreground">Más que belleza, armonía.</p>
      </div>

      {/* Banner promocional */}
      <div className="bg-purple py-3 text-center">
        <p className="fs-5 fw-medium text-white px-3 mb-0">
          ¡Empezá tu transformación! ✨ Comprá todos los servicios que quieras y
          te esperamos en nuestro local 💅💇‍♀️💆‍♀️
        </p>
      </div>

      {/* Sección bienvenida */}
      <div className="container text-center my-5">
        <h2 className="h2 fw-normal text-foreground mb-3">¡Bienvenido!</h2>
        <p className="fs-4 text-muted-foreground">
          Seleccioná las opciones para comprar tu servicio
        </p>
      </div>

      {/* Sección servicios */}
      <div className="container my-5">
        <div className="row g-4">
          <div className="col-12 col-md-6 col-lg-4">
            <Link
              href="/reserva/categoria/Manicura y Pedicura"
              className="text-decoration-none"
            >
              <div className="service-card">
                <div className="service-icon">💅</div>
                <h3 className="h5 fw-semibold mb-2">Manicura y Pedicura</h3>
                <p className="text-muted-foreground mb-0">
                  Cuidado profesional para tus uñas
                </p>
              </div>
            </Link>
          </div>

          <div className="col-12 col-md-6 col-lg-4">
            <Link
              href="/reserva/categoria/Pestañas y Cejas"
              className="text-decoration-none"
            >
              <div className="service-card">
                <div className="service-icon">👁️</div>
                <h3 className="h5 fw-semibold mb-2">Pestañas y Cejas</h3>
                <p className="text-muted-foreground mb-0">
                  Extensiones y tratamientos
                </p>
              </div>
            </Link>
          </div>

          <div className="col-12 col-md-6 col-lg-4">
            <Link
              href="/reserva/categoria/Masajes"
              className="text-decoration-none"
            >
              <div className="service-card">
                <div className="service-icon">💆</div>
                <h3 className="h5 fw-semibold mb-2">Masajes</h3>
                <p className="text-muted-foreground mb-0">
                  Relajación y bienestar corporal
                </p>
              </div>
            </Link>
          </div>

          <div className="col-12 col-md-6 col-lg-4">
            <Link
              href="/reserva/categoria/Peluquería"
              className="text-decoration-none"
            >
              <div className="service-card">
                <div className="service-icon">✂️</div>
                <h3 className="h5 fw-semibold mb-2">Peluquería</h3>
                <p className="text-muted-foreground mb-0">
                  El mejor look posible
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-5" style={{ backgroundColor: '#f5f3ff' }}>
        <div className="container text-center">
          <h2 className="display-5 fw-bold text-purple mb-4">
            ¿Lista para tu transformación?
          </h2>
          <p
            className="fs-5 text-muted-foreground mb-4 mx-auto"
            style={{ maxWidth: '600px' }}
          >
            Compra online y disfruta de nuestros servicios de belleza premium
            con los mejores profesionales.
          </p>
          <Link href="/reserva">
            <button className="btn btn-primary btn-lg px-5">
              Comprar Ahora
            </button>
          </Link>
        </div>
      </div>
    </main>
  )
}
