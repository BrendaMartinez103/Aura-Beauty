import PedidosTable from '@/components/admin/PedidosTable'
import { getAllPedidos } from '@/lib/data'
import type { ServicioPedido } from '@/components/admin/PedidoDetalleModal'

interface Pedido {
  id: number
  usuario: string
  fecha: string
  nroTransaccion: string
  total: number
  servicios?: ServicioPedido[]
}

interface CompraWithClienteDetalle {
  id: number
  cliente: { nombre: string } | null
  fechaHora: Date
  mp_transaction_id: string
  total: number
  Detalle: Array<{
    nombre: string
    cantidad: number
    precio: number
  }>
}

export default async function PedidosPage() {
  // Obtener los pedidos de la base de datos
  const compras: CompraWithClienteDetalle[] = await getAllPedidos()

  // Adaptar los datos de la base a la estructura esperada por la tabla
  const pedidos: Pedido[] = compras.map((compra) => ({
    id: compra.id,
    usuario: compra.cliente?.nombre || 'Sin nombre',
    fecha: compra.fechaHora instanceof Date ? compra.fechaHora.toLocaleString('es-AR') : String(compra.fechaHora),
    nroTransaccion: compra.mp_transaction_id,
    total: compra.total,
    servicios: compra.Detalle.map((d) => ({
      nombre: d.nombre,
      cantidad: d.cantidad,
      precioUnitario: d.precio,
    })),
  }))

  return (
    <div className="container mt-4">
      <h1>Pedidos</h1>
      <PedidosTable pedidos={pedidos} />
    </div>
  )
}
