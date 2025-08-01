'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu } from 'lucide-react'
import { Session } from 'next-auth'

interface OffcanvasNavbarProps {
  brandName?: string
  brandHref?: string
  navigationItems?: { label: string; href: string }[]
  session?: Session
}

export default function AdminNavbar({
  brandName = 'Panel de Administración',
  brandHref = '/',
  navigationItems = [{ label: 'Inicio', href: '/' }],
}: OffcanvasNavbarProps) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleOffcanvas = () => setIsOpen(!isOpen)
  const closeOffcanvas = () => setIsOpen(false)

  return (
    <>
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
            <ul className="nav flex-row mb-0">
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
          <h5 className="offcanvas-title text-primary">Menú Administracion</h5>
          <button
            type="button"
            className="btn-close"
            onClick={closeOffcanvas}
            aria-label="Cerrar"
          ></button>
        </div>

        <div className="offcanvas-body d-flex flex-column">
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
