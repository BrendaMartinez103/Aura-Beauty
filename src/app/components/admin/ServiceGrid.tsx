import React from 'react'
import { Card, Row, Col } from 'react-bootstrap'

interface Servicio {
  id: number
  nombre: string
  descripcion: string
  imageUrl?: string
  precio: number
  duracion: number
}

const ServiceGrid: React.FC<{ servicios: Servicio[] }> = ({ servicios }) => {
  if (servicios.length === 0) {
    return <p>No hay servicios para mostrar.</p>
  }
  return (
    <Row>
      {servicios.map((servicio) => (
        <Col key={servicio.id} xs={12} md={6} lg={4} className="mb-4">
          <Card>
            {servicio.imageUrl && (
              <Card.Img
                variant="top"
                src={servicio.imageUrl}
                alt={servicio.nombre}
              />
            )}
            <Card.Body>
              <Card.Title>{servicio.nombre}</Card.Title>
              <Card.Text>{servicio.descripcion}</Card.Text>
              <Card.Text>
                <strong>Precio:</strong> ${servicio.precio}
              </Card.Text>
              <Card.Text>
                <strong>Duración:</strong> {servicio.duracion} min
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  )
}

export default ServiceGrid
