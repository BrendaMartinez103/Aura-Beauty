'use client'
import OffcanvasNavbar from "../components/offcanvas-navbar"

export default function ServiciosPage() {
  return (
    <main className="min-vh-100" style={{ backgroundColor: "var(--background)" }}>
      <OffcanvasNavbar brandName="Aura Beauty" brandHref="/" />

      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="text-center mb-5">
              <h1 className="display-4 fw-bold text-purple mb-3">Nuestros Servicios</h1>
              <p className="fs-5 text-muted-foreground">Conocé todo lo que podemos ofrecerte para realzar tu belleza y bienestar</p>
            </div>

            <div className="bg-white rounded shadow-sm p-4 p-md-5">
              {/* Peluquería */}
              <h2 className="h4 fw-semibold text-purple mb-3">✂️ Peluquería</h2>
              <ul className="text-muted-foreground mb-4">
                <li>Corte</li>
                <li>Brushing / Peinado</li>
                <li>Planchita o Buclera</li>
                <li>Coloración (tinte, reflejos, balayage)</li>
                <li>Baño de crema</li>
                <li>Keratina alisadora</li>
                <li>Botox capilar</li>
                <li>Hidratación profunda</li>
                <li>Shock de nutrición</li>
                <li>Tratamiento anti frizz</li>
              </ul>

              {/* Pestañas y Cejas */}
              <h2 className="h4 fw-semibold text-purple mb-3">👁 Pestañas y Cejas</h2>
              <ul className="text-muted-foreground mb-4">
                <li>Colocación de pestañas clásicas (una por una)</li>
                <li>Pestañas 2D, 3D, volumen ruso</li>
                <li>Mantenimiento de extensiones</li>
                <li>Lifting de pestañas</li>
                <li>Tinte de pestañas</li>
                <li>Diseño y perfilado de cejas</li>
                <li>Laminado de cejas</li>
              </ul>

              {/* Uñas */}
              <h2 className="h4 fw-semibold text-purple mb-3">💅 Uñas (Manicura y Pedicura)</h2>
              <ul className="text-muted-foreground mb-4">
                <li>Manicura tradicional</li>
                <li>Manicura semipermanente</li>
                <li>Pedicura spa</li>
                <li>Esmaltado común o semipermanente</li>
                <li>Uñas esculpidas en gel o acrílico</li>
                <li>Reforzamiento de uñas naturales</li>
                <li>Spa de manos/pies con exfoliación y mascarilla</li>
                <li>Reconstrucción de uñas quebradas</li>
              </ul>

              {/* Masajes */}
              <h2 className="h4 fw-semibold text-purple mb-3">💆‍♀️ Masajes</h2>
              <ul className="text-muted-foreground mb-4">
                <li>Masaje descontracturante</li>
                <li>Masaje relajante</li>
                <li>Masaje localizado (cuello, espalda, piernas)</li>
                <li>Masaje con piedras calientes</li>
                <li>Drenaje linfático manual</li>
                <li>Masaje con aceites esenciales</li>
                <li>Masaje reductor</li>
              </ul>

              {/* Botón final */}
              <div className="bg-light rounded p-4 text-center">
                <h4 className="h5 fw-semibold text-purple mb-3">¿Querés vivir la experiencia Aura?</h4>
                <p className="fs-6 text-muted-foreground mb-3">
                  Elegí el servicio que más te guste y dejate cuidar por nuestras profesionales.
                </p>
                <a href="/" className="btn btn-primary">Volver al Inicio</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
