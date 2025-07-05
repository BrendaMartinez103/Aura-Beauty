import PedidosTable from '@/components/admin/PedidosTable'

interface Pedido {
  id: number
  usuario: string
  fecha: string // Fecha y hora en formato ISO o similar
  nroTransaccion: string
  total: number
  servicios?: import('@/components/admin/PedidoDetalleModal').ServicioPedido[]
}

const servicios = [
  { nombre: 'Corte de pelo', cantidad: 1, precioUnitario: 1500 },
  { nombre: 'Lavado', cantidad: 1, precioUnitario: 1000 },
  { nombre: 'Coloración', cantidad: 2, precioUnitario: 2000 },
  { nombre: 'Peinado', cantidad: 1, precioUnitario: 1200 },
  { nombre: 'Manicura', cantidad: 3, precioUnitario: 800 },
  { nombre: 'Pedicura', cantidad: 2, precioUnitario: 900 },
  { nombre: 'Depilación', cantidad: 1, precioUnitario: 700 },
  { nombre: 'Masaje', cantidad: 1, precioUnitario: 2500 },
  { nombre: 'Tratamiento facial', cantidad: 1, precioUnitario: 3000 },
  { nombre: 'Alisado', cantidad: 1, precioUnitario: 3500 },
  { nombre: 'Reflejos', cantidad: 2, precioUnitario: 1800 },
  { nombre: 'Pestañas', cantidad: 1, precioUnitario: 1600 },
  { nombre: 'Cejas', cantidad: 2, precioUnitario: 600 },
  { nombre: 'Barba', cantidad: 1, precioUnitario: 1100 },
  { nombre: 'Brushing', cantidad: 1, precioUnitario: 1300 },
  { nombre: 'Baño de crema', cantidad: 1, precioUnitario: 1400 },
  { nombre: 'Planchita', cantidad: 1, precioUnitario: 1250 },
  { nombre: 'Buclera', cantidad: 1, precioUnitario: 1250 },
  { nombre: 'Shock de keratina', cantidad: 1, precioUnitario: 4000 },
  { nombre: 'Peeling', cantidad: 1, precioUnitario: 3200 },
  { nombre: 'Limpieza profunda', cantidad: 1, precioUnitario: 2800 },
  { nombre: 'Spa de manos', cantidad: 2, precioUnitario: 900 },
  { nombre: 'Spa de pies', cantidad: 2, precioUnitario: 950 },
  { nombre: 'Uñas esculpidas', cantidad: 1, precioUnitario: 2200 },
  { nombre: 'Nutrición capilar', cantidad: 1, precioUnitario: 2100 },
  { nombre: 'Botox capilar', cantidad: 1, precioUnitario: 3700 },
  { nombre: 'Ondas', cantidad: 1, precioUnitario: 1500 },
  { nombre: 'Secado', cantidad: 1, precioUnitario: 1000 },
  { nombre: 'Corte niño', cantidad: 1, precioUnitario: 900 },
  { nombre: 'Corte dama', cantidad: 1, precioUnitario: 1700 },
  { nombre: 'Corte caballero', cantidad: 1, precioUnitario: 1500 },
  { nombre: 'Peinado fiesta', cantidad: 1, precioUnitario: 2500 },
  { nombre: 'Maquillaje', cantidad: 1, precioUnitario: 2000 },
  { nombre: 'Extensiones', cantidad: 1, precioUnitario: 5000 },
  { nombre: 'Tratamiento anticaída', cantidad: 1, precioUnitario: 3300 },
  { nombre: 'Lifting de pestañas', cantidad: 1, precioUnitario: 2100 },
  { nombre: 'Perfilado de cejas', cantidad: 1, precioUnitario: 800 },
  { nombre: 'Diseño de cejas', cantidad: 1, precioUnitario: 900 },
  { nombre: 'Tinte de cejas', cantidad: 1, precioUnitario: 700 },
  { nombre: 'Tinte de pestañas', cantidad: 1, precioUnitario: 700 },
  { nombre: 'Laminado de cejas', cantidad: 1, precioUnitario: 1200 },
  { nombre: 'Laminado de pestañas', cantidad: 1, precioUnitario: 1200 },
  { nombre: 'Microblading', cantidad: 1, precioUnitario: 6000 },
  { nombre: 'Microshading', cantidad: 1, precioUnitario: 6000 },
  { nombre: 'Depilación con hilo', cantidad: 1, precioUnitario: 1000 },
  { nombre: 'Depilación definitiva', cantidad: 1, precioUnitario: 8000 },
  { nombre: 'Mascarilla facial', cantidad: 1, precioUnitario: 1500 },
  { nombre: 'Masaje descontracturante', cantidad: 1, precioUnitario: 3500 },
  { nombre: 'Masaje relajante', cantidad: 1, precioUnitario: 3200 },
  { nombre: 'Masaje reductivo', cantidad: 1, precioUnitario: 3700 },
  { nombre: 'Masaje linfático', cantidad: 1, precioUnitario: 3900 },
]

// Simulación de datos de pedidos. Reemplazar por fetch a la base de datos en producción.
const pedidos: Pedido[] = [
  {
    id: 1,
    usuario: 'Juan Perez',
    fecha: '2025-07-04 15:30',
    nroTransaccion: 'MP-123456789',
    total: servicios.reduce(
      (acc, servicio) => acc + servicio.cantidad * servicio.precioUnitario,
      0
    ),
    servicios: servicios,
  },
]

export default function PedidosPage() {
  return (
    <div className="container mt-4">
      <h1>Pedidos</h1>
      <PedidosTable pedidos={pedidos} />
    </div>
  )
}
