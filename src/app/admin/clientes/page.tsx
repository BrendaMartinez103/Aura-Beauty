import ClientesTable from '@/app/components/admin/ClientesTable'
import { getAllClientes } from '@/lib/data'

export default async function ClientesPage() {
  // Obtener los clientes de la base de datos
  const clientesDb = await getAllClientes()

  // Adaptar los datos para la tabla
  const clientes = clientesDb.map((c) => ({
    id: c.id,
    nombre: c.nombre,
    documento: c.documento,
    telefono: c.telefono,
    email: c.email,
    creadoEn:
      c.creadoEn instanceof Date
        ? c.creadoEn.toLocaleString('es-AR')
        : String(c.creadoEn),
  }))

  return (
    <div className="container mt-4">
      <h1>Clientes</h1>
      <ClientesTable clientes={clientes} />
    </div>
  )
}
