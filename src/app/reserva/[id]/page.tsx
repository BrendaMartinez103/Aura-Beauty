

import { ServicioUI } from "@/app/components/servicio/ServicioUI"
import { prisma } from "@/db/client"
import { notFound } from "next/navigation"

interface Props {
  params: Promise<{ id: string }>
}

export default async function ServicioPage({ params }: Props) {
  const {id} = await params
  const nombre = decodeURIComponent(id)

  const servicio = await prisma.servicio.findFirst({
    where: { nombre },
    include: { categoria: true },
  })

  if (!servicio) return notFound()

  // ⚠️ Server Components no pueden usar estado directamente,
  // así que movemos esta parte a un componente cliente aparte ↓↓↓
  return <ServicioUI servicio={servicio} />
}