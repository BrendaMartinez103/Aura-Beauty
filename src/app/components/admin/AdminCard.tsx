import React from 'react'
import { Card, Button, Form, Badge } from 'react-bootstrap'
import { Edit, Trash2 } from 'lucide-react'

export interface AdminCardProps {
  id: number
  name: string
  description?: string
  countLabel?: string // Ej: 'servicios disponibles'
  countValue?: number
  imageUrl?: string
  badgeText?: string
  badgeVariant?: string
  isEditing: boolean
  editingName: string
  onEdit: (item: {
    id: number
    name: string
    description?: string
    imageUrl?: string
  }) => void
  onDelete: (id: number) => void
  onEditingNameChange: (name: string) => void
  onSaveEdit: (id: number) => void
  onCancelEdit: () => void
  onCardClick?: (id: number) => void
}

const AdminCard: React.FC<AdminCardProps> = ({
  id,
  name,
  description,
  countLabel,
  countValue,
  imageUrl,
  badgeText,
  badgeVariant = 'secondary',
  isEditing,
  editingName,
  onEdit,
  onDelete,
  onEditingNameChange,
  onSaveEdit,
  onCancelEdit,
  onCardClick,
}) => {
  return (
    <Card
      className="h-100 shadow-sm"
      style={{ cursor: onCardClick ? 'pointer' : 'default' }}
      onClick={onCardClick ? () => onCardClick(id) : undefined}
    >
      {imageUrl && <Card.Img variant="top" src={imageUrl} alt={name} />}
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
                  onSaveEdit(id)
                } else if (e.key === 'Escape') {
                  onCancelEdit()
                }
              }}
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <Card.Title className="h5 mb-1">{name}</Card.Title>
          )}
          {badgeText && (
            <Badge bg={badgeVariant} className="ms-2">
              {badgeText}
            </Badge>
          )}
        </div>
        {description && <Card.Text>{description}</Card.Text>}
        {typeof countValue === 'number' && countLabel && (
          <div className="mb-3">
            <small className="text-muted">
              <strong>{countValue}</strong> {countLabel}
            </small>
          </div>
        )}
        <div className="mt-auto d-flex gap-2 justify-content-end">
          <Button
            variant="outline-primary"
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              onEdit({ id, name, description, imageUrl })
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
              onDelete(id)
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

export default AdminCard
