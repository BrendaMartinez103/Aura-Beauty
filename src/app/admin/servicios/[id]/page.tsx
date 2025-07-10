import { getServiceByCategoryId, getAllCategories } from '@/lib/data'
import ServiceSearchContainer from '@/app/components/admin/ServiceSearchContainer'

type PageProps = {
  params: Promise<{ id: string }>
}

export default async function ServiciosPorCategoriaPage({ params }: PageProps) {
  const { id } = await params
  const categoryId = Number(id)
  const servicios = await getServiceByCategoryId(categoryId)
  const categories = await getAllCategories()
  const category = categories.find(
    (cat: { id: number; nombre: string }) => cat.id === categoryId
  )

  return (
    <div className="container py-4">
      <h2>Servicios de la categoría: {category?.nombre}</h2>
      <ServiceSearchContainer servicios={servicios} categoria={categoryId} />
    </div>
  )
}
