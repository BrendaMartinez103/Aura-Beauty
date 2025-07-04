'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, Search } from 'lucide-react'
import { useSession, signOut } from 'next-auth/react'

interface OffcanvasNavbarProps {
  brandName?: string
  brandHref?: string
}

export default function OffcanvasNavbar({
  brandName = 'Aura Beauty',
  brandHref = '/',
}: OffcanvasNavbarProps) {
  const [isOpen, setIsOpen] = useState(false)

  const { data: session } = useSession()

  const toggleOffcanvas = () => setIsOpen(!isOpen)
  const closeOffcanvas = () => setIsOpen(false)

  const cerrarSesion = () => {
    signOut({
      redirect: true,
      callbackUrl: '/',
    })
  }

  const navigationItems = [
    { label: 'Conócenos', href: '/conocenos' },
    { label: 'Nuestros Espacios', href: '/nuestros-espacios' },
    { label: 'Servicios', href: '/servicios' },
    { label: 'Reserva Online', href: '/reserva' },
    { label: 'Nuestros Clientes', href: '/nuestros-clientes' },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Búsqueda enviada')
  }

  return (
    <>
      {/* Top Bar */}
      <div className="border-bottom py-2 bg-light">
        <div className="container d-flex justify-content-between align-items-center">
          <p className="mb-0 small fw-medium">RESERVAS ONLINE</p>
        </div>
      </div>

      {/* Navbar principal */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom sticky-top">
        <div className="container">
          <Link href={brandHref} className="navbar-brand fw-bold text-primary">
            {brandName}
          </Link>

          <button
            className="btn d-lg-none"
            onClick={toggleOffcanvas}
            aria-label="Menú"
          >
            <Menu size={20} />
          </button>

          <div className="collapse navbar-collapse d-none d-lg-flex align-items-center">
            <ul className="nav flex-column mb-0">
              {navigationItems.map((item) => (
                <li key={item.label} className="nav-item border-bottom py-2">
                  <Link
                    href={item.href}
                    className="nav-link text-uppercase"
                    onClick={closeOffcanvas}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            {session ? (
              <button
                onClick={cerrarSesion}
                className="btn btn-outline-danger ms-3 text-uppercase"
              >
                Cerrar sesión
              </button>
            ) : (
              <Link
                href="/login"
                className="btn btn-primary ms-3 text-uppercase"
              >
                Iniciar Sesión
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Overlay */}
      {isOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
          onClick={closeOffcanvas}
          style={{ zIndex: 1040 }}
        />
      )}

      {/* Offcanvas */}
      <div
        className={`offcanvas offcanvas-end show ${isOpen ? 'd-block' : 'd-none'}`}
        tabIndex={-1}
        style={{ visibility: isOpen ? 'visible' : 'hidden', zIndex: 1045 }}
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title text-primary">Menú</h5>
          <button
            type="button"
            className="btn-close"
            onClick={closeOffcanvas}
            aria-label="Cerrar"
          ></button>
        </div>

        <div className="offcanvas-body d-flex flex-column">
          <form onSubmit={handleSubmit} className="d-flex gap-2 mb-3">
            <input
              type="search"
              className="form-control"
              placeholder="Buscar..."
            />
            <button type="submit" className="btn btn-outline-secondary">
              <Search size={18} />
            </button>
          </form>

          {session ? (
            <button
              onClick={cerrarSesion}
              className="btn btn-outline-danger text-uppercase mb-4"
            >
              Cerrar sesión
            </button>
          ) : (
            <Link
              href="/login"
              className="btn btn-primary text-uppercase mb-4"
              onClick={closeOffcanvas}
            >
              Iniciar Sesión
            </Link>
          )}

          <ul className="nav flex-column mb-0">
            {navigationItems.map((item) => (
              <li key={item.label} className="nav-item border-bottom py-2">
                <Link
                  href={item.href}
                  className="nav-link text-uppercase"
                  onClick={closeOffcanvas}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}
