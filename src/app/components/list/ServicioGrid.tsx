'use client'

import { Card, Row, Col } from 'react-bootstrap'

interface Servicio {
  id: number
  nombre: string
  descripcion: string
  imageUrl?: string
}

export default function ServicioGrid({ servicios }: { servicios: Servicio[] }) {
  return (
    <Row xs={1} md={2} lg={3} className="g-4">
      {servicios.map((serv) => (
        <Col key={serv.id}>
          <Card className="h-100 shadow-sm">
            <div
              className="bg-light d-flex align-items-center justify-content-center w-100 overflow-hidden"
              style={{
                height: 200,
              }}
            >
              {serv.imageUrl ? (
                <Card.Img
                  variant="top"
                  src={serv.imageUrl}
                  alt={serv.nombre}
                  style={{
                    objectFit: 'cover',
                    height: '100%',
                    width: '100%',
                  }}
                />
              ) : (
                <span className="text-secondary fs-4">Sin imagen</span>
              )}
            </div>
            <Card.Body>
              <Card.Title>{serv.nombre}</Card.Title>
              {serv.descripcion && <Card.Text>{serv.descripcion}</Card.Text>}
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  )
}
