import React, { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'

interface AddCategoryModalProps {
  show: boolean
  onHide: () => void
  onAdd: (name: string) => Promise<void>
}

const AddCategoryModal: React.FC<AddCategoryModalProps> = ({ show, onHide, onAdd }) => {
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleAdd = async () => {
    if (!name.trim()) {
      setError('El nombre es obligatorio')
      return
    }
    setLoading(true)
    try {
      await onAdd(name.trim())
      setName('')
      setError('')
      onHide()
    } catch (e) {
      setError('Error al agregar la categoría')
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    setName('')
    setError('')
    onHide()
  }

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Agregar nueva categoría</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label>Nombre de la categoría</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Ej: Belleza, Peluquería, etc."
            autoFocus
            disabled={loading}
          />
          {error && <div className="text-danger mt-2">{error}</div>}
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose} disabled={loading}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleAdd} disabled={loading}>
          Agregar
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AddCategoryModal
