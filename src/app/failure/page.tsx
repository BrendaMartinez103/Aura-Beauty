import { XCircle } from 'lucide-react'
import Link from 'next/link'

export default function FailurePage() {
  return (
    <main
      className="min-vh-100 d-flex flex-column justify-content-center align-items-center"
      style={{ backgroundColor: 'var(--background)' }}
    >
      <div className="container text-center py-5">
        <XCircle size={64} className="text-danger mb-4" />
        <h1 className="display-4 fw-bold text-danger mb-3">¡Pago fallido!</h1>
        <p className="fs-4 text-muted-foreground mb-4">
          Hubo un problema al procesar tu pago. Por favor, intenta nuevamente o
          contacta a nuestro soporte.
        </p>
        <Link href="/" className="btn btn-outline-danger btn-lg px-5">
          Volver al inicio
        </Link>
      </div>
    </main>
  )
}
