import type React from 'react'
import AdminNavbar from '../components/admin/admin-navbar'
import { auth } from '@/lib/auth'

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()

  const navigationItems = [
    { label: 'Inicio', href: '/admin' },
    { label: 'Servicios', href: '/admin/servicios' },
    { label: 'Pedidos', href: '/admin/pedidos' },
    { label: 'Clientes', href: '/admin/clientes' },
    { label: 'Notificaciones', href: '/admin/notificaciones' },
  ]

  return (
    <>
      <AdminNavbar
        navigationItems={navigationItems}
        session={session ?? undefined}
      />
      <main className="container-fluid">{children}</main>
    </>
  )
}
