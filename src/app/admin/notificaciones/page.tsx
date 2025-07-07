'use client'
import NotificacionesClient from '@/app/components/admin/NotificacionesClient'
import { Container } from 'react-bootstrap'

export default function NotificacionesPage() {
  return (
    <Container className="mt-4" style={{ maxWidth: 700 }}>
      <NotificacionesClient />
    </Container>
  )
}
