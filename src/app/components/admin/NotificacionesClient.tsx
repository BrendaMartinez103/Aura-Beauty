'use client'

import { NotificacionForm } from '@/app/components/admin/NotificacionesComponents'
import { sendNotification } from '@/lib/noticationActions'

export default function NotificacionesClient() {
  const handleAdd = async (
    titulo: string,
    mensaje: string,
    setSuccess: (v: boolean) => void,
    setError: (v: string) => void
  ) => {
    setError('')
    setSuccess(false)
    try {
      const res = await sendNotification(titulo, mensaje)
      if (!res.success) {
        throw new Error(res.error || 'Error al enviar la notificación')
      }
      setSuccess(true)
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message)
      else setError('Error desconocido')
    }
  }

  return (
    <>
      <NotificacionForm onAdd={handleAdd} />
    </>
  )
}
