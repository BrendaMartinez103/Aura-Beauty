[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/2gizGE2c)

[<button>☑ Organizacion del proyecto</button>](ORGANIZACION_PROYECTO.md)

# Proyecto 2 - Desarrollo de Aplicación Web Completa con Next.js y PostgreSQL

**Autores**
**Brenda Martinez**
**Nahuel Diaz**

---

# 💅 Bienvenidos a Aura Beauty

https://aura-beauty-three.vercel.app/
Aura Beauty es una aplicación web progresiva (PWA) que permite a los usuarios reservar y pagar por servicios de estética y belleza de manera rápida, cómoda y segura. La plataforma fue desarrollada con Next.js, PostgreSQL, NextAuth, Mercado Pago, y cuenta con funcionalidades avanzadas como notificaciones push, búsqueda y paginación, y un panel de administración exclusivo.

**🧾 ¿Qué podés hacer en Aura Beauty?**

- Navegar libremente por la plataforma sin necesidad de estar logueado.
- Explorar:
  - La historia de Aura Beauty en la sección "Conocenos".
  - El local físico en la sección "Nuestros espacios".
  - El catálogo completo en la sección "Servicios".
  - Opiniones de clientes en "Nuestros clientes" (opiniones estáticas).
  - Recibir notificaciones push sobre nuevas promociones (con permiso activado)
- Al registrarte y loguearte, podrás:
  - Agregar cuantos servicios quieras al carrito.
  - Editar la cantidad de servicios o eliminarlos desde el carrito.
  - Realizar el pago en línea mediante Mercado Pago.
  - Finalizada la compra, solo tendrás que acercarte al local físico para disfrutar del servicio.

**🛍️ Experiencia de compra**

- Podés iniciar la compra de varias maneras:
  - Seleccionando una categoría desde la página principal.
  - Usando el botón "Comprar ahora".
- Ingresando a la sección "Comprar Servicios" desde el menú, donde podrás:
  - Ver todos los servicios.
  - Filtrar por categoría.
  - Usar la búsqueda y la paginación para encontrar fácilmente lo que necesitás.
- Cada servicio puede agregarse al carrito indicando la cantidad deseada. Desde allí, podés modificar la cantidad, eliminarlo, o continuar comprando.
  Al presionar "Finalizar compra", se inicia el proceso de pago con Mercado Pago (modo sandbox).

**🛠️ Funcionalidades avanzadas**

✅ PWA: Instalable en dispositivos móviles. Podés tener Aura Beauty como app directamente en tu pantalla de inicio.

✅ Notificaciones push: Los administradores pueden enviar notificaciones promocionales a los usuarios.

✅ Búsqueda + paginación: En las páginas de categoría, los servicios están paginados y se pueden buscar por nombre o descripción.

✅ Accesibilidad, validaciones, y manejo de errores implementados.

**👩‍💼 Panel de administración**

El panel de administración está disponible únicamente para el usuario:

- ¿Qué puede hacer el administrador?
  - Enviar notificaciones push a los usuarios.
  - Visualizar reportes de la última semana.
  - Ver nuevos usuarios registrados.
  - Gestionar servicios:
    - Crear nuevas categorías.
    - Editar o eliminar servicios existentes.
  - Visualizar:
    - Todos los pedidos realizados.
    - Todos los clientes registrados.

---

✅ Tecnologías utilizadas

- Frontend: Next.js 15 App Router
- Base de Datos: PostgreSQL con Prisma ORM
- Autenticación: NextAuth.js
- Pasarela de pagos: Mercado Pago (Checkout Pro)
- Estilos: Bootstrap 5 customizado + CSS propio
- Notificaciones Push: Web Push API con web-push
- Deploy: Vercel

---

### 📋 Requisitos cumplidos por Aura Beauty

✅ **Frontend en Next.js**
La aplicación fue desarrollada utilizando Next.js 14 con el sistema de rutas app/. Se usaron componentes reutilizables como ServicioCardInteractiva, OffcanvasNavbar, ListaServiciosPorCategoria, FormularioLogin, entre otros, lo cual garantiza una estructura modular y escalable.

✅ **Backend con API en Node.js y PostgreSQL**
El backend está implementado con API Routes de Next.js en conjunto con Prisma ORM. La base de datos utilizada es PostgreSQL, donde se almacenan clientes, servicios, carritos y compras de manera persistente. Se realizaron migraciones y relaciones entre modelos siguiendo buenas prácticas.

✅ **Autenticación de usuarios**
Se utilizó NextAuth para gestionar la autenticación de usuarios. Los clientes pueden registrarse con sus datos y luego loguearse para realizar compras. La sesión es persistente y protegida, tanto en el frontend como en las APIs.

✅ **Integración con Mercado Pago**
El proceso de pago se realiza mediante Mercado Pago - Checkout Pro utilizando modo sandbox. Al presionar "Finalizar compra", se genera un init_point que redirige al usuario para completar el pago de forma segura.

✅ **Carrito de compras o selección de reservas**
Los usuarios pueden seleccionar uno o más servicios y agregarlos al carrito. Desde ahí pueden modificar la cantidad, eliminar servicios, o continuar comprando antes de realizar el pago. Todo esto implementado desde la base de datos, no solo en el estado del frontend

✅ **Interfaz bien trabajada**
La interfaz fue desarrollada con Bootstrap 5, respetando el diseño responsive y con un enfoque estético profesional. Se utilizaron estilos personalizados (text-purple, btn-purple, rounded, shadow-sm, etc.) para lograr una experiencia visual atractiva.

✅ **Búsqueda y Paginación**
En la sección /reserva/categoria/[categoria], se implementó:
-Búsqueda por nombre o descripción del servicio.
-Paginación de resultados con parámetros en la URL (?page= y &search=), permitiendo encontrar fácilmente cualquier servicio.

✅ **Manejo de Errores**
Se implementaron: - Respuestas JSON con códigos 401, 404 y 400 en APIs como /api/carrito, /api/registro, /api/pago. - Páginas condicionales como "Categoría no encontrada". - Validación de errores al procesar pagos o formularios incorrectos.

✅ **Validación de Formularios**
El formulario de registro valida los campos obligatorios. Además, se implementaron mensajes de error personalizados en caso de errores del servidor, como emails duplicados o datos inválidos.

✅ **Accesibilidad**
Se usaron elementos semánticos, contraste de colores adecuado, aria-labels en íconos interactivos, y navegación por teclado. Además, los formularios tienen etiquetas correctamente asociadas.

✅ **Consumo de una API Externa**
Se utiliza la API oficial de Mercado Pago para:

- Consultar el estado del pago (/success).
- Procesar las compras con credenciales access_token.
- Validar datos de las transacciones en el backend antes de crear una compra real.

Para el almacenamiento de imagenes utilizamos Cloudinary:
- Obtenemos las url publicas.
- Realizamos el upload de las imagenes.

---

⚠️ .env.local con variables de entorno:

DATABASE_URL=postgresql://...

NEXTAUTH_SECRET=...

NEXTAUTH_URL=...

MERCADOPAGO_ACCESS_TOKEN=...

MERCADOPAGO_MODO=...

VAPID_PUBLIC_KEY=...

VAPID_PRIVATE_KEY=...

NEXT_PUBLIC_VAPID_PUBLIC_KEY=...

CLOUDINARY_CLOUD_NAME=...

CLOUDINARY_API_KEY=...

CLOUDINARY_API_SECRET=...


**📦 Deploy en producción**
🔗 App deployada: https://aura-beauty-three.vercel.app/

**👥 Equipo de desarrollo**
Brenda Martinez

Nahuel Diaz
