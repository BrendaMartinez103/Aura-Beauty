'use client'

import React, { useState } from 'react'
import {
  NotificacionesList,
  NotificacionForm,
  Notificacion,
} from '@/app/components/admin/NotificacionesComponents'

export default function NotificacionesClient() {
  const [notificaciones, setNotificaciones] = useState<Notificacion[]>([])

  const handleAdd = async (
    titulo: string,
    mensaje: string,
    setSuccess: (v: boolean) => void,
    setError: (v: string) => void
  ) => {
    setError('')
    setSuccess(false)
    try {
      const res = await fetch('/api/notificar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: titulo, body: mensaje }),
      })
      if (!res.ok) throw new Error('Error al enviar la notificación')
      setSuccess(true)
      setNotificaciones((prev) => [
        {
          id: Date.now(),
          titulo,
          mensaje,
          fecha: new Date().toLocaleString('es-AR'),
        },
        ...prev,
      ])
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message)
      else setError('Error desconocido')
    }
  }

  return (
    <>
      <NotificacionForm onAdd={handleAdd} />
      <NotificacionesList notificaciones={notificaciones} />
    </>
  )
}
