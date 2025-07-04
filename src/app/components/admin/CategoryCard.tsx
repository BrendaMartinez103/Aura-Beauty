'use client'

import type React from 'react'
import { Card, Button, Form } from 'react-bootstrap'
import { Edit, Trash2 } from 'lucide-react'
import { useRouter, usePathname } from 'next/navigation'

interface Category {
  id: number
  name: string
  serviceCount: number
}

interface CategoryCardProps {
  category: Category
  onEdit: (category: Category) => void
  onDelete: (id: number) => void
  isEditing: boolean
  editingName: string
  onEditingNameChange: (name: string) => void
  onSaveEdit: (id: number) => void
  onCancelEdit: () => void
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  onEdit,
  onDelete,
  isEditing,
  editingName,
  onEditingNameChange,
  onSaveEdit,
  onCancelEdit,
}) => {
  const router = useRouter()
  const pathname = usePathname()
  return (
    <Card
      className="h-100 shadow-sm"
      style={{ cursor: 'pointer' }}
      onClick={() => router.push(`${pathname}/${category.id}`)}
    >
      <Card.Body className="d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-2">
          {isEditing ? (
            <Form.Control
              type="text"
              value={editingName}
              onChange={(e) => onEditingNameChange(e.target.value)}
              className="me-2"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  onSaveEdit(category.id)
                } else if (e.key === 'Escape') {
                  onCancelEdit()
                }
              }}
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <Card.Title className="h5 mb-1">{category.name}</Card.Title>
          )}
        </div>
        <div className="mb-3">
          <small className="text-muted">
            <strong>{category.serviceCount}</strong> servicios disponibles
          </small>
        </div>

        <div className="mt-auto d-flex gap-2 justify-content-end">
          <Button
            variant="outline-primary"
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              onEdit(category)
            }}
            disabled={isEditing}
          >
            <Edit size={16} />
            Editar
          </Button>
          <Button
            variant="outline-danger"
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              onDelete(category.id)
            }}
            disabled={isEditing}
          >
            <Trash2 size={16} />
            Eliminar
          </Button>
        </div>
      </Card.Body>
    </Card>
  )
}

export default CategoryCard
export type { Category, CategoryCardProps }
