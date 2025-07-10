import type React from 'react'
import type { Metadata } from 'next'
import './globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import PushManagerProvider from './components/PushManagerProvider'
import { auth } from '@/lib/auth'
import OffcanvasNavbar from './components/offcanvas-navbar'
import { SessionProvider } from 'next-auth/react'

const URL =
  process.env.VERCEL_URL || process.env.NEXTAUTH_URL || 'http://localhost:3000'

export const metadata: Metadata = {
  title: 'Aura Beauty - Más que belleza, armonía',
  description:
    'Salón de belleza y estética con servicios de pestañas, masajes, manicura y estilismo',
  openGraph: {
    images: [
      {
        url: URL + '/icon.png',
        width: 800,
        height: 600,
      },
      {
        url: URL + '/icon.png',
        width: 1800,
        height: 1600,
      },
    ],
    locale: 'es_AR',
    type: 'website',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon-32x32.png',
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()

  return (
    <html lang="es">
      <body>
        <PushManagerProvider />
        <OffcanvasNavbar
          session={session ?? undefined}
          brandName="Aura Beauty"
          brandHref="/"
        />
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  )
}
