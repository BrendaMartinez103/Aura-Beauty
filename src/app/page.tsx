/*
import Image from "next/image"
import Link from "next/link"
//import { Facebook, Instagram } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Beauty Services Image - Top *///}
   /*   <div className="w-full flex justify-center py-6">
        <Image
          src="/imagenPrincipal.jpeg"
          alt="Servicios de belleza: pestañas, masajes, manicura y estilismo"
          width={600}
          height={200}
          className="rounded-md"
        />
      </div>

      {/* Brand Name and Slogan *///}
   /*   <div className="w-full text-center py-4">
        <h1 className="text-4xl font-bold text-purple-500">Aura Beauty</h1>
        <p className="text-xl mt-2">Más que belleza, armonía.</p>
      </div>

      {/* Top Bar *///}
   /*   <div className="w-full flex justify-between items-center px-6 py-4">
        <div>
          <p className="text-sm">RESERVAS ONLINE</p>
        </div>
   
      </div>

      {/* Navigation *///}
  /*    <nav className="w-full border-y border-gray-200">
        <ul className="flex justify-center flex-wrap">
          <li className="px-4 py-3 hover:bg-gray-100">
            <Link href="#" className="text-sm uppercase">
              Conócenos
            </Link>
          </li>
          <li className="px-4 py-3 hover:bg-gray-100">
            <Link href="#" className="text-sm uppercase">
              Nuestros Espacios
            </Link>
          </li>
          <li className="px-4 py-3 hover:bg-gray-100">
            <Link href="#" className="text-sm uppercase">
              Servicios
            </Link>
          </li>
          <li className="px-4 py-3 hover:bg-gray-100">
            <Link href="#" className="text-sm uppercase">
              Tratamientos
            </Link>
          </li>
          <li className="px-4 py-3 hover:bg-gray-100">
            <Link href="#" className="text-sm uppercase">
              Reserva Online
            </Link>
          </li>
          <li className="px-4 py-3 hover:bg-gray-100">
            <Link href="#" className="text-sm uppercase">
              Beneficios
            </Link>
          </li>
          <li className="px-4 py-3 hover:bg-gray-100">
            <Link href="#" className="text-sm uppercase">
              Eventos
            </Link>
          </li>
          <li className="px-4 py-3 hover:bg-gray-100">
            <Link href="#" className="text-sm uppercase">
              Novedades
            </Link>
          </li>
          <li className="px-4 py-3 hover:bg-gray-100">
            <Link href="#" className="text-sm uppercase">
              Gift Card
            </Link>
          </li>
        </ul>
      </nav>

      {/* Promo Banner *///}
 /*     <div className="w-full bg-purple-600 text-white py-4 px-6 text-center">
        <p className="text-lg font-medium">
          HASTA UN 30% DE DESCUENTO EN TRATAMIENTOS + 25% DE AHORRO, TODOS LOS DÍAS.
        </p>
      </div>

      {/* Welcome Section *///}
/*      <div className="w-full text-center py-8">
        <h2 className="text-3xl font-medium mb-6">¡Bienvenido!</h2>
        <p className="text-xl">Seleccioná las opciones para reservar tu cita</p>
      </div>
    </main>
  )
}
*/
import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <main>
      {/* Beauty Services Image - Top */}
      <div className="container-fluid">
        <div className="row justify-content-center py-4">
          <div className="col-auto">
            <Image
              src="/imagenPrincipal.jpeg"
              alt="Servicios de belleza: pestañas, masajes, manicura y estilismo"
              width={250}
              height={70}
              className="img-fluid rounded"
            />
          </div>
        </div>
      </div>

      {/* Brand Name and Slogan */}
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 text-center py-3">
            <h1 className="display-4 fw-bold text-purple">Aura Beauty</h1>
            <p className="fs-4 mt-2">Más que belleza, armonía.</p>
          </div>
        </div>
      </div>

      {/* Top Bar */}
      <div className="container-fluid">
        <div className="row justify-content-between align-items-center px-3 py-3">
          <div className="col-auto">
            <p className="mb-0 small">RESERVAS ONLINE</p>
          </div>
          <div className="col-auto">
            <div className="d-flex gap-2">
              <Link href="#" aria-label="Facebook" className="text-dark">
                <i className="bi bi-facebook fs-5"></i>
              </Link>
              <Link href="#" aria-label="Instagram" className="text-dark">
                <i className="bi bi-instagram fs-5"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light border-top border-bottom">
        <div className="container-fluid">
          <button
            className="navbar-toggler mx-auto"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
            <ul className="navbar-nav">
              {[
                "Conócenos",
                "Nuestros Espacios",
                "Servicios",
                "Tratamientos",
                "Reserva Online",
                "Beneficios",
                "Eventos",
                "Novedades",
                "Gift Card",
              ].map((item) => (
                <li key={item} className="nav-item">
                  <Link href="#" className="nav-link text-uppercase small px-3">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      {/* Promo Banner */}
      <div className="bg-purple py-3 text-center">
        <p className="mb-0 fs-5 fw-medium text-white">
          HASTA UN 30% DE DESCUENTO EN TRATAMIENTOS + 25% DE AHORRO, TODOS LOS DÍAS.
        </p>
      </div>

      {/* Welcome Section */}
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 text-center py-5">
            <h2 className="display-6 fw-normal mb-4">¡Bienvenido!</h2>
            <p className="fs-4">Seleccioná las opciones para reservar tu cita</p>
          </div>
        </div>
      </div>
    </main>
  )
}
