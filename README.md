# 🚚 ShipNow API

API REST desarrollada con Node.js, Express y MongoDB siguiendo una arquitectura profesional por capas (Controller → Service → Repository).

Este proyecto forma parte del desarrollo del curso Backend III y evolucionará progresivamente incorporando documentación, testing, logging, Docker y otras herramientas orientadas a producción.

---

# 🚀 Tecnologías utilizadas

- Node.js
- Express
- MongoDB
- Mongoose
- Dotenv
- Nodemon

---

# 🏗 Arquitectura

El proyecto implementa una arquitectura de tres capas:

```
Routes
   │
   ▼
Controllers
   │
   ▼
Services
   │
   ▼
Repositories
   │
   ▼
MongoDB
```

Cada capa tiene una responsabilidad específica:

- **Controllers:** reciben las peticiones HTTP.
- **Services:** contienen la lógica de negocio.
- **Repositories:** gestionan el acceso a la base de datos.
- **Models:** definen los esquemas de MongoDB.

---

# 📂 Estructura del proyecto

```
src
│
├── config
├── constants
├── controllers
├── database
├── middlewares
├── models
├── repositories
├── routes
├── services
├── utils
├── app.js
└── server.js
```

---

# ⚙ Variables de entorno

Crear un archivo `.env` con:

```env
PORT=8080
MONGODB_URI=mongodb://localhost:27017/shipnow
NODE_ENV=development
```

---

# ▶ Instalación

Instalar dependencias:

```bash
npm install
```

Iniciar el servidor:

```bash
npm run dev
```

---

# 📡 Endpoints disponibles

## Usuarios

GET /api/users

GET /api/users/:id

POST /api/users

---

## Envíos

GET /api/shipments

GET /api/shipments/:id

POST /api/shipments

---

## Health Check

GET /api/health

---

# 📌 Estado del proyecto

✅ Arquitectura por capas

✅ Configuración mediante variables de entorno

✅ Repository Pattern

✅ Health Check

🔜 Logging

🔜 Swagger

🔜 Testing

🔜 Docker

---

# 👨‍💻 Autor

Proyecto desarrollado por Darfex como parte del curso Backend III.