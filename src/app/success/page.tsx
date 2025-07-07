import { CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

export default function SuccessPage() {
  return (
    <main
      className="min-vh-100 d-flex flex-column justify-content-center align-items-center"
      style={{ backgroundColor: 'var(--background)' }}
    >
      <div className="container text-center py-5">
        <CheckCircle2 size={64} className="text-success mb-4" />
        <h1 className="display-4 fw-bold text-purple mb-3">¡Pago exitoso!</h1>
        <p className="fs-4 text-muted-foreground mb-4">
          ¡Gracias por tu compra! Te esperamos para disfrutar de tu servicio en
          Aura Beauty.
        </p>
        <Link href="/" className="btn btn-purple btn-lg px-5">
          Volver al inicio
        </Link>
      </div>
    </main>
  )
}
