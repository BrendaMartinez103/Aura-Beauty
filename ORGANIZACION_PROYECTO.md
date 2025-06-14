# 🗂️ Organización del Proyecto - Reserva de Turnos

Este documento contiene la organización inicial del proyecto web de reservas de turnos para servicios de belleza.

---

## ✍ Investigación y Diseño

- [ ] Definir roles: usuario final vs. administrador
- [ ] Crear mockups / bocetos de la interfaz
- [ ] Esquematizar base de datos (modelos, relaciones)
- [ ] Definir servicios de belleza y estructura de reservas
- [ ] Revisión de requisitos y funcionalidades
- [ ] Definir flujo de usuario: desde la selección del servicio hasta la confirmación del turno

---

## 🎨 Frontend

- [X] Página principal con presentación de servicios
- [X] Página de conocenos
- [X] Página de nuestros espacios
- [X] Página de servicios
- [X] Página de nuestros clientes
- [X] Página pre gift card
- [ ] Página gift card
- [X] Página pre reserva y seleccion de servicio
- [x] Página reservar turnos
- [ ] Página de confirmación y checkout
- [ ] notificacion
- [ ] Validación de formularios en frontend
- [ ] Barra de navegación y footer reutilizable
- [ ] Componentes reutilizables: tarjetas de servicio, formulario de reserva

---

## ⚙️ Backend y Base de Datos

- [X] Crear esquemas prisma y migraciones de base de datos
- [X] Configurar conexión a la base de datos (PostgreSQL)
- [X] Configurar ORM (Prisma)
- [X] Crear modelos de datos: Usuario, Servicio, Reserva
- [ ] Endpoints API REST para CRUD de servicios
- [ ] Endpoints API REST para reservas de turnos
- [ ] Endpoints para autenticación (login, logout, registro)
- [ ] Validación de datos en backend
- [ ] Manejo de errores 404 y generales

---

## 🔐 Autenticación y Roles

- [ ] Configurar NextAuth
- [X] Implementar login/logout
- [ ] Diferenciar vistas entre usuario y administrador
- [ ] Proteger rutas de administrador

---

## 💳 Integraciones Externas

- [ ] Integrar Mercado Pago (modo sandbox)
- [ ] Probar flujo de pago básico desde frontend
- [ ] Agregar alguna API externa útil (imagenes, frases motivacionales, etc.)

---

## 🧑‍💼 Funcionalidades del Administrador

- [ ] Panel para ver turnos reservados
- [ ] Altas,bajas y modificaciones de servicios
- [ ] Vista resumen de turnos o ingresos

---

## 🧪 Testing y Control de Calidad

- [ ] Validación de formularios en backend
- [ ] Accesibilidad básica (usar Lighthouse)
- [ ] Búsqueda y paginación de servicios
- [ ] Revisar responsividad en móviles

---

## 🚀 Deploy y Entrega

- [ ] Subir a GitHub (rama main)
- [ ] Desplegar en Vercel
- [ ] Agregar link funcional en README
- [ ] Revisión final con checklist
- [ ] Ensayo de defensa

---

## 💡 Ideas / Opcional IA

- [ ] Chatbot de atención al cliente con IA
- [ ] Generación automática de descripciones para servicios
- [ ] Sugerencia inteligente de turnos según disponibilidad
