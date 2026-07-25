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
# Decisiones de arquitectura

Se implementó una arquitectura por capas con el objetivo de separar responsabilidades y facilitar el mantenimiento del proyecto.

- Controllers
Gestionan exclusivamente la comunicación HTTP.

- Services
Contienen la lógica de negocio de la aplicación. Aquí se realizan validaciones, reglas del dominio y decisiones antes de acceder a los datos.

- Repositories
Encapsulan todo el acceso a MongoDB mediante Mongoose. Ninguna otra capa conoce cómo se almacenan los datos.

Esta separación permite modificar la lógica de negocio sin afectar el acceso a la base de datos y viceversa, facilitando el testing, la escalabilidad y el mantenimiento del proyecto.

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

Proyecto desarrollado por Jeremías Perrota como parte del curso Backend III.

