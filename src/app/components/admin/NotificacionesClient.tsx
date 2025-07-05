'use client'

import React, { useState } from 'react'
import { NotificacionesList, NotificacionForm, Notificacion } from '@/app/components/admin/NotificacionesComponents'

export default function NotificacionesClient() {
  const [notificaciones, setNotificaciones] = useState<Notificacion[]>([])

  const handleAdd = (titulo: string, mensaje: string) => {
    setNotificaciones((prev) => [
      {
        id: Date.now(),
        titulo,
        mensaje,
        fecha: new Date().toLocaleString('es-AR'),
      },
      ...prev,
    ])
  }

  return (
    <>
      <NotificacionForm onAdd={handleAdd} />
      <NotificacionesList notificaciones={notificaciones} />
    </>
  )
}
