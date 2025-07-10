# 🗂️ Organización del Proyecto - Reserva de Turnos

Este documento contiene la organización inicial del proyecto web de reservas de turnos para servicios de belleza.

---

## ✍ Investigación y Diseño

- [X] Definir roles: usuario final vs. administrador
- [X] Crear mockups / bocetos de la interfaz
- [x] Esquematizar base de datos (modelos, relaciones)
- [X] Definir servicios de belleza y estructura de reservas
- [X] Revisión de requisitos y funcionalidades
- [X] Definir flujo de usuario: desde la selección del servicio hasta la confirmación del turno

---

## 🎨 Frontend

- [x] Página principal con presentación de servicios
- [x] Página de conocenos
- [x] Página de nuestros espacios
- [x] Página de servicios
- [x] Página de nuestros clientes
- [x] Página pre reserva y seleccion de servicio
- [x] Página reservar turnos
- [X] Página de confirmación y checkout
- [x] notificacion
- [x] Validación de formularios en frontend
- [x] Barra de navegación reutilizable
- [x] Componentes reutilizables: tarjetas de servicio, formulario de reserva

---

## ⚙️ Backend y Base de Datos

- [x] Crear esquemas prisma y migraciones de base de datos
- [x] Configurar conexión a la base de datos (PostgreSQL)
- [x] Configurar ORM (Prisma)
- [x] Crear modelos de datos: Usuario, Servicio, Reserva
- [x] Endpoints para autenticación (login, logout, registro)
- [x] Validación de datos en backend
- [x] Manejo de errores 404 y generales

---

## 🔐 Autenticación y Roles

- [x] Configurar NextAuth
- [x] Implementar login/logout
- [x] Diferenciar vistas entre usuario y administrador
- [x] Proteger rutas de administrador

---

## 💳 Integraciones Externas

- [x] Integrar Mercado Pago (modo sandbox)
- [x] Probar flujo de pago básico desde frontend
- [x] Agregar alguna API externa útil (imagenes, frases motivacionales, etc.)

---

## 🧑‍💼 Funcionalidades del Administrador

- [x] Panel para ver pedidos realizados
- [x] Altas,bajas y modificaciones de servicios
- [x] Vista resumen de turnos o ingresos

---

## 🧪 Testing y Control de Calidad

- [x] Validación de formularios en backend
- [x] Accesibilidad básica (usar Lighthouse)
- [x] Búsqueda y paginación de servicios
- [x] Revisar responsividad en móviles

---

## 🚀 Deploy y Entrega

- [x] Subir a GitHub (rama main)
- [x] Desplegar en Vercel
- [x] Agregar link funcional en README
- [x] Revisión final con checklist
- [ ] Ensayo de defensa

---

## 💡 Ideas / Opcional IA

- [ ] Chatbot de atención al cliente con IA
- [ ] Generación automática de descripciones para servicios
