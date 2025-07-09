export { auth as middleware } from '@/lib/auth'

export const config = {
  matcher: [
    '/api/carrito/:path*',
    '/api/notificar/:path*',
    '/api/pago/:path*',
    '/admin/:path*',
    '/carrito/:path*',
    '/reserva/:path*',
    '/success',
    '/failure',
  ],
}
