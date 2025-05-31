'use client'
import Image from 'next/image'
import 'bootstrap/dist/css/bootstrap.min.css'

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
    <div className="container py-5">
      <h1 className="text-center mb-5">Nuestros Espacios</h1>
      {servicios.map((servicio, index) => (
        <div key={index} className="row mb-5 align-items-center">
          <div className="col-md-6 mb-3 mb-md-0">
            <Image
              src={servicio.imagen}
              alt={servicio.titulo}
              className="img-fluid rounded shadow"
              width={600}
              height={400}
              layout="responsive"
            />
          </div>
          <div className="col-md-6">
            <h3>{servicio.titulo}</h3>
            <p>{servicio.descripcion}</p>
          </div>  
        </div>
      ))}
       <div className="text-center mt-5">
        <a href="/" className="btn btn-primary">
          Volver al Inicio
        </a>
      </div>
    </div>
    
  )
}
