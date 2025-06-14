'use client'
import OffcanvasNavbar from '../components/offcanvas-navbar'
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const categorias = {
  "✂️ Peluquería": [
    "Corte",
    "Brushing / Peinado",
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
  const [usuario, setUsuario] = useState<{ rol: 'admin' | 'cliente' | null }>({ rol: null })

  useEffect(() => {
    // Lógica simulada: cambiar por fetch real o contexto de autenticación
    const loggedInUser = { rol: "cliente" } // "admin" | "cliente" | null
    //setUsuario(loggedInUser)
  }, [])

  const handleClickServicio = (servicio: string) => {
    if (!usuario.rol) {
      router.push("/login")
    } else if (usuario.rol === "cliente") {
      router.push(`/carrito?servicio=${encodeURIComponent(servicio)}`)
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

        {usuario.rol === "admin" && (
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
