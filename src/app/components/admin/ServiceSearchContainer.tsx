'use client'
import React, { useState, useMemo } from 'react'
import ServiceGrid from './ServiceGrid'
import SearchBar from './SearchBar'
import { Button, Col, Container, Row, Alert } from 'react-bootstrap'
import { Plus } from 'lucide-react'
import InfoBar from './InfoBar'
import { updateService, deleteService, getAllServices } from '@/lib/data'
import { ServiceCardData } from '@/types'

interface ServiceSearchContainerProps {
  servicios: ServiceCardData[]
}

const ServiceSearchContainer: React.FC<ServiceSearchContainerProps> = ({
  servicios: initialServicios = [],
}) => {
  const [search, setSearch] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [actionLoading, setActionLoading] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editingName, setEditingName] = useState('')
  const [services, setServices] = useState<ServiceCardData[]>(initialServicios)
  const [actionError, setActionError] = useState<string | null>(null)
  const [actionSuccess, setActionSuccess] = useState<string | null>(null)

  const filtered = useMemo(() => {
    if (!search.trim()) {
      return services
    }
    return services.filter((s) =>
      s.nombre.toLowerCase().includes(search.toLowerCase())
    )
  }, [services, search])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const fetchServices = async () => {
    setActionLoading(true)
    const all = await getAllServices()
    setServices(all)
    setActionLoading(false)
  }

  const handleEdit = (servicio: ServiceCardData) => {
    setEditingId(servicio.id)
    setEditingName(servicio.nombre)
  }

  const handleSaveEdit = async (id: number) => {
    setActionError(null)
    setActionLoading(true)
    if (editingName.trim()) {
      try {
        await updateService(id, { nombre: editingName.trim() })
        await fetchServices()
        setActionSuccess('Servicio editado correctamente.')
      } catch {
        setActionError('Error al editar el servicio.')
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

  const handleDelete = async (id: number) => {
    setActionError(null)
    setActionLoading(true)
    try {
      await deleteService(id)
      await fetchServices()
      setActionSuccess('Servicio eliminado correctamente.')
    } catch {
      setActionError('Error al eliminar el servicio.')
    }
    setActionLoading(false)
  }

  return (
    <Container fluid>
      <Row className="justify-content-end mb-4">
        <Col>
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
          <SearchBar
            value={search}
            onChange={handleSearch}
            placeholder="Buscar servicios..."
          />
          <InfoBar
            filteredCount={filtered.length}
            totalCount={services.length}
            searchTerm={search}
            onClear={() => setSearch('')}
            loading={actionLoading}
            resourceName="servicios"
          />
          <div className="d-flex justify-content-end">
            <Button
              variant="primary"
              onClick={() => setShowAddModal(true)}
              disabled={actionLoading}
            >
              <Plus size={18} className="me-2" /> Agregar servicio
            </Button>
          </div>
        </Col>
      </Row>
      <ServiceGrid
        servicios={filtered}
        editingId={editingId}
        editingName={editingName}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onEditingNameChange={setEditingName}
        onSaveEdit={handleSaveEdit}
        onCancelEdit={handleCancelEdit}
      />
    </Container>
  )
}

export default ServiceSearchContainer
