'use client'
import React, { useState, useMemo } from 'react'
import ServiceGrid from './ServiceGrid'
import { Servicio } from '@prisma/client'
import SearchBar from './SearchBar'

interface ServiceSearchContainerProps {
  servicios: Servicio[]
}

const ServiceSearchContainer: React.FC<ServiceSearchContainerProps> = ({
  servicios,
}) => {
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    if (!search.trim()) {
      return servicios
    }
    return servicios.filter((s) =>
      s.nombre.toLowerCase().includes(search.toLowerCase())
    )
  }, [servicios, search])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  return (
    <>
      <SearchBar
        value={search}
        onChange={handleSearch}
        placeholder="Buscar categorías..."
      />
      <ServiceGrid servicios={filtered} />
    </>
  )
}

export default ServiceSearchContainer
