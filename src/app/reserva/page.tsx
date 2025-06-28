'use client'
import OffcanvasNavbar from '../components/offcanvas-navbar'
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

const categorias = {
  "✂️ Peluquería": [
    "Corte",
    "Brushing o Peinado",
    "Planchita o Buclera",
    "Coloración",
    "Baño de crema",
    "Keratina alisadora",
    "Botox capilar",
    "Hidratación profunda",
    "Shock de nutrición",
    "Tratamiento anti frizz"
  ],
  "👁 Pestañas y Cejas": [
    "Colocación de pestañas clásicas (una por una)",
    "Pestañas 2D, 3D, volumen ruso",
    "Mantenimiento de extensiones",
    "Lifting de pestañas",
    "Tinte de pestañas",
    "Diseño y perfilado de cejas",
    "Laminado de cejas"
  ],
  "💅 Uñas": [
    "Manicura tradicional",
    "Manicura semipermanente",
    "Pedicura spa",
    "Esmaltado común o semipermanente",
    "Uñas esculpidas en gel o acrílico",
    "Reforzamiento de uñas naturales",
    "Spa de manos/pies con exfoliación y mascarilla",
    "Reconstrucción de uñas quebradas"
  ],
  "💆 Masajes": [
    "Masaje descontracturante",
    "Masaje relajante",
    "Masaje localizado (cuello, espalda, piernas)",
    "Masaje con piedras calientes",
    "Drenaje linfático manual",
    "Masaje con aceites esenciales",
    "Masaje reductor"
  ]
}

export default function ReservaOnlinePage() {
  const router = useRouter()
  const { data: session } = useSession()

  const rol = session?.user?.rol as 'admin' | 'cliente' | null

  const handleClickServicio = (servicio: string) => {
    if (!rol) {
      router.push("/login")
    } else if (rol === "cliente") {
      router.push(`/reserva/${encodeURIComponent(servicio)}`)
    }
  }

  const handleAgregarServicio = () => {
    router.push("/admin/agregar-servicio")
  }

  return (
    <main className="min-vh-100" style={{ backgroundColor: "var(--background)" }}>
      <OffcanvasNavbar brandName="Aura Beauty" brandHref="/" />

      <div className="container my-5">
        <h1 className="display-4 fw-bold text-purple text-center mb-4">Reservá tu turno</h1>

        {rol === "admin" && (
          <div className="text-end mb-3">
            <button className="btn btn-outline-primary" onClick={handleAgregarServicio}>
              ➕ Agregar Servicio
            </button>
          </div>
        )}

        {Object.entries(categorias).map(([categoria, servicios]) => (
          <div key={categoria} className="mb-4">
            <h2 className="h4 fw-semibold text-purple">{categoria}</h2>
            <div className="row g-3">
              {servicios.map(servicio => (
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
