'use client'

import React, { useState } from 'react'
import { Table, Alert, Button } from 'react-bootstrap'
import PedidoDetalleModal, { ServicioPedido } from './PedidoDetalleModal'

export interface Pedido {
  id: number
  usuario: string
  fecha: string
  hora?: string
  nroTransaccion: string
  total: number
  servicios?: ServicioPedido[]
}

interface PedidosTableProps {
  pedidos: Pedido[]
}

type ColumnaOrdenable = keyof Pick<
  Pedido,
  'id' | 'usuario' | 'fecha' | 'nroTransaccion' | 'total'
>

const PedidosTable = ({ pedidos }: PedidosTableProps) => {
  const [showModal, setShowModal] = useState(false)
  const [serviciosSeleccionados, setServiciosSeleccionados] = useState<
    ServicioPedido[]
  >([])
  const [columnaOrden, setColumnaOrden] = useState<ColumnaOrdenable>('id')
  const [direccion, setDireccion] = useState<'asc' | 'desc'>('asc')

  const handleOrdenar = (col: ColumnaOrdenable) => {
    if (columnaOrden === col) {
      setDireccion(direccion === 'asc' ? 'desc' : 'asc')
    } else {
      setColumnaOrden(col)
      setDireccion('asc')
    }
  }

  const pedidosOrdenados = [...pedidos].sort((a, b) => {
    const aValue = a[columnaOrden]
    const bValue = b[columnaOrden]
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return direccion === 'asc' ? aValue - bValue : bValue - aValue
    }
    return direccion === 'asc'
      ? String(aValue).localeCompare(String(bValue))
      : String(bValue).localeCompare(String(aValue))
  })

  const handleVerDetalles = (servicios: ServicioPedido[] = []) => {
    setServiciosSeleccionados(servicios || [])
    setShowModal(true)
  }

  if (!pedidos || pedidos.length === 0) {
    return <Alert variant="info">No hay pedidos.</Alert>
  }

  const iconoOrden = (col: ColumnaOrdenable) => {
    if (columnaOrden !== col) return null
    return direccion === 'asc' ? ' ▲' : ' ▼'
  }

  return (
    <>
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th
              style={{ cursor: 'pointer' }}
              onClick={() => handleOrdenar('id')}
            >
              ID{iconoOrden('id')}
            </th>
            <th
              style={{ cursor: 'pointer' }}
              onClick={() => handleOrdenar('usuario')}
            >
              Usuario{iconoOrden('usuario')}
            </th>
            <th
              style={{ cursor: 'pointer' }}
              onClick={() => handleOrdenar('fecha')}
            >
              Fecha y Hora{iconoOrden('fecha')}
            </th>
            <th
              style={{ cursor: 'pointer' }}
              onClick={() => handleOrdenar('nroTransaccion')}
            >
              Nro. Transacción{iconoOrden('nroTransaccion')}
            </th>
            <th
              style={{ cursor: 'pointer' }}
              onClick={() => handleOrdenar('total')}
            >
              Total{iconoOrden('total')}
            </th>
            <th>Detalles</th>
          </tr>
        </thead>
        <tbody>
          {pedidosOrdenados.map((pedido) => (
            <tr key={pedido.id}>
              <td>{pedido.id}</td>
              <td>{pedido.usuario}</td>
              <td>{pedido.fecha}</td>
              <td>{pedido.nroTransaccion}</td>
              <td>${pedido.total.toFixed(2)}</td>
              <td>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleVerDetalles(pedido.servicios)}
                >
                  Ver detalles
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <PedidoDetalleModal
        show={showModal}
        onHide={() => setShowModal(false)}
        servicios={serviciosSeleccionados}
      />
    </>
  )
}

export default PedidosTable
