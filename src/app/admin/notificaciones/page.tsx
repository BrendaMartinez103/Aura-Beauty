'use client'
import NotificacionesClient from '@/app/components/admin/NotificacionesClient'
import { Container, Card } from 'react-bootstrap'

export default function NotificacionesPage() {
  return (
    <Container className="mt-4" style={{ maxWidth: 700 }}>
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>Notificaciones</Card.Title>
          <Card.Text>
            Aquí podrás crear y ver notificaciones. En el futuro, cuando la app
            sea PWA, vamos a poder modificar esto.
          </Card.Text>
        </Card.Body>
      </Card>
      <NotificacionesClient />
    </Container>
  )
}
