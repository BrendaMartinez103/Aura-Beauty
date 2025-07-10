'use client'
import { Card, Row, Col } from 'react-bootstrap'
import Link from 'next/link'

type Categoria = {
  nombre: string
  servicios: string[]
}

export default function CategoriasGrid({
  categorias,
}: {
  categorias: Categoria[]
}) {
  return (
    <Row xs={1} md={2} lg={3} className="g-4">
      {categorias.map((cat) => (
        <Col key={cat.nombre}>
          <Link
            href={`/servicios/${encodeURIComponent(cat.nombre)}`}
            style={{ textDecoration: 'none' }}
          >
            <Card className="h-100 shadow-sm hover-shadow">
              <Card.Body>
                <Card.Title className="fw-bold text-purple">
                  {cat.nombre}
                </Card.Title>
                <ul className="text-muted-foreground mb-0">
                  {cat.servicios.map((serv, i) => (
                    <li key={i}>{serv}</li>
                  ))}
                </ul>
              </Card.Body>
            </Card>
          </Link>
        </Col>
      ))}
    </Row>
  )
}
