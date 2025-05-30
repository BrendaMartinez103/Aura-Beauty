import Image from "next/image"
import OffcanvasNavbar from "./components/offcanvas-navbar"

export default function Home() {
  return (
    <main className="min-vh-100" style={{ backgroundColor: "var(--background)" }}>
      <OffcanvasNavbar brandName="Aura Beauty" brandHref="/" />

      {/* Imagen principal */}
      <div className="container my-4 d-flex justify-content-center">
        <Image
          src="/imagenPrincipal.jpeg"
          alt="Servicios de belleza: pestañas, masajes, manicura y estilismo"
          width={250}
          height={70}
          className="rounded shadow-sm"
        />
      </div>

      {/* Nombre y slogan */}
      <div className="container text-center my-5">
        <h1 className="display-4 fw-bold text-purple">
          Aura Beauty
        </h1>
        <p className="fs-4 text-muted-foreground">
          Más que belleza, armonía.
        </p>
      </div>

      {/* Banner promocional */}
      <div className="bg-purple py-3 text-center">
        <p className="fs-5 fw-medium text-white px-3 mb-0">
          HASTA UN 30% DE DESCUENTO EN TRATAMIENTOS + 25% DE AHORRO, TODOS LOS DÍAS.
        </p>
      </div>

      {/* Sección bienvenida */}
      <div className="container text-center my-5">
        <h2 className="h2 fw-normal text-foreground mb-3">¡Bienvenido!</h2>
        <p className="fs-4 text-muted-foreground">Seleccioná las opciones para reservar tu cita</p>
      </div>

      {/* Sección servicios */}
      <div className="container my-5">
        <div className="row g-4">
          <div className="col-12 col-md-6 col-lg-4">
            <div className="service-card">
              <div className="service-icon">💅</div>
              <h3 className="h5 fw-semibold mb-2">Manicura</h3>
              <p className="text-muted-foreground mb-0">Cuidado profesional para tus uñas</p>
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-4">
            <div className="service-card">
              <div className="service-icon">👁️</div>
              <h3 className="h5 fw-semibold mb-2">Pestañas</h3>
              <p className="text-muted-foreground mb-0">Extensiones y tratamientos para pestañas</p>
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-4">
            <div className="service-card">
              <div className="service-icon">💆</div>
              <h3 className="h5 fw-semibold mb-2">Masajes</h3>
              <p className="text-muted-foreground mb-0">Relajación y bienestar corporal</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-5" style={{ backgroundColor: "#f5f3ff" }}>
        <div className="container text-center">
          <h2 className="display-5 fw-bold text-purple mb-4">¿Lista para tu transformación?</h2>
          <p className="fs-5 text-muted-foreground mb-4 mx-auto" style={{ maxWidth: "600px" }}>
            Reserva tu cita online y disfruta de nuestros servicios de belleza premium con los mejores profesionales.
          </p>
          <button className="btn btn-primary btn-lg px-5">
            Reservar Ahora
          </button>
        </div>
      </div>
    </main>
  )
}
