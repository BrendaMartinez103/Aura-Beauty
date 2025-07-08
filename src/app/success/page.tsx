import { auth } from '@/lib/auth'
import { crearCompra, eliminarCarrito } from '@/lib/data'
import { CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

const ML_API_URL = 'https://api.mercadopago.com/v1/payments'

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const urlParams = await searchParams
  const paymentId = urlParams.payment_id
  const status = urlParams.status
  const session = await auth()

  const payment = await fetch(ML_API_URL + `/${paymentId}`, {
    headers: {
      Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
    },
  })

  const paymentData = await payment.json()

  console.log('Payment Data:', paymentData)

  const valid = paymentData.status === 'approved' && status === 'approved'

  if (valid && session) {
    const clienteId = session.user?.id
    await crearCompra(Number(clienteId), paymentId as string)
    await eliminarCarrito(Number(clienteId))
  }

  if (!valid) {
    return (
      <main
        className="min-vh-100 d-flex flex-column justify-content-center align-items-center"
        style={{ backgroundColor: 'var(--background)' }}
      >
        <div className="container text-center py-5">
          <h1 className="display-4 fw-bold text-danger mb-3">Pago fallido</h1>
          <p className="fs-4 text-muted-foreground mb-4">
            Lo sentimos, hubo un problema con tu pago. Por favor, intenta de
            nuevo.
          </p>
          <Link href="/" className="btn btn-danger btn-lg px-5">
            Volver al inicio
          </Link>
        </div>
      </main>
    )
  }

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
