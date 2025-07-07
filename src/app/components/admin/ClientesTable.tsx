'use client'

import React, { useState, useTransition } from 'react'
import { Table, Alert, Button } from 'react-bootstrap'
import SearchBar from '@/app/components/admin/SearchBar'
import ConfirmModal from '@/app/components/admin/ConfirmModal'
import { deleteCliente } from '@/lib/data'

export interface Cliente {
  id: number
  nombre: string
  documento: string
  telefono: string
  email: string
  creadoEn: string
}

interface ClientesTableProps {
  clientes: Cliente[]
}

type ColumnaOrdenable = keyof Pick<
  Cliente,
  'id' | 'nombre' | 'documento' | 'telefono' | 'email' | 'creadoEn'
>

const ClientesTable = ({ clientes }: ClientesTableProps) => {
  const [busqueda, setBusqueda] = useState('')
  const [columnaOrden, setColumnaOrden] = useState<ColumnaOrdenable>('id')
  const [direccion, setDireccion] = useState<'asc' | 'desc'>('asc')
  const [clientesState, setClientesState] = useState<Cliente[]>(clientes)
  const [eliminandoId, setEliminandoId] = useState<number | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [clienteAEliminar, setClienteAEliminar] = useState<Cliente | null>(null)
  const [isPending, startTransition] = useTransition()

  const handleOrdenar = (col: ColumnaOrdenable) => {
    if (columnaOrden === col) {
      setDireccion(direccion === 'asc' ? 'desc' : 'asc')
    } else {
      setColumnaOrden(col)
      setDireccion('asc')
    }
  }

  const handleEliminarClick = (cliente: Cliente) => {
    setClienteAEliminar(cliente)
    setShowModal(true)
  }

  const handleConfirmarEliminar = async () => {
    if (!clienteAEliminar) return
    setEliminandoId(clienteAEliminar.id)
    setShowModal(false)
    startTransition(async () => {
      const ok = await deleteCliente(clienteAEliminar.id)
      if (ok) {
        setClientesState((prev) => prev.filter((c) => c.id !== clienteAEliminar.id))
      } else {
        alert('Error al eliminar el usuario')
      }
      setEliminandoId(null)
      setClienteAEliminar(null)
    })
  }

  const clientesFiltrados = clientesState.filter((cliente) => {
    const termino = busqueda.toLowerCase()
    return (
      cliente.nombre.toLowerCase().includes(termino) ||
      cliente.documento.toLowerCase().includes(termino) ||
      cliente.telefono.toLowerCase().includes(termino) ||
      cliente.email.toLowerCase().includes(termino)
    )
  })

  const clientesOrdenados = [...clientesFiltrados].sort((a, b) => {
    const aValue = a[columnaOrden]
    const bValue = b[columnaOrden]
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return direccion === 'asc' ? aValue - bValue : bValue - aValue
    }
    return direccion === 'asc'
      ? String(aValue).localeCompare(String(bValue))
      : String(bValue).localeCompare(String(aValue))
  })

  if (!clientesState || clientesState.length === 0) {
    return <Alert variant="info">No hay clientes.</Alert>
  }

  const iconoOrden = (col: ColumnaOrdenable) => {
    if (columnaOrden !== col) return null
    return direccion === 'asc' ? ' ▲' : ' ▼'
  }

  return (
    <>
      <SearchBar
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        placeholder="Buscar cliente por nombre, documento, teléfono o email"
      />
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th style={{ cursor: 'pointer' }} onClick={() => handleOrdenar('id')}>ID{iconoOrden('id')}</th>
            <th style={{ cursor: 'pointer' }} onClick={() => handleOrdenar('nombre')}>Nombre{iconoOrden('nombre')}</th>
            <th style={{ cursor: 'pointer' }} onClick={() => handleOrdenar('documento')}>Documento{iconoOrden('documento')}</th>
            <th style={{ cursor: 'pointer' }} onClick={() => handleOrdenar('telefono')}>Teléfono{iconoOrden('telefono')}</th>
            <th style={{ cursor: 'pointer' }} onClick={() => handleOrdenar('email')}>Email{iconoOrden('email')}</th>
            <th style={{ cursor: 'pointer' }} onClick={() => handleOrdenar('creadoEn')}>Fecha de registro{iconoOrden('creadoEn')}</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientesOrdenados.map((cliente) => (
            <tr key={cliente.id}>
              <td>{cliente.id}</td>
              <td>{cliente.nombre}</td>
              <td>{cliente.documento}</td>
              <td>{cliente.telefono}</td>
              <td>{cliente.email}</td>
              <td>{cliente.creadoEn}</td>
              <td>
                <Button
                  variant="danger"
                  size="sm"
                  disabled={eliminandoId === cliente.id || isPending}
                  onClick={() => handleEliminarClick(cliente)}
                >
                  {eliminandoId === cliente.id ? 'Eliminando...' : 'Eliminar'}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ConfirmModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onConfirm={handleConfirmarEliminar}
        title="Eliminar cliente"
        message={`¿Seguro que deseas eliminar a ${clienteAEliminar?.nombre}? Esta acción no se puede deshacer.`}
        confirmText="Eliminar"
        confirmVariant="danger"
      />
    </>
  )
}

export default ClientesTable
