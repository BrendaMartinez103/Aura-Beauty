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

const PedidosTable = ({ pedidos }: PedidosTableProps) => {
  const [showModal, setShowModal] = useState(false)
  const [serviciosSeleccionados, setServiciosSeleccionados] = useState<
    ServicioPedido[]
  >([])

  const handleVerDetalles = (servicios: ServicioPedido[] = []) => {
    setServiciosSeleccionados(servicios || [])
    setShowModal(true)
  }

  if (!pedidos || pedidos.length === 0) {
    return <Alert variant="info">No hay pedidos.</Alert>
  }

  return (
    <>
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Usuario</th>
            <th>Fecha y Hora</th>
            <th>Nro. Transacción</th>
            <th>Total</th>
            <th>Detalles</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map((pedido) => (
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
