import type React from 'react'
import AdminNavbar from '../components/admin/admin-navbar'

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <AdminNavbar />
      <main className="container-fluid">{children}</main>
    </>
  )
}
