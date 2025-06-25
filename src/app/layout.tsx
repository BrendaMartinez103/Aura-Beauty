import type React from 'react'
import type { Metadata } from 'next'
import './globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { SessionProvider } from 'next-auth/react'

export const metadata: Metadata = {
  title: 'Aura Beauty - Más que belleza, armonía',
  description:
    'Salón de belleza y estética con servicios de pestañas, masajes, manicura y estilismo',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  )
}
