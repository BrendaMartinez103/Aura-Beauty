'use client'

import type React from 'react'
import { useState, useMemo, useEffect } from 'react'
import {
  Container,
  Row,
  Col,
  Form,
  Card,
  Button,
  Spinner,
  Modal,
} from 'react-bootstrap'
import { Search } from 'lucide-react'
import CategoryCard, {
  type Category,
} from '@/app/components/admin/CategoryCard'
import { getAllCategories, getCountServicesByCategoryId } from '@/lib/data'

export default function CategorySearch() {
  const [searchTerm, setSearchTerm] = useState('')
  const [categories, setCategories] = useState<Category[]>([])
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editingName, setEditingName] = useState('')
  const [loading, setLoading] = useState(true)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [categoryToDelete, setCategoryToDelete] = useState<number | null>(null)

  const fetchCategories = async () => {
    setLoading(true)
    const rawCategoriesData = await getAllCategories()
    const enriched = await Promise.all(
      rawCategoriesData.map(async (cat: { id: number; nombre: string }) => ({
        id: cat.id,
        name: cat.nombre,
        serviceCount: await getCountServicesByCategoryId(cat.id),
      }))
    )
    setCategories(enriched)
    setLoading(false)
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  // Filtrar categorías basado en el término de búsqueda
  const filteredCategories = useMemo(() => {
    if (!searchTerm.trim()) {
      return categories
    }
    return categories.filter((category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [categories, searchTerm])

  const handleDelete = (id: number) => {
    setCategoryToDelete(id)
    setShowDeleteModal(true)
  }

  const confirmDelete = () => {
    if (categoryToDelete !== null) {
      setCategories((prev) => prev.filter((cat) => cat.id !== categoryToDelete))
    }
    setShowDeleteModal(false)
    setCategoryToDelete(null)
  }

  const cancelDelete = () => {
    setShowDeleteModal(false)
    setCategoryToDelete(null)
  }

  const handleEdit = (category: Category) => {
    setEditingId(category.id)
    setEditingName(category.name)
  }

  const handleSaveEdit = (id: number) => {
    if (editingName.trim()) {
      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === id ? { ...cat, name: editingName.trim() } : cat
        )
      )
    }
    setEditingId(null)
    setEditingName('')
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setEditingName('')
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  return (
    <Container fluid className="py-4">
      <Row className="mb-4">
        <Col>
          <h2 className="mb-3">Gestión de Categorías de Servicios</h2>

          {/* Barra de búsqueda */}
          <div className="position-relative mb-4">
            <Form.Control
              type="text"
              placeholder="Buscar categorías por nombre o descripción..."
              value={searchTerm}
              onChange={handleSearch}
              className="ps-5"
              size="lg"
              disabled={loading}
            />
            <Search
              className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
              size={20}
            />
          </div>

          {/* Información de resultados */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <p className="text-muted mb-0">
              {filteredCategories.length === categories.length
                ? `Mostrando todas las ${categories.length} categorías`
                : `Mostrando ${filteredCategories.length} de ${categories.length} categorías`}
            </p>

            {searchTerm && (
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={() => setSearchTerm('')}
                disabled={loading}
              >
                Limpiar filtro
              </Button>
            )}
          </div>
        </Col>
      </Row>

      {/* Grid de tarjetas */}
      <Row>
        {loading ? (
          <Col xs={12} className="text-center py-5">
            <Spinner animation="border" role="status" />
            <div className="mt-3 text-muted">Cargando categorías...</div>
          </Col>
        ) : filteredCategories.length > 0 ? (
          filteredCategories.map((category) => (
            <Col
              key={category.id}
              xs={12}
              sm={6}
              lg={4}
              xl={3}
              className="mb-4"
            >
              <CategoryCard
                category={category}
                onEdit={handleEdit}
                onDelete={handleDelete}
                isEditing={editingId === category.id}
                editingName={editingName}
                onEditingNameChange={setEditingName}
                onSaveEdit={handleSaveEdit}
                onCancelEdit={handleCancelEdit}
              />
            </Col>
          ))
        ) : (
          <Col xs={12}>
            <Card className="text-center py-5">
              <Card.Body>
                <Search size={48} className="text-muted mb-3" />
                <h5 className="text-muted">No se encontraron categorías</h5>
                <p className="text-muted mb-0">
                  {searchTerm
                    ? `No hay categorías que coincidan con "${searchTerm}"`
                    : 'No hay categorías disponibles'}
                </p>
              </Card.Body>
            </Card>
          </Col>
        )}
      </Row>

      {/* Modal de confirmación de borrado */}
      <Modal show={showDeleteModal} onHide={cancelDelete} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que quieres eliminar esta categoría?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelDelete}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}
