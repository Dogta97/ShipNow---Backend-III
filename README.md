# 🚚 ShipNow API

API REST desarrollada con Node.js, Express y MongoDB siguiendo una arquitectura profesional por capas (Controller → Service → Repository).

Este proyecto forma parte del curso Backend III y evolucionará progresivamente incorporando documentación, testing, logging, Docker y otras herramientas orientadas a producción.

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

- **Controllers:** reciben las peticiones HTTP y devuelven respuestas.
- **Services:** contienen la lógica de negocio y las validaciones.
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
├── mocks
├── models
├── repositories
├── routes
├── services
├── utils
├── app.js
└── server.js

```

---

# 📐 Decisiones de arquitectura

Se implementó una arquitectura por capas con el objetivo de separar responsabilidades y facilitar el mantenimiento del proyecto.

## Controllers

Gestionan exclusivamente la comunicación HTTP.

## Services

Contienen la lógica de negocio de la aplicación. Aquí se realizan validaciones, reglas del dominio y decisiones antes de acceder a los datos.

## Repositories

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

Clonar el repositorio:

```bash
git clone <URL_DEL_REPOSITORIO>
```

Ingresar a la carpeta:

```bash
cd shipnow
```

Instalar dependencias:

```bash
npm install
```

Iniciar el servidor:

```bash
npm run dev
```

---

# 📦 Modelos implementados

## Usuario (User)

- name
- email
- role

Roles disponibles:

- ADMIN
- USER
- DELIVERER

---

## Producto (Product)

- name
- description
- price
- stock
- status

Estados disponibles:

- AVAILABLE
- OUT_OF_STOCK

---

## Pedido (Order)

- user
- products
- status
- priority

Estados disponibles:

- PENDING
- CONFIRMED
- PREPARING
- SHIPPED
- DELIVERED
- CANCELLED

Prioridades disponibles:

- LOW
- NORMAL
- HIGH
- URGENT

---

## Envío (Shipment)

- trackingNumber
- order
- deliverer
- origin
- destination
- weight
- status

Estados disponibles:

- PENDING
- IN_TRANSIT
- DELIVERED
- CANCELLED

---

# 🔗 Relaciones entre entidades

El proyecto respeta las siguientes relaciones:

```text
User
 │
 └── Order
        │
        └── Product

Order
 │
 └── Shipment
        │
        └── Deliverer (User con rol DELIVERER)
```

---

# 📡 Endpoints disponibles

## Usuarios

```http
GET /api/users
```

```http
GET /api/users/:id
```

```http
POST /api/users
```

---

## Envíos

```http
GET /api/shipments
```

```http
GET /api/shipments/:id
```

```http
POST /api/shipments
```

---

## Health Check

```http
GET /api/health
```

---

# 🎭 Sistema de mocking

El proyecto incluye un módulo de generación de datos de prueba.

Base:

```http
/api/mocks
```

## Usuarios

Generar usuarios sin guardar:

```http
GET /api/mocks/users?quantity=10
```

Guardar usuarios:

```http
POST /api/mocks/users?quantity=10
```

---

## Repartidores

Generar repartidores sin guardar:

```http
GET /api/mocks/deliverers?quantity=10
```

Guardar repartidores:

```http
POST /api/mocks/deliverers?quantity=10
```

---

## Pedidos

Generar pedidos sin guardar:

```http
GET /api/mocks/orders?quantity=10
```

Guardar pedidos:

```http
POST /api/mocks/orders?quantity=10
```

---

## Envíos

Generar envíos sin guardar:

```http
GET /api/mocks/shipments?quantity=10
```

Guardar envíos:

```http
POST /api/mocks/shipments?quantity=10
```

---

# ✅ Criterios cumplidos

- Arquitectura por capas.
- Repository Pattern.
- Variables de entorno centralizadas.
- Sistema de mocking.
- Generación de usuarios.
- Generación de repartidores.
- Generación de pedidos.
- Generación de envíos.
- Relaciones entre entidades.
- Endpoints para persistir datos de prueba en MongoDB.

---

# 📌 Estado del proyecto

✅ Arquitectura por capas

✅ Variables de entorno

✅ Repository Pattern

✅ Sistema de mocking

✅ Relaciones entre entidades

✅ Health Check

🔜 Logging

🔜 Swagger

🔜 Testing

🔜 Docker

---

# 👨‍💻 Autor

Proyecto desarrollado por **Jeremías Perrota** como parte del curso **Backend III**.