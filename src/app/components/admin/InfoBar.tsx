import React from 'react'
import { Button } from 'react-bootstrap'

interface InfoBarProps {
  filteredCount: number
  totalCount: number
  searchTerm: string
  onClear: () => void
  loading?: boolean
  resourceName?: string // Ej: 'categorías', 'servicios', etc.
}

const InfoBar: React.FC<InfoBarProps> = ({
  filteredCount,
  totalCount,
  searchTerm,
  onClear,
  loading = false,
  resourceName = 'elementos',
}) => (
  <div className="d-flex justify-content-between align-items-center mb-3">
    <p className="text-muted mb-0">
      {filteredCount === totalCount
        ? `Mostrando todos los ${totalCount} ${resourceName}`
        : `Mostrando ${filteredCount} de ${totalCount} ${resourceName}`}
    </p>
    {searchTerm && (
      <Button
        variant="outline-secondary"
        size="sm"
        onClick={onClear}
        disabled={loading}
      >
        Limpiar filtro
      </Button>
    )}
  </div>
)

export default InfoBar
