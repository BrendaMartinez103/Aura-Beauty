import bcrypt from 'bcryptjs'
import { prisma } from '../client'

async function main() {
  // Crear o actualizar Administrador
  await prisma.administrador.upsert({
    where: { email: 'admin@admin.admin' },
    update: {},
    create: {
      email: 'admin@admin.admin',
      nombre: 'admin',
      password: bcrypt.hashSync('admin', 10),
    },
  })

  // Crear o actualizar Cliente
  await prisma.cliente.upsert({
    where: { email: 'juan@gmail.com' },
    update: {},
    create: {
      email: 'juan@gmail.com',
      nombre: 'juan',
      documento: '56473836',
      telefono: '123456789',
      password: bcrypt.hashSync('juan', 10),
    },
  })

  // Crear o actualizar categorías
  const [peluqueria, cejas, unas, masajes] = await Promise.all([
    prisma.categoria.upsert({
      where: { nombre: 'Peluquería' },
      update: {},
      create: { nombre: 'Peluquería' },
    }),
    prisma.categoria.upsert({
      where: { nombre: 'Pestañas y Cejas' },
      update: {},
      create: { nombre: 'Pestañas y Cejas' },
    }),
    prisma.categoria.upsert({
      where: { nombre: 'Uñas' },
      update: {},
      create: { nombre: 'Uñas' },
    }),
    prisma.categoria.upsert({
      where: { nombre: 'Masajes' },
      update: {},
      create: { nombre: 'Masajes' },
    }),
  ])

  // Servicios a crear
  const servicios = [
    // ✂️ Peluquería
    {
      nombre: 'Corte',
      descripcion: 'Corte de cabello profesional',
      imageUrl: '',
      precio: 2500,
      duracion: 30,
      categoriaId: peluqueria.id,
    },
    {
      nombre: 'Brushing / Peinado',
      descripcion: 'Peinado con secador',
      imageUrl: '',
      precio: 3000,
      duracion: 40,
      categoriaId: peluqueria.id,
    },
    {
      nombre: 'Planchita o Buclera',
      descripcion: 'Alisado o rizado con calor',
      imageUrl: '',
      precio: 2000,
      duracion: 30,
      categoriaId: peluqueria.id,
    },
    {
      nombre: 'Coloración',
      descripcion: 'Tinte, reflejos o balayage',
      imageUrl: '',
      precio: 7000,
      duracion: 90,
      categoriaId: peluqueria.id,
    },
    {
      nombre: 'Baño de crema',
      descripcion: 'Tratamiento nutritivo para el cabello',
      imageUrl: '',
      precio: 2500,
      duracion: 30,
      categoriaId: peluqueria.id,
    },
    {
      nombre: 'Keratina alisadora',
      descripcion: 'Alisado prolongado con keratina',
      imageUrl: '',
      precio: 12000,
      duracion: 120,
      categoriaId: peluqueria.id,
    },
    {
      nombre: 'Botox capilar',
      descripcion: 'Rejuvenecimiento capilar',
      imageUrl: '',
      precio: 10000,
      duracion: 90,
      categoriaId: peluqueria.id,
    },
    {
      nombre: 'Hidratación profunda',
      descripcion: 'Reparación de cabello dañado',
      imageUrl: '',
      precio: 3500,
      duracion: 40,
      categoriaId: peluqueria.id,
    },
    {
      nombre: 'Shock de nutrición',
      descripcion: 'Tratamiento intensivo',
      imageUrl: '',
      precio: 4500,
      duracion: 45,
      categoriaId: peluqueria.id,
    },
    {
      nombre: 'Tratamiento anti frizz',
      descripcion: 'Control del frizz',
      imageUrl: '',
      precio: 4000,
      duracion: 50,
      categoriaId: peluqueria.id,
    },

    // 👁 Pestañas y Cejas
    {
      nombre: 'Pestañas clásicas',
      descripcion: 'Extensión una por una',
      imageUrl: '',
      precio: 5000,
      duracion: 75,
      categoriaId: cejas.id,
    },
    {
      nombre: 'Pestañas volumen (2D/3D/Ruso)',
      descripcion: 'Extensiones densas',
      imageUrl: '',
      precio: 6000,
      duracion: 90,
      categoriaId: cejas.id,
    },
    {
      nombre: 'Mantenimiento de extensiones',
      descripcion: 'Reposición de pestañas',
      imageUrl: '',
      precio: 3000,
      duracion: 45,
      categoriaId: cejas.id,
    },
    {
      nombre: 'Lifting de pestañas',
      descripcion: 'Levantamiento natural',
      imageUrl: '',
      precio: 3500,
      duracion: 60,
      categoriaId: cejas.id,
    },
    {
      nombre: 'Tinte de pestañas',
      descripcion: 'Coloración para más definición',
      imageUrl: '',
      precio: 2000,
      duracion: 30,
      categoriaId: cejas.id,
    },
    {
      nombre: 'Diseño y perfilado de cejas',
      descripcion: 'Moldeo y depilación profesional',
      imageUrl: '',
      precio: 2500,
      duracion: 25,
      categoriaId: cejas.id,
    },
    {
      nombre: 'Laminado de cejas',
      descripcion: 'Fijación y peinado por semanas',
      imageUrl: '',
      precio: 4000,
      duracion: 45,
      categoriaId: cejas.id,
    },

    // 💅 Uñas
    {
      nombre: 'Manicura tradicional',
      descripcion: 'Limpieza y esmaltado clásico',
      imageUrl: '',
      precio: 1800,
      duracion: 30,
      categoriaId: unas.id,
    },
    {
      nombre: 'Manicura semipermanente',
      descripcion: 'Esmaltado de larga duración',
      imageUrl: '',
      precio: 2500,
      duracion: 45,
      categoriaId: unas.id,
    },
    {
      nombre: 'Pedicura spa',
      descripcion: 'Cuidado profundo de pies',
      imageUrl: '',
      precio: 3500,
      duracion: 60,
      categoriaId: unas.id,
    },
    {
      nombre: 'Esmaltado común o semipermanente',
      descripcion: 'Aplicación de esmalte',
      imageUrl: '',
      precio: 1500,
      duracion: 25,
      categoriaId: unas.id,
    },
    {
      nombre: 'Uñas esculpidas',
      descripcion: 'Extensión con gel o acrílico',
      imageUrl: '',
      precio: 6000,
      duracion: 90,
      categoriaId: unas.id,
    },
    {
      nombre: 'Reforzamiento de uñas naturales',
      descripcion: 'Fortalecimiento sin alargar',
      imageUrl: '',
      precio: 3000,
      duracion: 45,
      categoriaId: unas.id,
    },
    {
      nombre: 'Spa de manos/pies',
      descripcion: 'Exfoliación y mascarilla',
      imageUrl: '',
      precio: 2800,
      duracion: 35,
      categoriaId: unas.id,
    },
    {
      nombre: 'Reconstrucción de uñas quebradas',
      descripcion: 'Reparación individual',
      imageUrl: '',
      precio: 1000,
      duracion: 15,
      categoriaId: unas.id,
    },

    // 💆‍♀️ Masajes
    {
      nombre: 'Masaje descontracturante',
      descripcion: 'Eliminación de tensiones musculares',
      imageUrl: '',
      precio: 5000,
      duracion: 60,
      categoriaId: masajes.id,
    },
    {
      nombre: 'Masaje relajante',
      descripcion: 'Relajación profunda',
      imageUrl: '',
      precio: 4500,
      duracion: 50,
      categoriaId: masajes.id,
    },
    {
      nombre: 'Masaje localizado',
      descripcion: 'Zonas específicas: cuello, espalda o piernas',
      imageUrl: '',
      precio: 3000,
      duracion: 30,
      categoriaId: masajes.id,
    },
    {
      nombre: 'Masaje con piedras calientes',
      descripcion: 'Terapia con calor',
      imageUrl: '',
      precio: 6000,
      duracion: 70,
      categoriaId: masajes.id,
    },
    {
      nombre: 'Drenaje linfático manual',
      descripcion: 'Estimulación del sistema linfático',
      imageUrl: '',
      precio: 5500,
      duracion: 60,
      categoriaId: masajes.id,
    },
    {
      nombre: 'Masaje con aceites esenciales',
      descripcion: 'Masaje con aromas y aceites',
      imageUrl: '',
      precio: 5000,
      duracion: 60,
      categoriaId: masajes.id,
    },
    {
      nombre: 'Masaje reductor',
      descripcion: 'Masaje intenso para moldeado corporal',
      imageUrl: '',
      precio: 6500,
      duracion: 75,
      categoriaId: masajes.id,
    },
  ]

  // Crear servicios solo si no existen (por nombre y categoría)
  for (const servicio of servicios) {
    const exists = await prisma.servicio.findFirst({
      where: { nombre: servicio.nombre, categoriaId: servicio.categoriaId },
    })
    if (!exists) {
      await prisma.servicio.create({ data: servicio })
    }
  }

  console.log('✔️ Seed ejecutado exitosamente (solo datos faltantes creados)')
}

main()
  .catch((e) => {
    console.error('❌ Error durante el seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
