import React from 'react'
import { Modal, Button, Table } from 'react-bootstrap'

export interface ServicioPedido {
  nombre: string
  cantidad: number
  precioUnitario: number
}

interface PedidoDetalleModalProps {
  show: boolean
  onHide: () => void
  servicios: ServicioPedido[]
}

const PedidoDetalleModal: React.FC<PedidoDetalleModalProps> = ({
  show,
  onHide,
  servicios,
}) => {
  return (
    <Modal show={show} onHide={onHide} scrollable>
      <Modal.Header closeButton>
        <Modal.Title>Detalle de Servicios</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Servicio</th>
              <th>Cantidad</th>
              <th>Precio Unitario</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {servicios.map((servicio, idx) => (
              <tr key={idx}>
                <td>{servicio.nombre}</td>
                <td>{servicio.cantidad}</td>
                <td>${servicio.precioUnitario.toFixed(2)}</td>
                <td>
                  ${(servicio.precioUnitario * servicio.cantidad).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default PedidoDetalleModal
