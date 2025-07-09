'use client'

import { FaTrash } from 'react-icons/fa'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface ItemCarrito {
  servicioId: number
  nombre: string
  precio: number
  cantidad: number | string
  imageUrl: string
}

export default function CarritoPage() {
  const router = useRouter()
  const [carrito, setCarrito] = useState<ItemCarrito[]>([])

  const fetchCarrito = async () => {
    try {
      const res = await fetch('/api/carrito')
      if (!res.ok) return console.error('Error al obtener carrito:', res.status)
      const data = await res.json()
      setCarrito(data)
    } catch (error) {
      console.error('Error cargando carrito:', error)
    }
  }

  const eliminarServicio = async (servicioId: number) => {
    await fetch(`/api/carrito`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ servicioId }),
    })
    fetchCarrito()
  }

  const actualizarCantidad = async (servicioId: number, cantidad: number) => {
    await fetch(`/api/carrito`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ servicioId, cantidad }),
    })
    fetchCarrito()
  }

  const handleInputChange = (servicioId: number, value: string) => {
    setCarrito((prev) =>
      prev.map((item) =>
        item.servicioId === servicioId
          ? { ...item, cantidad: value === '' ? '' : parseInt(value) }
          : item
      )
    )
  }

  const handleFinalizarCompra = async () => {
    try {
      const items = carrito.map((item) => ({
        id: item.servicioId.toString(),
        title: item.nombre,
        quantity: item.cantidad,
        unit_price: item.precio,
      }))
      const res = await fetch('/api/pago', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      })
      const data = await res.json()
      if (data.init_point) {
        router.push(data.init_point)
      } else {
        alert(data.error || 'No se pudo obtener el enlace de pago')
      }
    } catch (error) {
      alert('Error al procesar el pago')
      console.error(error)
    }
  }

  const total = carrito.reduce((acc, item) => {
    const cantidad = typeof item.cantidad === 'number' ? item.cantidad : 0
    return acc + item.precio * cantidad
  }, 0)

  return (
    <main className="container py-5">
      <h1 className="text-purple fw-bold mb-4">Tu Carrito</h1>

      {status === 'loading' ? (
        <p className="text-muted">Cargando carrito...</p>
      ) : carrito.length === 0 ? (
        <p className="text-muted">Carrito vacio</p>
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
                    <td>{item.nombre}</td>
                    <td>${item.precio}</td>
                    <td>
                      <input
                        type="number"
                        min={1}
                        className="form-control form-control-sm w-50"
                        value={item.cantidad}
                        onChange={(e) =>
                          handleInputChange(item.servicioId, e.target.value)
                        }
                        onBlur={() => {
                          const cantidad = parseInt(item.cantidad.toString())
                          if (!isNaN(cantidad) && cantidad > 0) {
                            actualizarCantidad(item.servicioId, cantidad)
                          } else {
                            fetchCarrito() // Restaurar si el input queda inválido
                          }
                        }}
                      />
                    </td>
                    <td>
                      $
                      {typeof item.cantidad === 'number'
                        ? item.precio * item.cantidad
                        : 0}
                    </td>
                    <td>
                      <button
                        onClick={() => eliminarServicio(item.servicioId)}
                        className="btn btn-sm btn-outline-danger"
                        title="Eliminar servicio del carrito"
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
            <button className="btn btn-primary" onClick={handleFinalizarCompra}>
              Finalizar compra
            </button>
            <button
              className="btn btn-outline-primary"
              style={{ padding: '6px 14px', fontWeight: '500' }}
              onClick={() => router.push('/reserva')}
            >
              Seguir comprando
            </button>
          </div>
        </>
      )}
    </main>
  )
}
