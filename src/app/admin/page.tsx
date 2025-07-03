export default function adminPage() {
  return (
    <div className="row">
      <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1>Actividad Reciente</h1>
        </div>
        <div>
          <h2>Pedidos de la ultima semana</h2>
          <p>X nuevos pedidos</p>
          <p>Y pedidos totales</p>
          <h2>Nuevos usuarios</h2>
          <p>X nuevos usuarios</p>
          <p>Y usuarios totales</p>
          <h2>Servicios solicitados</h2>
          <p>Grafico de torta con las categorias</p>
        </div>
      </main>
    </div>
  )
}
