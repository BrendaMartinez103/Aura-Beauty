import { getPedidosGroupedByServiceCategory } from '@/lib/data'
import ServiciosPieChart from '../components/admin/ServiciosPieChart'
import AdminResumen from '../components/admin/AdminResumen'

export default async function adminPage() {
  const comprasPorCategoria = await getPedidosGroupedByServiceCategory()
  const hayDatos = Object.keys(comprasPorCategoria).length > 0
  const chartData = hayDatos
    ? {
        labels: Object.keys(comprasPorCategoria),
        values: Object.values(comprasPorCategoria),
      }
    : { labels: [], values: [] }

  return (
    <div className="row">
      <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1>Actividad Reciente</h1>
        </div>
        <div>
          <AdminResumen />
          {!hayDatos && (
            <div className="alert alert-info my-3">No hay datos suficientes</div>
          )}
          <ServiciosPieChart data={chartData} />
        </div>
      </main>
    </div>
  )
}
