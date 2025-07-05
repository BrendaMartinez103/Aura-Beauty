'use client'

import React, { useState } from 'react'
import { Card, Button, Form, Alert, ListGroup } from 'react-bootstrap'

interface Notificacion {
  id: number
  titulo: string
  mensaje: string
  fecha: string
}

interface NotificacionesListProps {
  notificaciones: Notificacion[]
}

const NotificacionesList: React.FC<NotificacionesListProps> = ({ notificaciones }) => {
  if (!notificaciones.length) {
    return <Alert variant="info">No hay notificaciones.</Alert>
  }
  return (
    <ListGroup>
      {notificaciones.map((n) => (
        <ListGroup.Item key={n.id}>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <strong>{n.titulo}</strong>
              <div className="text-muted small">{n.fecha}</div>
              <div>{n.mensaje}</div>
            </div>
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
}

interface NotificacionFormProps {
  onAdd: (titulo: string, mensaje: string) => void
}

const NotificacionForm: React.FC<NotificacionFormProps> = ({ onAdd }) => {
  const [titulo, setTitulo] = useState('')
  const [mensaje, setMensaje] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!titulo.trim() || !mensaje.trim()) return
    onAdd(titulo, mensaje)
    setTitulo('')
    setMensaje('')
  }

  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title>Crear notificación</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-2">
            <Form.Label>Título</Form.Label>
            <Form.Control
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              placeholder="Título de la notificación"
              required
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Mensaje</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              placeholder="Mensaje de la notificación"
              required
            />
          </Form.Group>
          <Button type="submit" variant="primary">
            Enviar notificación
          </Button>
        </Form>
      </Card.Body>
    </Card>
  )
}

export { NotificacionesList, NotificacionForm }
export type { Notificacion }
