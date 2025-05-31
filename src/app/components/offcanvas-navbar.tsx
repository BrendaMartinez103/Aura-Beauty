"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, Search } from "lucide-react"

interface OffcanvasNavbarProps {
  brandName?: string
  brandHref?: string
}

export default function OffcanvasNavbar({ brandName = "Aura Beauty", brandHref = "/" }: OffcanvasNavbarProps) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleOffcanvas = () => setIsOpen(!isOpen)
  const closeOffcanvas = () => setIsOpen(false)

  const navigationItems = [
    "Conócenos",
    "Nuestros Espacios",
    "Servicios",
    "Tratamientos",
    "Reserva Online",
    "Beneficios",
    "Eventos",
    "Novedades",
    "Gift Card",
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Búsqueda enviada")
  }

  return (
    <>
      {/* Top Bar */}
      <div className="border-bottom py-2 bg-light">
        <div className="container d-flex justify-content-between align-items-center">
          <p className="mb-0 small fw-medium">RESERVAS ONLINE</p>
          <div className="d-flex gap-3">
            {/* Elementos adicionales aquí si los necesitas */}
          </div>
        </div>
      </div>

      {/* Navbar principal */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom sticky-top">
        <div className="container">
          <Link href={brandHref} className="navbar-brand fw-bold text-primary">
            {brandName}
          </Link>

          <button className="btn d-lg-none" onClick={toggleOffcanvas} aria-label="Menú">
            <Menu size={20} />
          </button>

          <div className="collapse navbar-collapse d-none d-lg-flex align-items-center">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {navigationItems.map((item) => (
                <li key={item} className="nav-item">
                  <Link href="#" className="nav-link text-uppercase">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>

            <Link href="/login" className="btn btn-primary ms-3 text-uppercase">
              Iniciar Sesión
            </Link>
          </div>
        </div>
      </nav>

      {/* Overlay (oscurece fondo al abrir offcanvas) */}
      {isOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
          onClick={closeOffcanvas}
          style={{ zIndex: 1040 }}
        />
      )}

      {/* Offcanvas menú lateral */}
      <div
        className={`offcanvas offcanvas-end show ${isOpen ? "d-block" : "d-none"}`}
        tabIndex={-1}
        style={{ visibility: isOpen ? "visible" : "hidden", zIndex: 1045 }}
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title text-primary">Menú</h5>
          <button type="button" className="btn-close" onClick={closeOffcanvas} aria-label="Cerrar"></button>
        </div>

        <div className="offcanvas-body d-flex flex-column">
          <form onSubmit={handleSubmit} className="d-flex gap-2 mb-3">
            <input type="search" className="form-control" placeholder="Buscar..." />
            <button type="submit" className="btn btn-outline-secondary">
              <Search size={18} />
            </button>
          </form>

          <Link
            href="/login"
            className="btn btn-primary text-uppercase mb-4"
            onClick={closeOffcanvas}
          >
            Iniciar Sesión
          </Link>

          <ul className="nav flex-column mb-0">
            {navigationItems.map((item) => (
              <li key={item} className="nav-item border-bottom py-2">
                <Link href="#" className="nav-link text-uppercase" onClick={closeOffcanvas}>
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}
