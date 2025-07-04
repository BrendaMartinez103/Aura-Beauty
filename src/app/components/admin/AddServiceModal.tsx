import React, { useState, useEffect } from 'react'
import { Modal, Button, Form, Row, Col } from 'react-bootstrap'

export interface ServiceModalData {
  nombre: string
  descripcion: string
  precio: number | string
  duracion: number | string
  activo: boolean
  categoriaId: number | ''
  imageUrl?: string
}

interface AddOrEditServiceModalProps {
  show: boolean
  onHide: () => void
  onSubmit: (data: ServiceModalData) => Promise<void>
  categorias: { id: number; nombre: string }[]
  initialData?: ServiceModalData
  isEdit?: boolean
}

const AddOrEditServiceModal: React.FC<AddOrEditServiceModalProps> = ({
  show,
  onHide,
  onSubmit,
  categorias,
  initialData,
  isEdit = false,
}) => {
  const [nombre, setNombre] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [precio, setPrecio] = useState('')
  const [duracion, setDuracion] = useState('')
  const [activo, setActivo] = useState(true)
  const [categoriaId, setCategoriaId] = useState<number | ''>('')
  const [imageUrl, setImageUrl] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (show && initialData) {
      setNombre(initialData.nombre || '')
      setDescripcion(initialData.descripcion || '')
      setPrecio(initialData.precio?.toString() || '')
      setDuracion(initialData.duracion?.toString() || '')
      setActivo(initialData.activo ?? true)
      setCategoriaId(initialData.categoriaId ?? '')
      setImageUrl(initialData.imageUrl || '')
    } else if (show) {
      setNombre('')
      setDescripcion('')
      setPrecio('')
      setDuracion('')
      setActivo(true)
      setCategoriaId('')
      setImageUrl('')
    }
    setError('')
  }, [show, initialData])

  const handleSubmit = async () => {
    if (
      !nombre.trim() ||
      !descripcion.trim() ||
      !precio ||
      !duracion ||
      !categoriaId
    ) {
      setError('Todos los campos son obligatorios')
      return
    }
    setLoading(true)
    try {
      await onSubmit({
        nombre: nombre.trim(),
        descripcion: descripcion.trim(),
        precio: Number(precio),
        duracion: Number(duracion),
        activo,
        categoriaId: Number(categoriaId),
        imageUrl: imageUrl.trim() || undefined,
      })
      onHide()
    } catch {
      setError(
        isEdit ? 'Error al editar el servicio' : 'Error al agregar el servicio'
      )
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    setNombre('')
    setDescripcion('')
    setPrecio('')
    setDuracion('')
    setActivo(true)
    setCategoriaId('')
    setImageUrl('')
    setError('')
    onHide()
  }

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {isEdit ? 'Editar servicio' : 'Agregar nuevo servicio'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            autoFocus
            disabled={loading}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Descripción</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            disabled={loading}
          />
        </Form.Group>
        <Row>
          <Col md={6} className="mb-3">
            <Form.Group>
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                min={0}
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
                disabled={loading}
              />
            </Form.Group>
          </Col>
          <Col md={6} className="mb-3">
            <Form.Group>
              <Form.Label>Duración (minutos)</Form.Label>
              <Form.Control
                type="number"
                min={1}
                value={duracion}
                onChange={(e) => setDuracion(e.target.value)}
                disabled={loading}
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group className="mb-3">
          <Form.Label>Categoría</Form.Label>
          <Form.Select
            value={categoriaId}
            onChange={(e) => setCategoriaId(Number(e.target.value))}
            disabled={loading}
          >
            <option value="">Selecciona una categoría</option>
            {categorias.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.nombre}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Imagen (URL)</Form.Label>
          <Form.Control
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            disabled={loading}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Check
            type="switch"
            id="activo-switch"
            label="Servicio activo"
            checked={activo}
            onChange={() => setActivo((a) => !a)}
            disabled={loading}
          />
        </Form.Group>
        {error && <div className="text-danger mt-2">{error}</div>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose} disabled={loading}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSubmit} disabled={loading}>
          {isEdit ? 'Guardar cambios' : 'Agregar'}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AddOrEditServiceModal
