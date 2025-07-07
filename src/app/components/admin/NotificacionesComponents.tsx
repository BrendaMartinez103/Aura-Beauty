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

const NotificacionesList: React.FC<NotificacionesListProps> = ({
  notificaciones,
}) => {
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
  onAdd: (
    titulo: string,
    mensaje: string,
    setSuccess: (v: boolean) => void,
    setError: (v: string) => void
  ) => Promise<void>
}

const NotificacionForm: React.FC<NotificacionFormProps> = ({ onAdd }) => {
  const [titulo, setTitulo] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess(false)
    if (!titulo.trim() || !mensaje.trim()) return
    setLoading(true)
    try {
      await onAdd(titulo, mensaje, setSuccess, setError)
      setTitulo('')
      setMensaje('')
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message)
      else setError('Error desconocido')
    } finally {
      setLoading(false)
    }
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
              disabled={loading}
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
              disabled={loading}
            />
          </Form.Group>
          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? 'Enviando...' : 'Enviar notificación'}
          </Button>
          {success && (
            <Alert variant="success" className="mt-2">
              Notificación enviada
            </Alert>
          )}
          {error && (
            <Alert variant="danger" className="mt-2">
              {error}
            </Alert>
          )}
        </Form>
      </Card.Body>
    </Card>
  )
}

export { NotificacionesList, NotificacionForm }
export type { Notificacion }
