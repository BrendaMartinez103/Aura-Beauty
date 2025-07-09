'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu } from 'lucide-react'
import { signOut } from 'next-auth/react'
import { Session } from 'next-auth'
import { ShoppingCart } from 'lucide-react'

interface OffcanvasNavbarProps {
  brandName?: string
  brandHref?: string
  session?: Session
}

export default function OffcanvasNavbar({
  brandName = 'Aura Beauty',
  brandHref = '/',
  session,
}: OffcanvasNavbarProps) {
  const [isOpen, setIsOpen] = useState(false)

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
    { label: 'Comprar Servicios', href: '/reserva' },
    { label: 'Nuestros Clientes', href: '/nuestros-clientes' },
  ]

  return (
    <>
      {/* Top Bar */}
      <div className="border-bottom py-2 bg-light">
        <div className="container d-flex justify-content-between align-items-center">
          <p className="mb-0 small fw-medium">Compra de Servicios</p>
        </div>
      </div>

      {/* Navbar principal */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom sticky-top py-3">
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

          <div className="collapse navbar-collapse d-none d-lg-flex align-items-center justify-content-center w-100 h-100">
            <ul className="nav flex-row flex-nowrap mb-0 justify-content-center w-100 text-center align-items-center h-100 border-bottom">
              {navigationItems.map((item) => (
                <li key={item.label} className="nav-item py-2">
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

            {/* Admin o Carrito */}
            {session ? (
              session.user?.rol === 'admin' ? (
                <Link
                  href="/admin"
                  className="btn btn-info ms-3 text-uppercase"
                  onClick={closeOffcanvas}
                >
                  Panel Admin
                </Link>
              ) : (
                <Link
                  href="/carrito"
                  className="btn btn-outline-primary d-inline-flex align-items-center gap-2 ms-3 text-uppercase"
                  title="Ir al carrito"
                >
                  <ShoppingCart size={18} /> Carrito
                </Link>
              )
            ) : null}

            {session ? (
              <button
                onClick={cerrarSesion}
                className="btn btn-outline-danger ms-3 text-uppercase text-nowrap"
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
          {/* Boton de sesion */}
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
          {/* Admin o Carrito */}
          {session ? (
            session.user?.rol === 'admin' ? (
              <Link
                href="/admin"
                className="btn btn-info text-uppercase mb-4"
                onClick={closeOffcanvas}
              >
                Panel Admin
              </Link>
            ) : (
              <Link
                href="/carrito"
                className="btn btn-outline-primary d-inline-flex align-items-center gap-2 text-uppercase mb-4"
                title="Ir al carrito"
                onClick={closeOffcanvas}
              >
                <ShoppingCart size={18} /> Carrito
              </Link>
            )
          ) : null}
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
