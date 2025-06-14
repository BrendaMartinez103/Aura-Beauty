import { PrismaClient } from '@prisma/client'
import bcrypt from "bcryptjs";
const prisma = new PrismaClient()

async function main() {
  // Crear categorías
  const [peluqueria, cejas, unas, masajes] = await Promise.all([
    prisma.categoria.create({ data: { nombre: "Peluquería" } }),
    prisma.categoria.create({ data: { nombre: "Pestañas y Cejas" } }),
    prisma.categoria.create({ data: { nombre: "Uñas" } }),
    prisma.categoria.create({ data: { nombre: "Masajes" } }),
  ])

  // Crear servicios
  await prisma.servicio.createMany({
    data: [
      // ✂️ Peluquería
      { nombre: "Corte", descripcion: "Corte de cabello profesional", precio: 2500, duracion: 30, categoriaId: peluqueria.id },
      { nombre: "Brushing / Peinado", descripcion: "Peinado con secador", precio: 3000, duracion: 40, categoriaId: peluqueria.id },
      { nombre: "Planchita o Buclera", descripcion: "Alisado o rizado con calor", precio: 2000, duracion: 30, categoriaId: peluqueria.id },
      { nombre: "Coloración", descripcion: "Tinte, reflejos o balayage", precio: 7000, duracion: 90, categoriaId: peluqueria.id },
      { nombre: "Baño de crema", descripcion: "Tratamiento nutritivo para el cabello", precio: 2500, duracion: 30, categoriaId: peluqueria.id },
      { nombre: "Keratina alisadora", descripcion: "Alisado prolongado con keratina", precio: 12000, duracion: 120, categoriaId: peluqueria.id },
      { nombre: "Botox capilar", descripcion: "Rejuvenecimiento capilar", precio: 10000, duracion: 90, categoriaId: peluqueria.id },
      { nombre: "Hidratación profunda", descripcion: "Reparación de cabello dañado", precio: 3500, duracion: 40, categoriaId: peluqueria.id },
      { nombre: "Shock de nutrición", descripcion: "Tratamiento intensivo", precio: 4500, duracion: 45, categoriaId: peluqueria.id },
      { nombre: "Tratamiento anti frizz", descripcion: "Control del frizz", precio: 4000, duracion: 50, categoriaId: peluqueria.id },

      // 👁 Pestañas y Cejas
      { nombre: "Pestañas clásicas", descripcion: "Extensión una por una", precio: 5000, duracion: 75, categoriaId: cejas.id },
      { nombre: "Pestañas volumen (2D/3D/Ruso)", descripcion: "Extensiones densas", precio: 6000, duracion: 90, categoriaId: cejas.id },
      { nombre: "Mantenimiento de extensiones", descripcion: "Reposición de pestañas", precio: 3000, duracion: 45, categoriaId: cejas.id },
      { nombre: "Lifting de pestañas", descripcion: "Levantamiento natural", precio: 3500, duracion: 60, categoriaId: cejas.id },
      { nombre: "Tinte de pestañas", descripcion: "Coloración para más definición", precio: 2000, duracion: 30, categoriaId: cejas.id },
      { nombre: "Diseño y perfilado de cejas", descripcion: "Moldeo y depilación profesional", precio: 2500, duracion: 25, categoriaId: cejas.id },
      { nombre: "Laminado de cejas", descripcion: "Fijación y peinado por semanas", precio: 4000, duracion: 45, categoriaId: cejas.id },

      // 💅 Uñas
      { nombre: "Manicura tradicional", descripcion: "Limpieza y esmaltado clásico", precio: 1800, duracion: 30, categoriaId: unas.id },
      { nombre: "Manicura semipermanente", descripcion: "Esmaltado de larga duración", precio: 2500, duracion: 45, categoriaId: unas.id },
      { nombre: "Pedicura spa", descripcion: "Cuidado profundo de pies", precio: 3500, duracion: 60, categoriaId: unas.id },
      { nombre: "Esmaltado común o semipermanente", descripcion: "Aplicación de esmalte", precio: 1500, duracion: 25, categoriaId: unas.id },
      { nombre: "Uñas esculpidas", descripcion: "Extensión con gel o acrílico", precio: 6000, duracion: 90, categoriaId: unas.id },
      { nombre: "Reforzamiento de uñas naturales", descripcion: "Fortalecimiento sin alargar", precio: 3000, duracion: 45, categoriaId: unas.id },
      { nombre: "Spa de manos/pies", descripcion: "Exfoliación y mascarilla", precio: 2800, duracion: 35, categoriaId: unas.id },
      { nombre: "Reconstrucción de uñas quebradas", descripcion: "Reparación individual", precio: 1000, duracion: 15, categoriaId: unas.id },

      // 💆‍♀️ Masajes
      { nombre: "Masaje descontracturante", descripcion: "Eliminación de tensiones musculares", precio: 5000, duracion: 60, categoriaId: masajes.id },
      { nombre: "Masaje relajante", descripcion: "Relajación profunda", precio: 4500, duracion: 50, categoriaId: masajes.id },
      { nombre: "Masaje localizado", descripcion: "Zonas específicas: cuello, espalda o piernas", precio: 3000, duracion: 30, categoriaId: masajes.id },
      { nombre: "Masaje con piedras calientes", descripcion: "Terapia con calor", precio: 6000, duracion: 70, categoriaId: masajes.id },
      { nombre: "Drenaje linfático manual", descripcion: "Estimulación del sistema linfático", precio: 5500, duracion: 60, categoriaId: masajes.id },
      { nombre: "Masaje con aceites esenciales", descripcion: "Masaje con aromas y aceites", precio: 5000, duracion: 60, categoriaId: masajes.id },
      { nombre: "Masaje reductor", descripcion: "Masaje intenso para moldeado corporal", precio: 6500, duracion: 75, categoriaId: masajes.id },
    ]
  })

  console.log("✔️ Categorías y servicios creados exitosamente")
}

main()
  .catch((e) => {
    console.error("❌ Error durante el seed:", e)
    process.exit(1)
    
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
  
