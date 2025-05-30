"use client"

import type React from "react"
import { useState } from "react"
import { Menu, X, Search, Facebook, Instagram } from "lucide-react"
import Link from "next/link"

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
      <div className="bg-background border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-3">
            <div>
              <p className="text-sm font-medium text-muted-foreground">RESERVAS ONLINE</p>
            </div>
            <div className="flex gap-3">
              <Link href="#" aria-label="Facebook" className="text-muted-foreground hover:text-foreground transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" aria-label="Instagram" className="text-muted-foreground hover:text-foreground transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-background border-b border-border sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Brand */}
            <Link href={brandHref} className="text-xl font-bold text-purple-600 hover:text-purple-700 transition-colors">
              {brandName}
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navigationItems.map((item) => (
                <Link
                  key={item}
                  href="#"
                  className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors uppercase"
                >
                  {item}
                </Link>
              ))}
            </div>

            {/* Mobile Toggle Button */}
            <button
              onClick={toggleOffcanvas}
              aria-label="Toggle navigation"
              className="lg:hidden p-2 border rounded-md text-muted-foreground hover:text-foreground"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </div>
      </nav>

      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={closeOffcanvas} />}

      {/* Offcanvas */}
      <div
        className={`
          fixed top-0 right-0 h-full w-80 bg-background border-l border-border z-50 transform transition-transform duration-300 ease-in-out lg:hidden
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h5 className="text-lg font-semibold text-purple-600">Menú</h5>
          <button onClick={closeOffcanvas} aria-label="Close" className="p-2 rounded-md hover:bg-accent">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 flex flex-col h-full">
          {/* Navigation Links */}
          <nav className="flex-1">
            <ul className="space-y-1">
              {navigationItems.map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="block px-3 py-3 text-sm font-medium text-foreground rounded-md hover:bg-accent transition-colors uppercase border-b border-border/50"
                    onClick={closeOffcanvas}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social Links in Mobile */}
          <div className="mt-6 pt-4 border-t border-border">
            <p className="text-sm font-medium text-muted-foreground mb-3">Síguenos</p>
            <div className="flex gap-4">
              <Link href="#" aria-label="Facebook" className="text-muted-foreground hover:text-foreground transition-colors">
                <Facebook className="h-6 w-6" />
              </Link>
              <Link href="#" aria-label="Instagram" className="text-muted-foreground hover:text-foreground transition-colors">
                <Instagram className="h-6 w-6" />
              </Link>
            </div>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
            <input
              type="search"
              placeholder="Buscar..."
              aria-label="Search"
              className="flex-1 p-2 border rounded-md"
            />
            <button type="submit" className="p-2 border rounded-md">
              <Search className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
