import React from 'react'
import { Modal, Button } from 'react-bootstrap'

interface DeleteCategoryModalProps {
  show: boolean
  onHide: () => void
  onConfirm: () => void
}

const DeleteCategoryModal: React.FC<DeleteCategoryModalProps> = ({
  show,
  onHide,
  onConfirm,
}) => (
  <Modal show={show} onHide={onHide} centered>
    <Modal.Header closeButton>
      <Modal.Title>Confirmar eliminación</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      ¿Estás seguro de que quieres eliminar esta categoría?
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={onHide}>
        Cancelar
      </Button>
      <Button variant="danger" onClick={onConfirm}>
        Eliminar
      </Button>
    </Modal.Footer>
  </Modal>
)

export default DeleteCategoryModal
