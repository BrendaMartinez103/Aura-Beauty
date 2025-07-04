import React from 'react'
import { Row, Col } from 'react-bootstrap'
import AdminCard from './AdminCard'
import { ServiceCardData } from '@/types'

interface ServiceGridProps {
  servicios: ServiceCardData[]
  editingId?: number | null
  editingName?: string
  onEdit?: (servicio: ServiceCardData) => void
  onDelete?: (id: number) => void
  onEditingNameChange?: (name: string) => void
  onSaveEdit?: (id: number) => void
  onCancelEdit?: () => void
  onCardClick?: (id: number) => void
}

const ServiceGrid: React.FC<ServiceGridProps> = ({
  servicios,
  editingId = null,
  editingName = '',
  onEdit = () => {},
  onDelete = () => {},
  onEditingNameChange = () => {},
  onSaveEdit = () => {},
  onCancelEdit = () => {},
  onCardClick,
}) => {
  if (servicios.length === 0) {
    return <p>No hay servicios para mostrar.</p>
  }
  return (
    <Row>
      {servicios.map((servicio) => (
        <Col key={servicio.id} xs={12} md={6} lg={4} className="mb-4">
          <AdminCard
            id={servicio.id}
            name={servicio.nombre}
            description={servicio.descripcion}
            imageUrl={servicio.imageUrl}
            badgeText={servicio.activo ? 'Activo' : 'Inactivo'}
            badgeVariant={servicio.activo ? 'success' : 'secondary'}
            countLabel="min"
            countValue={servicio.duracion}
            isEditing={editingId === servicio.id}
            editingName={editingName}
            onEdit={() => onEdit(servicio)}
            onDelete={onDelete}
            onEditingNameChange={onEditingNameChange}
            onSaveEdit={onSaveEdit}
            onCancelEdit={onCancelEdit}
            onCardClick={onCardClick}
          />
        </Col>
      ))}
    </Row>
  )
}

export default ServiceGrid
