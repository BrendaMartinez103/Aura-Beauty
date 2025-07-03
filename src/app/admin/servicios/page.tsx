import ServiceCategoriesSearch from '@/app/components/admin/ServiceCategoriesSearch'

export default function AdminServiciosPage() {
  return (
    <div className="row">
      <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1>Servicios</h1>
        </div>
        <div className="py-4">
          <ServiceCategoriesSearch />
        </div>
      </main>
    </div>
  )
}
