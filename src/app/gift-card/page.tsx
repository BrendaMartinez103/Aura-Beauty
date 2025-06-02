'use client'
import 'bootstrap/dist/css/bootstrap.min.css'
import Image from 'next/image'
import OffcanvasNavbar from '../components/offcanvas-navbar'

export default function GiftCardPage() {
  return (
    <main className="min-vh-100" style={{ backgroundColor: 'var(--background)' }}>
      <OffcanvasNavbar brandName="Aura Beauty" brandHref="/" />

      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            {/* Header */}
            <div className="text-center mb-5">
              <h1 className="display-4 fw-bold text-purple mb-3">Regalá Belleza y Bienestar</h1>
              <p className="fs-5 text-muted-foreground">
                Con nuestra <strong>Gift Card Aura Beauty</strong>, sorprendé a quien más querés con una experiencia inolvidable.
              </p>
            </div>

            {/* Contenido principal */}
            <div className="bg-white rounded shadow-sm p-4 p-md-5 mb-5">
              <div className="row align-items-center">
                <div className="col-md-6 mb-4 mb-md-0">
                  <Image
                    src="/gift-card.png"
                    alt="Gift Card Aura Beauty"
                    width={600}
                    height={400}
                    className="img-fluid rounded-4 shadow"
                  />
                </div>

                <div className="col-md-6">
                  <h4 className="text-purple mb-3">¿Qué incluye?</h4>
                  <p className="text-muted-foreground">
                    Nuestras Gift Cards pueden ser usadas para cualquiera de nuestros servicios:
                    <strong> masajes, peluquería, pestañas/cejas, manicura/pedicura</strong>.
                  </p>

                  <ul className="list-group list-group-flush mb-4">
                    <li className="list-group-item bg-transparent">🎁 Elegí el monto que quieras regalar</li>
                    <li className="list-group-item bg-transparent">📅 Válida por 6 meses</li>
                    <li className="list-group-item bg-transparent">🧘‍♀️ Usala para cualquier servicio</li>
                    <li className="list-group-item bg-transparent">📨 Presentación digital o impresa</li>
                  </ul>

                  <p className="text-muted-foreground">
                    Ideal para cumpleaños, aniversarios, agradecimientos o simplemente para regalar un mimo.
                  </p>
                </div>
              </div>
            </div>

            {/* Llamado a la acción */}
            <div className="bg-light rounded p-4 text-center shadow-sm">
              <h5 className="fw-semibold text-purple mb-3">¿Querés regalar una experiencia Aura?</h5>
              {/* al presionar el botón, si está logueado debe dirigir a un formulario, sino debe ir al login */}
              <a href="/contacto" className="btn btn-primary px-4 py-2 text-uppercase">
                Solicitar Gift Card
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
