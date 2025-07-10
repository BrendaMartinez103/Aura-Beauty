'use client'
import React, { useState, useMemo } from 'react'
import ServiceGrid from './ServiceGrid'
import SearchBar from './SearchBar'
import { Button, Col, Container, Row, Alert } from 'react-bootstrap'
import { Plus } from 'lucide-react'
import InfoBar from './InfoBar'
import {
  updateService,
  deleteService,
  getAllServices,
  createService,
  getAllCategories,
  getServiceByCategoryId,
} from '@/lib/data'
import { ServiceCardData } from '@/types'
import AddOrEditServiceModal, { ServiceModalData } from './AddServiceModal'
import ConfirmModal from './ConfirmModal'

interface ServiceSearchContainerProps {
  servicios: ServiceCardData[]
  categoria?: number
}

const ServiceSearchContainer: React.FC<ServiceSearchContainerProps> = ({
  servicios: initialServicios = [],
  categoria,
}) => {
  const [search, setSearch] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [actionLoading, setActionLoading] = useState(false)
  const [services, setServices] = useState<ServiceCardData[]>(initialServicios)
  const [actionError, setActionError] = useState<string | null>(null)
  const [actionSuccess, setActionSuccess] = useState<string | null>(null)
  const [categorias, setCategorias] = useState<
    { id: number; nombre: string }[]
  >([])
  const [serviceToEdit, setServiceToEdit] = useState<ServiceCardData | null>(
    null
  )
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [serviceIdToDelete, setServiceIdToDelete] = useState<number | null>(
    null
  )

  React.useEffect(() => {
    // Cargar categorías al montar
    getAllCategories().then(setCategorias)
  }, [])

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
    const all = categoria
      ? await getServiceByCategoryId(categoria)
      : await getAllServices()
    setServices(all)
    setActionLoading(false)
  }

  const handleEdit = (servicio: ServiceCardData) => {
    setServiceToEdit(servicio)
    setShowEditModal(true)
  }

  const handleEditService = async (data: ServiceModalData) => {
    setActionError(null)
    setActionLoading(true)
    try {
      if (serviceToEdit) {
        // Check if the service still exists before updating
        const exists = services.some((s) => s.id === serviceToEdit.id)
        if (!exists) {
          setActionError('El servicio ya no existe o fue eliminado.')
          setActionLoading(false)
          setShowEditModal(false)
          setServiceToEdit(null)
          return
        }
        // Convert fields to correct types for updateService
        await updateService(serviceToEdit.id, {
          nombre: data.nombre,
          descripcion: data.descripcion,
          precio: Number(data.precio),
          duracion: Number(data.duracion),
          activo: data.activo,
          categoriaId: Number(data.categoriaId),
          imageUrl: data.imageUrl?.trim() || undefined,
        })
        await fetchServices()
        setActionSuccess('Servicio editado correctamente.')
      }
    } catch (e) {
      const error = e as { code?: string }
      if (error) {
        setActionError(
          'No se encontró el servicio para editar. Puede que haya sido eliminado.'
        )
      } else {
        setActionError('Error al editar el servicio.')
      }
    }
    setActionLoading(false)
    setShowEditModal(false)
    setServiceToEdit(null)
  }

  const handleRequestDelete = (id: number) => {
    setServiceIdToDelete(id)
    setShowConfirmModal(true)
  }

  const handleConfirmDelete = async () => {
    if (serviceIdToDelete === null) return
    setActionError(null)
    setActionLoading(true)
    try {
      await deleteService(serviceIdToDelete)
      await fetchServices()
      setActionSuccess('Servicio eliminado correctamente.')
    } catch {
      setActionError('Error al eliminar el servicio.')
    }
    setActionLoading(false)
    setShowConfirmModal(false)
    setServiceIdToDelete(null)
  }

  const handleAddService = async (data: ServiceModalData) => {
    setActionError(null)
    setActionLoading(true)
    try {
      await createService(
        data.nombre,
        data.descripcion,
        Number(data.precio),
        Number(data.duracion),
        data.activo,
        Number(data.categoriaId),
        data.imageUrl?.trim() || undefined
      )
      await fetchServices()
      setActionSuccess('Servicio agregado correctamente.')
    } catch {
      setActionError('Error al agregar el servicio.')
    }
    setActionLoading(false)
    setShowAddModal(false)
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
        onEdit={handleEdit}
        onDelete={handleRequestDelete}
      />
      <AddOrEditServiceModal
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        onSubmit={handleAddService}
        categorias={categorias}
        isEdit={false}
      />
      <AddOrEditServiceModal
        show={showEditModal}
        onHide={() => {
          setShowEditModal(false)
          setServiceToEdit(null)
        }}
        onSubmit={handleEditService}
        categorias={categorias}
        initialData={
          serviceToEdit
            ? {
                nombre: serviceToEdit.nombre,
                descripcion: serviceToEdit.descripcion,
                precio: serviceToEdit.precio,
                duracion: serviceToEdit.duracion,
                activo: serviceToEdit.activo,
                categoriaId:
                  (serviceToEdit as unknown as { categoriaId?: number })
                    .categoriaId ?? '',
                imageUrl: serviceToEdit.imageUrl || '',
              }
            : undefined
        }
        isEdit={true}
      />
      <ConfirmModal
        show={showConfirmModal}
        onHide={() => {
          setShowConfirmModal(false)
          setServiceIdToDelete(null)
        }}
        onConfirm={handleConfirmDelete}
        title="Eliminar servicio"
        message="¿Estás seguro de que deseas eliminar este servicio? Esta acción no se puede deshacer."
        confirmText="Eliminar"
        cancelText="Cancelar"
        confirmVariant="danger"
      />
    </Container>
  )
}

export default ServiceSearchContainer
