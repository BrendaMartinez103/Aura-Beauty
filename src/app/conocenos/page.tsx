import Link from 'next/link'

export default function ConocenosPage() {
  return (
    <main
      className="min-vh-100"
      style={{ backgroundColor: 'var(--background)' }}
    >
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            {/* Header */}
            <div className="text-center mb-5">
              <h1 className="display-4 fw-bold text-purple mb-3">Conócenos</h1>
              <p className="fs-5 text-muted-foreground">
                Descubre la historia detrás de Aura Beauty
              </p>
            </div>

            {/* Contenido principal */}
            <div className="bg-white rounded shadow-sm p-4 p-md-5">
              <h2 className="h3 fw-semibold text-purple mb-4">
                Nuestra Historia
              </h2>
              <p className="fs-6 text-muted-foreground mb-4">
                Aura Beauty nació de la pasión por realzar la belleza natural de
                cada persona. Desde nuestros inicios, hemos creído que la
                belleza va más allá de lo superficial; es una expresión de
                armonía entre el cuerpo, la mente y el espíritu.
              </p>

              <h3 className="h4 fw-semibold text-purple mb-3">
                Nuestra Misión
              </h3>
              <p className="fs-6 text-muted-foreground mb-4">
                Brindar servicios de belleza de alta calidad en un ambiente
                relajante y acogedor, donde cada cliente se sienta especial y
                valorado. Utilizamos técnicas innovadoras y productos premium
                para garantizar resultados excepcionales.
              </p>

              <h3 className="h4 fw-semibold text-purple mb-3">
                Nuestros Valores
              </h3>
              <div className="row g-4 mb-4">
                <div className="col-md-6">
                  <div className="d-flex align-items-start">
                    <div className="service-icon me-3">✨</div>
                    <div>
                      <h4 className="h6 fw-semibold mb-2">Excelencia</h4>
                      <p className="small text-muted-foreground mb-0">
                        Nos comprometemos con la calidad en cada servicio
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="d-flex align-items-start">
                    <div className="service-icon me-3">🤝</div>
                    <div>
                      <h4 className="h6 fw-semibold mb-2">Confianza</h4>
                      <p className="small text-muted-foreground mb-0">
                        Construimos relaciones duraderas con nuestros clientes
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="d-flex align-items-start">
                    <div className="service-icon me-3">🌿</div>
                    <div>
                      <h4 className="h6 fw-semibold mb-2">Bienestar</h4>
                      <p className="small text-muted-foreground mb-0">
                        Promovemos el cuidado integral de la persona
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="d-flex align-items-start">
                    <div className="service-icon me-3">💎</div>
                    <div>
                      <h4 className="h6 fw-semibold mb-2">Innovación</h4>
                      <p className="small text-muted-foreground mb-0">
                        Incorporamos las últimas tendencias y técnicas
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="h4 fw-semibold text-purple mb-3">
                Nuestro Equipo
              </h3>
              <p className="fs-6 text-muted-foreground mb-4">
                Contamos con un equipo de profesionales altamente capacitados y
                certificados, cada uno especializado en diferentes áreas de la
                belleza. Nuestro personal se mantiene constantemente actualizado
                con las últimas tendencias y técnicas del sector para ofrecerte
                siempre lo mejor.
              </p>

              <div className="bg-light rounded p-4 text-center">
                <h4 className="h5 fw-semibold text-purple mb-3">
                  ¿Por qué elegirnos?
                </h4>
                <p className="fs-6 text-muted-foreground mb-3">
                  En Aura Beauty, cada visita es una experiencia única. Nos
                  enfocamos en entender tus necesidades específicas para
                  brindarte un servicio personalizado que supere tus
                  expectativas.
                </p>
                <Link href="/" className="btn btn-primary">
                  Volver al Inicio
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
