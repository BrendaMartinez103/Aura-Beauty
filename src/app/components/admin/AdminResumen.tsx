import {
  getPedidosCountLastWeek,
  getPedidosTotalCount,
  getAllClientes,
} from '@/lib/data'

export default async function AdminResumen() {
  // Pedidos
  const [nuevosPedidos, totalPedidos, clientes] = await Promise.all([
    getPedidosCountLastWeek(),
    getPedidosTotalCount(),
    getAllClientes(),
  ])

  // Usuarios
  const totalUsuarios = clientes.length
  const hace7dias = new Date()
  hace7dias.setDate(hace7dias.getDate() - 7)
  const nuevosUsuarios = clientes.filter(
    (c) => new Date(c.creadoEn) >= hace7dias
  ).length

  return (
    <div>
      <h2>Pedidos de la ultima semana</h2>
      <p>{nuevosPedidos} nuevos pedidos</p>
      <p>{totalPedidos} pedidos totales</p>
      <h2>Nuevos usuarios</h2>
      <p>{nuevosUsuarios} nuevos usuarios</p>
      <p>{totalUsuarios} usuarios totales</p>
    </div>
  )
}
