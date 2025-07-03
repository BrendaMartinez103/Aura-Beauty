import type React from 'react'
import AdminNavbar from '../components/admin/admin-navbar'

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const navigationItems = [
    { label: 'Inicio', href: '/admin' },
    { label: 'Servicios', href: '/admin/servicios' },
    { label: 'Pedidos', href: '/admin/pedidos' },
    { label: 'Clientes', href: '/admin/clientes' },
    { label: 'Notificaciones', href: '/admin/notificaciones' },
  ]

  return (
    <>
      <AdminNavbar navigationItems={navigationItems} />
      <main className="container-fluid">{children}</main>
    </>
  )
}
