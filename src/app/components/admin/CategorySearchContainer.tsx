'use client'

import type React from 'react'
import { useState, useMemo, useEffect } from 'react'
import { Container, Row, Col, Button, Alert } from 'react-bootstrap'
import {
  getAllCategories,
  getCountServicesByCategoryId,
  createCategory,
  updateCategory,
  deleteCategory,
} from '@/lib/data'
import SearchBar from './SearchBar'
import InfoBar from './InfoBar'
import CategoryGrid from './CategoryGrid'
import AddCategoryModal from './AddCategoryModal'
import { type CategoryCardData } from '@/types'
import { Plus } from 'lucide-react'
import ConfirmModal from './ConfirmModal'
import { useRouter } from 'next/navigation'

export default function CategorySearch() {
  const [searchTerm, setSearchTerm] = useState('')
  const [categories, setCategories] = useState<CategoryCardData[]>([])
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editingName, setEditingName] = useState('')
  const [loading, setLoading] = useState(true)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [categoryToDelete, setCategoryToDelete] = useState<number | null>(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [actionError, setActionError] = useState<string | null>(null)
  const [actionSuccess, setActionSuccess] = useState<string | null>(null)
  const [actionLoading, setActionLoading] = useState(false)
  const router = useRouter()

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

  useEffect(() => {
    if (actionSuccess) {
      const timer = setTimeout(() => setActionSuccess(null), 3000)
      return () => clearTimeout(timer)
    }
  }, [actionSuccess])

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

  const confirmDelete = async () => {
    setActionError(null)
    setActionLoading(true)
    if (categoryToDelete !== null) {
      try {
        const serviceCount =
          await getCountServicesByCategoryId(categoryToDelete)
        if (serviceCount > 0) {
          setActionError(
            'No se puede eliminar la categoría porque tiene servicios asociados.'
          )
        } else {
          await deleteCategory(categoryToDelete)
          await fetchCategories()
          setActionSuccess('Categoría eliminada correctamente.')
        }
      } catch {
        setActionError('Error al eliminar la categoría.')
      }
    }
    setActionLoading(false)
    setShowDeleteModal(false)
    setCategoryToDelete(null)
  }

  const cancelDelete = () => {
    setShowDeleteModal(false)
    setCategoryToDelete(null)
  }

  const handleEdit = (category: CategoryCardData) => {
    setEditingId(category.id)
    setEditingName(category.name)
  }

  const handleSaveEdit = async (id: number) => {
    setActionError(null)
    setActionLoading(true)
    if (editingName.trim()) {
      try {
        await updateCategory(id, editingName.trim())
        await fetchCategories()
        setActionSuccess('Categoría editada correctamente.')
      } catch {
        setActionError('Error al editar la categoría.')
      }
    }
    setActionLoading(false)
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

  const handleAddCategory = async (name: string) => {
    setActionError(null)
    setActionLoading(true)
    try {
      await createCategory(name)
      await fetchCategories()
      setActionSuccess('Categoría agregada correctamente.')
    } catch {
      setActionError('Error al agregar la categoría.')
    }
    setActionLoading(false)
  }

  const handleCardClick = (id: number) => {
    router.push(`/admin/servicios/${id}`)
  }

  return (
    <Container fluid>
      <Row className="justify-content-end mb-4">
        <Col>
          {/* Mensajes de feedback */}
          {actionError && (
            <Alert
              variant="danger"
              onClose={() => setActionError(null)}
              dismissible
            >
              {actionError}
            </Alert>
          )}
          {actionSuccess && (
            <Alert
              variant="success"
              onClose={() => setActionSuccess(null)}
              dismissible
            >
              {actionSuccess}
            </Alert>
          )}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="mb-0">Gestión de Categorías</h2>
          </div>
          <SearchBar
            value={searchTerm}
            onChange={handleSearch}
            disabled={loading}
            placeholder="Buscar categorías..."
          />
          <InfoBar
            filteredCount={filteredCategories.length}
            totalCount={categories.length}
            searchTerm={searchTerm}
            onClear={() => setSearchTerm('')}
            loading={loading}
            resourceName="categorías"
          />
          <div className="d-flex justify-content-end">
            <Button
              variant="primary"
              onClick={() => setShowAddModal(true)}
              disabled={actionLoading}
            >
              <Plus size={18} className="me-2" /> Agregar categoría
            </Button>
          </div>
        </Col>
      </Row>
      <CategoryGrid
        categories={filteredCategories}
        loading={loading}
        editingId={editingId}
        editingName={editingName}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onEditingNameChange={setEditingName}
        onSaveEdit={handleSaveEdit}
        onCancelEdit={handleCancelEdit}
        searchTerm={searchTerm}
        onCardClick={handleCardClick}
      />
      <ConfirmModal
        show={showDeleteModal}
        onHide={cancelDelete}
        onConfirm={confirmDelete}
        title="Confirmar eliminación"
        message="¿Estás seguro de que quieres eliminar esta categoría?"
        confirmText="Eliminar"
        cancelText="Cancelar"
        confirmVariant="danger"
      />
      <AddCategoryModal
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        onAdd={handleAddCategory}
      />
    </Container>
  )
}
