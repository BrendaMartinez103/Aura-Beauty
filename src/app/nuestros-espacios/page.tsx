'use client'
import Image from 'next/image'
import OffcanvasNavbar from '../components/offcanvas-navbar'

export default function NuestrosEspacios() {
  const servicios = [
    {
      titulo: 'Recepción',
      descripcion:
        'Al ingresar a Aura Beauty, te recibe un ambiente cálido y moderno, pensado para que te sientas cómoda desde el primer momento. Nuestra recepción combina elegancia y tranquilidad, preparándote para una experiencia única de bienestar y belleza.',
      imagen: '/recepcion.png',
    },
    {
      titulo: 'Peluquería',
      descripcion:
        'Nuestro espacio de peluquería está diseñado para brindarte un servicio profesional y relajado. Desde cortes y peinados hasta coloraciones y tratamientos capilares, contamos con las mejores manos y productos para cuidar tu cabello.',
      imagen: '/peluqueria.png',
    },
    {
      titulo: 'Masajes',
      descripcion:
        'En nuestra sala de masajes, el estrés se desvanece. Un lugar acogedor donde ofrecemos distintas técnicas de relajación y terapias corporales que revitalizan tu cuerpo y mente.',
      imagen: '/masajes.png',
    },
    {
      titulo: 'Manicura',
      descripcion:
        'Un espacio pensado para realzar tu estilo. Aquí realizamos manicuras, pedicuras, esculpidas y nail art, cuidando cada detalle para que tus manos y pies luzcan impecables.',
      imagen: '/uñas.png',
    },
    {
      titulo: 'Pestañas',
      descripcion:
        'Nuestro rincón de pestañas ofrece extensiones, lifting y tintes. Un entorno tranquilo y delicado donde resaltamos tu mirada con precisión y profesionalismo.',
      imagen: '/pestañas.png',
    },
  ]

  return (
    <main className="min-vh-100" style={{ backgroundColor: 'var(--background)' }}>
      <OffcanvasNavbar brandName="Aura Beauty" brandHref="/" />

      <div className="container py-5">
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold text-purple mb-3">Nuestros Espacios</h1>
          <p className="fs-5 text-muted-foreground">
            Conocé cada rincón diseñado para tu comodidad, relax y belleza.
          </p>
        </div>

        {servicios.map((servicio, index) => (
          <div
            key={index}
            className={`row align-items-center mb-5 ${
              index % 2 !== 0 ? 'flex-md-row-reverse' : ''
            }`}
          >
            <div className="col-md-6 mb-3 mb-md-0">
              <Image
                src={servicio.imagen}
                alt={servicio.titulo}
                className="img-fluid rounded shadow-sm"
                width={600}
                height={400}
                layout="responsive"
              />
            </div>
            <div className="col-md-6">
              <h3 className="h4 fw-semibold text-purple mb-3">{servicio.titulo}</h3>
              <p className="fs-6 text-muted-foreground">{servicio.descripcion}</p>
            </div>
          </div>
        ))}

        <div className="bg-light rounded p-4 text-center mt-5">
          <h4 className="h5 fw-semibold text-purple mb-3">¿Querés visitarnos?</h4>
          <p className="fs-6 text-muted-foreground mb-3">
            Vení a disfrutar de un ambiente pensado exclusivamente para vos.
          </p>
          <a href="/" className="btn btn-primary">
            Volver al Inicio
          </a>
        </div>
      </div>
    </main>
  )
}
