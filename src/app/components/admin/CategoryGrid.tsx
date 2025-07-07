import React from 'react'
import { Row, Col, Card, Spinner } from 'react-bootstrap'
import { Search } from 'lucide-react'
import AdminCard from './AdminCard'
import { CategoryCardData as Category } from '@/types'

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
  onCardClick?: (id: number) => void
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
  onCardClick,
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
          <AdminCard
            id={category.id}
            name={category.name}
            countLabel="servicios disponibles"
            countValue={category.serviceCount}
            isEditing={editingId === category.id}
            editingName={editingName}
            onEdit={() => onEdit(category)}
            onDelete={onDelete}
            onEditingNameChange={onEditingNameChange}
            onSaveEdit={onSaveEdit}
            onCancelEdit={onCancelEdit}
            onCardClick={onCardClick}
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
