import React from 'react'
import { Button } from 'react-bootstrap'

interface CategoryInfoBarProps {
  filteredCount: number
  totalCount: number
  searchTerm: string
  onClear: () => void
  loading: boolean
}

const CategoryInfoBar: React.FC<CategoryInfoBarProps> = ({
  filteredCount,
  totalCount,
  searchTerm,
  onClear,
  loading,
}) => (
  <div className="d-flex justify-content-between align-items-center mb-3">
    <p className="text-muted mb-0">
      {filteredCount === totalCount
        ? `Mostrando todas las ${totalCount} categorías`
        : `Mostrando ${filteredCount} de ${totalCount} categorías`}
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

export default CategoryInfoBar
