import React from 'react'
import { Row, Col, Card, Spinner } from 'react-bootstrap'
import { Search } from 'lucide-react'
import CategoryCard, { Category } from '@/app/components/admin/CategoryCard'

interface CategoryGridProps {
  categories: Category[]
  loading: boolean
  editingId: number | null
  editingName: string
  onEdit: (category: Category) => void
  onDelete: (id: number) => void
  onEditingNameChange: (name: string) => void
  onSaveEdit: (id: number) => void
  onCancelEdit: () => void
  searchTerm: string
}

const CategoryGrid: React.FC<CategoryGridProps> = ({
  categories,
  loading,
  editingId,
  editingName,
  onEdit,
  onDelete,
  onEditingNameChange,
  onSaveEdit,
  onCancelEdit,
  searchTerm,
}) => (
  <Row>
    {loading ? (
      <Col xs={12} className="text-center py-5">
        <Spinner animation="border" role="status" />
        <div className="mt-3 text-muted">Cargando categorías...</div>
      </Col>
    ) : categories.length > 0 ? (
      categories.map((category) => (
        <Col key={category.id} xs={12} sm={6} lg={4} xl={3} className="mb-4">
          <CategoryCard
            category={category}
            onEdit={onEdit}
            onDelete={onDelete}
            isEditing={editingId === category.id}
            editingName={editingName}
            onEditingNameChange={onEditingNameChange}
            onSaveEdit={onSaveEdit}
            onCancelEdit={onCancelEdit}
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
)

export default CategoryGrid
