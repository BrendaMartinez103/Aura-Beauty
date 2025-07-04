'use client'
import { FaTrash } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

interface ItemCarrito {
  servicioId: number
  nombre: string
  precio: number
  cantidad: number
  imageUrl: string
}

export default function CarritoPage() {
  const { status } = useSession()
  const router = useRouter()
  const [carrito, setCarrito] = useState<ItemCarrito[]>([])

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login')
    if (status === 'authenticated') fetchCarrito()
  }, [status, router])

  const fetchCarrito = async () => {
  try {
  const res = await fetch('/api/carrito')

  if (!res.ok) {
    console.error('Error al obtener carrito:', res.status)
    return
  }

  const text = await res.text()
  if (!text) {
    console.warn('Respuesta vacía')
    return
  }

  const data = JSON.parse(text)
  setCarrito(data)
} catch (error) {
  console.error('Error cargando carrito:', error)
}

  }

  const eliminarItem = async (servicioId: number) => {
    await fetch(`/api/carrito`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ servicioId, cantidad: -1 }),
    })
    fetchCarrito()
  }

  const total = carrito.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  )

  return (
    <main className="container py-5">
      <h1 className="text-purple fw-bold mb-4">Tu Carrito</h1>

      {carrito.length === 0 ? (
        <p className="text-muted">Cargando carrito....</p>
      ) : (
        <>
          <div className="table-responsive">
            <table className="table align-middle">
              <thead>
                <tr>
                  <th>Servicio</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th>Subtotal</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {carrito.map((item) => (
                  <tr key={item.servicioId}>
                    <td>
                      <div className="d-flex align-items-center gap-3">
                        {item.nombre}
                      </div>
                    </td>
                    <td>${item.precio}</td>
                    <td>{item.cantidad}</td>
                    <td>${item.precio * item.cantidad}</td>
                    <td>
                      <button
                        onClick={() => eliminarItem(item.servicioId)}
                        className="btn-trash"
                        title="Eliminar 1 unidad"
                      >
                        <FaTrash size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="text-end mt-4">
            <h4>Total: ${total.toLocaleString('es-AR')}</h4>
            <button className="btn btn-primary mt-2">
              Finalizar reserva
            </button>
            <button
              className="btn btn-purple mt-3 ms-2"
              onClick={() => router.push('/reserva')}
              >
              ← Seguir comprando
            </button>
          </div>
        </>
      )}
    </main>
  )
}
