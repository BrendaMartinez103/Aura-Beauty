'use client'
import 'bootstrap/dist/css/bootstrap.min.css'
import Image from 'next/image'

export default function NuestrosClientes() {
  const reseñas = [
    {
      nombre: "Camila Fernández",
      servicio: "Masajes",
      comentario: "Una experiencia increíble. Me sentí renovada y super relajada. ¡Volveré pronto!",
      imagen: "/camila.jpg",
      estrellas: 5,
    },
    {
      nombre: "Lucía Ramírez",
      servicio: "Peluquería",
      comentario: "¡Me encantó el corte! Muy profesionales y atentos a lo que quería.",
      imagen: "/lucia.jpg",
      estrellas: 4,
    },
    {
      nombre: "Sofía Gómez",
      servicio: "Manicura",
      comentario: "Las uñas quedaron hermosas y duraron muchísimo. Detallistas y pacientes.",
      imagen: "/sofia.jpg",
      estrellas: 5,
    },
    {
      nombre: "Valentina Torres",
      servicio: "Pestañas",
      comentario: "Quedé feliz con mis pestañas. ¡Recomiendo 100%! Ambiente cómodo y tranquilo.",
      imagen: "/valentina.jpg",
      estrellas: 5,
    },
  ]

  return (
    <div className="container py-5">
      <h1 className="text-center mb-5">Nuestros Clientes</h1>
      <div className="row">
        {reseñas.map((cliente, index) => (
          <div key={index} className="col-md-6 col-lg-4 mb-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body text-center">
                <Image
                  src={cliente.imagen}
                  alt={cliente.nombre}
                  className="rounded-circle mb-3"
                  width={100}
                  height={100}
                />
                <h5 className="card-title">{cliente.nombre}</h5>
                <h6 className="text-muted">{cliente.servicio}</h6>
                <p className="card-text">"{cliente.comentario}"</p>
                <div>
                  {[...Array(cliente.estrellas)].map((_, i) => (
                    <span key={i} className="text-warning">★</span>
                  ))}
                  {[...Array(5 - cliente.estrellas)].map((_, i) => (
                    <span key={i} className="text-muted">★</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-5">
        <a href="/" className="btn btn-primary">Volver al Inicio</a>
      </div>
    </div>
  )
}
