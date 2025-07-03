'use client'

import type React from 'react'
import { useState, useMemo, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { getAllCategories, getCountServicesByCategoryId } from '@/lib/data'
import DeleteCategoryModal from './DeleteCategoryModal'
import SearchBar from './SearchBar'
import CategoryInfoBar from './CategoryInfoBar'
import CategoryGrid from './CategoryGrid'
import { type Category } from '@/app/components/admin/CategoryCard'

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
          <SearchBar
            value={searchTerm}
            onChange={handleSearch}
            disabled={loading}
          />
          <CategoryInfoBar
            filteredCount={filteredCategories.length}
            totalCount={categories.length}
            searchTerm={searchTerm}
            onClear={() => setSearchTerm('')}
            loading={loading}
          />
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
      />
      <DeleteCategoryModal
        show={showDeleteModal}
        onHide={cancelDelete}
        onConfirm={confirmDelete}
      />
    </Container>
  )
}
