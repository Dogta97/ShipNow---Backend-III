# 🚚 ShipNow API

API REST desarrollada con **Node.js, Express y MongoDB**, siguiendo una arquitectura profesional por capas.

ShipNow fue desarrollado como proyecto del curso **Backend III** e integra arquitectura por capas, Repository Pattern, mocking, manejo centralizado de errores, logging con Winston, documentación Swagger/OpenAPI, testing funcional, carga de archivos con Multer, paginación, filtros, configuración por entornos y despliegue mediante Docker y Docker Compose.

---

# 🚀 Tecnologías utilizadas

- Node.js 24
- Express 5
- MongoDB
- Mongoose
- Dotenv
- Nodemon
- Winston
- Swagger / OpenAPI 3.0
- swagger-jsdoc
- swagger-ui-express
- Mocha
- Chai
- Supertest
- Multer
- Docker
- Docker Compose

---

# 🏗 Arquitectura

ShipNow implementa una arquitectura por capas:

```text
Request
   │
   ▼
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
MongoDB / Mongoose
```

Ante un error:

```text
Service / Controller
        │
        ▼
    next(error)
        │
        ▼
Global Error Middleware
        │
        ├── Logger
        │
        ▼
HTTP JSON Response
```

## Routes

Definen las rutas HTTP y conectan cada endpoint con su Controller.

## Controllers

Reciben las solicitudes HTTP, delegan la operación al Service correspondiente y derivan los errores al middleware global mediante:

```js
next(error);
```

## Services

Contienen la lógica de negocio:

- validaciones;
- reglas del dominio;
- verificación de existencia de entidades;
- validación de paginación y filtros;
- generación de errores personalizados;
- coordinación entre repositories;
- gestión de metadata de archivos.

## Repositories

Encapsulan el acceso a MongoDB mediante Mongoose.

Sus responsabilidades incluyen:

- consultas;
- creación;
- actualización;
- eliminación;
- paginación;
- conteo de documentos;
- persistencia de metadata.

Esta separación permite que la lógica de negocio no dependa directamente de Mongoose.

## Models

Definen los schemas, validaciones y relaciones entre entidades.

## Middlewares

Contienen lógica transversal, principalmente el manejo global de errores.

## Errors

Centralizan códigos, mensajes y status HTTP mediante `AppError` y `errorDictionary.js`.

## Logger

Centraliza el registro de eventos de la aplicación mediante Winston.

## Swagger

Documenta la API utilizando OpenAPI 3.0 y proporciona una interfaz interactiva para probar endpoints.

---

# 📂 Estructura general

```text
ShipNow/
│
├── src/
│   │
│   ├── config/
│   │   ├── env.config.js
│   │   ├── logger.js
│   │   ├── multer.config.js
│   │   └── swagger.config.js
│   │
│   ├── constants/
│   ├── controllers/
│   ├── database/
│   ├── errors/
│   │   ├── AppError.js
│   │   └── errorDictionary.js
│   │
│   ├── middlewares/
│   ├── mocks/
│   ├── models/
│   │   ├── deliverer.js
│   │   ├── order.js
│   │   ├── product.js
│   │   ├── shipment.js
│   │   └── user.js
│   │
│   ├── repositories/
│   ├── routes/
│   │   ├── health.routes.js
│   │   ├── logger.routes.js
│   │   ├── mock.routes.js
│   │   ├── order.routes.js
│   │   ├── product.routes.js
│   │   ├── shipment.routes.js
│   │   ├── upload.routes.js
│   │   └── user.routes.js
│   │
│   ├── services/
│   ├── utils/
│   ├── app.js
│   └── server.js
│
├── test/
│   ├── setup.js
│   ├── orders.test.js
│   ├── shipments.test.js
│   ├── system.test.js
│   ├── uploads.test.js
│   └── users.test.js
│
├── uploads/
│   ├── users/
│   └── receipts/
│
├── logs/
│
├── Dockerfile
├── docker-compose.yml
├── .dockerignore
├── .env.example
├── .env.test.example
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

`uploads/` y `logs/` son directorios generados durante la ejecución y están excluidos del repositorio.

---

# 📦 Entidades principales

## User

Campos principales:

```text
name
email
role
documents
createdAt
updatedAt
```

Roles disponibles:

```text
ADMIN
USER
DELIVERER
```

Los documentos cargados mediante Multer se almacenan como metadata dentro del usuario.

---

## Product

Campos principales:

```text
name
description
price
stock
status
createdAt
updatedAt
```

Estados:

```text
AVAILABLE
OUT_OF_STOCK
```

---

## Order

Campos principales:

```text
user
products
status
priority
receipt
createdAt
updatedAt
```

Estados:

```text
PENDING
CONFIRMED
PREPARING
SHIPPED
DELIVERED
CANCELLED
```

Prioridades:

```text
LOW
NORMAL
HIGH
URGENT
```

---

## Shipment

Campos principales:

```text
trackingNumber
order
deliverer
origin
destination
weight
status
receipt
createdAt
updatedAt
```

Estados:

```text
PENDING
IN_TRANSIT
DELIVERED
CANCELLED
```

Cada Shipment posee un `trackingNumber` único y puede almacenar la metadata de un comprobante mediante `receipt`.

---

# 🔗 Relaciones entre entidades

```text
User
 │
 └── Order
      │
      ├── Product
      │
      └── Shipment
           │
           └── Deliverer
                │
                └── User con role DELIVERER
```

Los repartidores forman parte de la colección de usuarios y se identifican mediante:

```text
role: DELIVERER
```

---

# ⚙ Variables de entorno

ShipNow utiliza variables de entorno para separar la configuración del código fuente.

Crear un archivo `.env` en la raíz tomando como referencia `.env.example`:

```env
PORT=8080
MONGODB_URI=mongodb://localhost:27017/shipnow
NODE_ENV=development
LOG_LEVEL=debug
```

Variables requeridas:

```text
PORT
MONGODB_URI
NODE_ENV
LOG_LEVEL
```

La aplicación valida las variables críticas durante el inicio.

Si falta una variable obligatoria o su valor no es válido, el proceso falla inmediatamente.

Esto implementa una estrategia **fail fast**.

---

# 🌎 Entornos soportados

`NODE_ENV` acepta:

```text
development
test
production
```

Cualquier otro valor provoca un error de configuración.

Los endpoints internos de mocks y prueba del logger no se montan en producción.

---

# 📋 LOG_LEVEL

Niveles personalizados:

```text
fatal
error
warning
info
http
debug
```

Para desarrollo:

```env
LOG_LEVEL=debug
```

Para producción:

```env
LOG_LEVEL=info
```

---

# 🧪 Entorno de testing

Los tests utilizan una base de datos independiente.

Ejemplo `.env.test`:

```env
PORT=8081
MONGODB_URI=mongodb://localhost:27017/shipnow_test
NODE_ENV=test
LOG_LEVEL=debug
```

`test/setup.js` protege la suite para impedir que los tests se ejecuten accidentalmente contra la base principal.

---

# ▶ Instalación local

Clonar el repositorio:

```bash
git clone <URL_DEL_REPOSITORIO>
```

Ingresar al proyecto:

```bash
cd ShipNow
```

Instalar dependencias:

```bash
npm install
```

Asegurarse de que MongoDB esté disponible y configurar `.env`.

Iniciar en desarrollo:

```bash
npm run dev
```

Iniciar normalmente:

```bash
npm start
```

La API estará disponible en:

```text
http://localhost:8080
```

---

# 📡 Endpoints principales

## Users

```http
GET    /api/users
GET    /api/users/:id
POST   /api/users
PUT    /api/users/:id
DELETE /api/users/:id
```

## Products

```http
GET  /api/products
GET  /api/products/:id
POST /api/products
```

## Orders

```http
GET  /api/orders
GET  /api/orders/:id
POST /api/orders
PUT  /api/orders/:id/status
```

## Shipments

```http
GET    /api/shipments
GET    /api/shipments/tracking/:trackingNumber
GET    /api/shipments/:id
POST   /api/shipments
PUT    /api/shipments/:id
DELETE /api/shipments/:id
```

La ruta de tracking permite buscar directamente un envío utilizando su número de seguimiento:

```http
GET /api/shipments/tracking/SHIP-TRACKING-001
```

## Uploads

```http
POST /api/uploads/users/:id/documents
POST /api/uploads/orders/:id/receipt
POST /api/uploads/shipments/:id/receipt
```

## Health

```http
GET /api/health
```

## Swagger

```text
GET /api/docs
```

## Mocks

Disponibles únicamente cuando `NODE_ENV !== production`.

Ruta base:

```text
/api/mocks
```

## Logger

Endpoint técnico disponible únicamente cuando `NODE_ENV !== production`.

---

# ⚡ Performance y escalabilidad

Los endpoints de listado implementan:

- paginación;
- límite configurable;
- máximo de registros por página;
- filtros;
- `skip()` y `limit()`;
- `countDocuments()`.

Endpoints paginados:

```http
GET /api/users
GET /api/products
GET /api/orders
GET /api/shipments
```

Valores:

```text
page por defecto: 1
limit por defecto: 10
limit máximo: 100
```

Ejemplo:

```http
GET /api/shipments?page=1&limit=5&status=IN_TRANSIT
```

La respuesta incluye metadata:

```json
{
  "status": "success",
  "payload": [],
  "pagination": {
    "page": 1,
    "limit": 5,
    "totalDocs": 20,
    "totalPages": 4,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

---

# 🔎 Filtros

## Users

```http
GET /api/users?role=USER
```

Valores:

```text
ADMIN
USER
DELIVERER
```

## Products

```http
GET /api/products?status=AVAILABLE
```

## Orders

```http
GET /api/orders?status=PENDING&priority=HIGH
```

## Shipments

```http
GET /api/shipments?status=IN_TRANSIT
```

Los filtros pueden combinarse con `page` y `limit`.

---

# 📦 Control del payload JSON

Express limita el body JSON a:

```text
1 MB
```

Configuración:

```js
express.json({
    limit: "1mb",
});
```

Esto reduce el riesgo de procesar payloads excesivamente grandes.

---

# 📤 Gestión de archivos con Multer

ShipNow utiliza Multer para procesar solicitudes:

```text
multipart/form-data
```

Se soportan tres operaciones:

```http
POST /api/uploads/users/:id/documents
POST /api/uploads/orders/:id/receipt
POST /api/uploads/shipments/:id/receipt
```

---

# 📄 Documentos de usuario

Campos:

```text
file
documentType
```

Tipos permitidos:

```text
DNI
PASSPORT
LICENSE
OTHER
```

La metadata queda asociada al usuario dentro de `documents`.

---

# 🧾 Comprobantes

Los comprobantes pueden asociarse tanto a pedidos como a envíos:

```http
POST /api/uploads/orders/:id/receipt
POST /api/uploads/shipments/:id/receipt
```

Campo multipart:

```text
file
```

Se registran automáticamente con:

```text
documentType: RECEIPT
```

---

# 📎 Tipos de archivo permitidos

MIME types:

```text
application/pdf
image/jpeg
image/png
```

Equivalentes:

```text
PDF
JPG / JPEG
PNG
```

Tamaño máximo:

```text
5 MB
```

---

# 💾 Metadata de archivos

MongoDB no almacena el contenido binario.

Se persiste metadata:

```text
originalName
filename
path
mimetype
size
documentType
uploadedAt
```

Los archivos físicos se guardan en:

```text
uploads/users/
uploads/receipts/
```

Si el archivo se guarda físicamente pero posteriormente falla una validación o persistencia, ShipNow elimina el archivo para evitar archivos huérfanos.

La limpieza utiliza filesystem asíncrono:

```js
await fs.promises.unlink(filePath);
```

---

# 🚨 Manejo centralizado de errores

ShipNow utiliza:

```text
AppError
errorDictionary.js
error.middleware.js
```

Los Services pueden generar errores de dominio:

```js
throw new AppError(
    ERROR_TYPES.SHIPMENT_NOT_FOUND
);
```

Los Controllers los derivan:

```js
catch (error) {
    next(error);
}
```

El middleware global produce respuestas JSON uniformes.

Formato:

```json
{
  "status": "error",
  "error": "ERROR_CODE",
  "message": "Descripción del error."
}
```

Ejemplo:

```json
{
  "status": "error",
  "error": "SHIPMENT_NOT_FOUND",
  "message": "El envío no fue encontrado."
}
```

---

# 📖 Errores centralizados

Entre los errores implementados se encuentran:

```text
USER_NOT_FOUND
PRODUCT_NOT_FOUND
ORDER_NOT_FOUND
SHIPMENT_NOT_FOUND
ROUTE_NOT_FOUND
INVALID_ID
INVALID_QUANTITY
QUANTITY_LIMIT_EXCEEDED
INVALID_STATUS
INVALID_DATA
INVALID_PRODUCT_DATA
TRACKING_NUMBER_ALREADY_EXISTS
NO_USERS_AVAILABLE
NO_PRODUCTS_AVAILABLE
NO_ORDERS_AVAILABLE
NO_DELIVERERS_AVAILABLE
FILE_REQUIRED
INVALID_FILE_TYPE
FILE_TOO_LARGE
INVALID_DOCUMENT_TYPE
INVALID_FILE_FIELD
FILE_UPLOAD_ERROR
MOCK_DATABASE_ERROR
DATABASE_ERROR
INTERNAL_ERROR
```

Los `CastError` de Mongoose se transforman en errores controlados para evitar exponer detalles internos.

---

# 📊 Logging con Winston

ShipNow utiliza Winston con seis niveles personalizados:

```text
fatal   → 0
error   → 1
warning → 2
info    → 3
http    → 4
debug   → 5
```

La configuración se encuentra en:

```text
src/config/logger.js
```

`LOG_LEVEL` determina el nivel utilizado por el logger.

## Persistencia

Los errores se escriben en:

```text
logs/error.log
```

Los logs generales se escriben en:

```text
logs/combined.log
```

La consola se utiliza únicamente cuando:

```text
NODE_ENV=development
```

En producción el logging queda centralizado en archivos.

`logs/` está excluido del repositorio y puede persistirse mediante un volumen Docker.

---

# 🎭 Sistema de Mocking

ShipNow incorpora generación de datos simulados coherentes con las constantes y relaciones del dominio.

Ruta base:

```text
/api/mocks
```

Endpoints:

```http
GET  /api/mocks/users
POST /api/mocks/users

GET  /api/mocks/deliverers
POST /api/mocks/deliverers

GET  /api/mocks/orders
POST /api/mocks/orders

GET  /api/mocks/shipments
POST /api/mocks/shipments
```

Los `GET` generan datos sin persistir.

Los `POST` generan datos y los almacenan en MongoDB.

Cantidad:

```text
?quantity=N
```

Valor por defecto:

```text
10
```

Máximo:

```text
100
```

---

# 🏭 Endpoints internos en producción

Los módulos:

```text
/api/mocks
/api/logger
```

solo se montan cuando:

```text
NODE_ENV !== production
```

En producción responden mediante el manejo global de ruta inexistente.

Esto evita exponer herramientas internas de desarrollo.

---

# 📚 Swagger / OpenAPI

Swagger UI está disponible en:

```text
http://localhost:8080/api/docs
```

La documentación utiliza OpenAPI 3.0 e incluye:

- Users;
- Products;
- Orders;
- Deliveries / Shipments;
- Uploads;
- Mocks;
- Logger;
- Health;
- paginación;
- filtros;
- request bodies;
- respuestas exitosas;
- errores;
- `multipart/form-data`;
- schemas reutilizables.

Entre los schemas reutilizables se encuentran:

```text
User
Order
Delivery
Shipment
FileMetadata
ErrorResponse
SuccessResponse
```

El schema `Shipment` mantiene compatibilidad con la representación de `Delivery` utilizada por los endpoints existentes.

Swagger permite utilizar **Try it out** y **Execute** para probar la API.

---

# ❤️ Health Check

Endpoint:

```http
GET /api/health
```

Ejemplo:

```json
{
  "status": "ok",
  "environment": "production",
  "uptime": 255.47,
  "timestamp": "2026-09-02T01:24:31.449Z"
}
```

Expone únicamente información básica:

```text
status
environment
uptime
timestamp
```

No expone:

```text
MONGODB_URI
credenciales
variables sensibles
información interna de conexión
```

---

# 🧪 Testing automatizado

ShipNow utiliza:

```text
Mocha
Chai
Supertest
```

Ejecutar:

```bash
npm test
```

La suite utiliza `.env.test` y la base:

```text
shipnow_test
```

## Estado actual

```text
40 passing
```

La suite cubre:

- Users;
- Orders;
- Shipments;
- búsqueda por tracking;
- creación y actualización de envíos;
- tracking duplicado;
- Mocks;
- Logger;
- Swagger;
- Health Check;
- rutas inexistentes;
- documentos de usuario;
- comprobantes de pedidos;
- comprobantes de envíos;
- errores de uploads;
- paginación;
- filtros;
- manejo centralizado de errores.

Última ejecución validada:

```text
40 passing
```

---

# 🐳 Docker

ShipNow incluye:

```text
Dockerfile
.dockerignore
docker-compose.yml
```

---

# 🏗 Dockerfile multi-stage

El Dockerfile utiliza Node.js 24 Alpine y una construcción multi-stage.

```dockerfile
FROM node:24-alpine AS dependencies

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev


FROM node:24-alpine AS production

WORKDIR /app

COPY --from=dependencies /app/node_modules ./node_modules

COPY package*.json ./

COPY src ./src

RUN mkdir -p logs uploads/users uploads/receipts

ENV NODE_ENV=production

EXPOSE 8080

CMD ["npm", "start"]
```

La primera etapa instala las dependencias necesarias para producción.

La segunda construye la imagen final copiando únicamente las dependencias y el código requerido.

---

# 🙈 .dockerignore

El contexto de Docker excluye, entre otros:

```text
node_modules
.env
.env.*
.git
logs
uploads
coverage
.nyc_output
test
.vscode
.idea
```

Los archivos reales de entorno no se copian dentro de la imagen.

---

# 🔨 Construir la imagen Docker

Desde la raíz:

```bash
docker build -t shipnow-api .
```

La imagen generada es:

```text
shipnow-api:latest
```

El build fue validado correctamente con Docker Desktop.

---

# ▶ Ejecutar la imagen individualmente

Cuando MongoDB se encuentra ejecutándose en la máquina host mediante Docker Desktop:

```powershell
docker run --name shipnow-api-test -p 8080:8080 -e PORT=8080 -e MONGODB_URI=mongodb://host.docker.internal:27017/shipnow -e NODE_ENV=production -e LOG_LEVEL=info shipnow-api
```

Dentro de un contenedor:

```text
localhost
```

hace referencia al propio contenedor.

Por eso, para acceder a MongoDB en el host desde Docker Desktop se utiliza:

```text
host.docker.internal
```

La ejecución individual de la imagen fue validada mediante:

```http
GET /api/health
```

obteniendo:

```text
HTTP 200
environment: production
```

---

# 🐳 Docker Compose

La forma recomendada de levantar el stack completo es Docker Compose.

El archivo:

```text
docker-compose.yml
```

define dos servicios:

```text
shipnow-api
shipnow-mongo
```

Arquitectura:

```text
Docker Compose
│
├── api
│   ├── ShipNow
│   ├── puerto 8080
│   ├── NODE_ENV=production
│   ├── logs persistentes
│   └── uploads persistentes
│
└── mongo
    ├── MongoDB 8
    ├── puerto 27017
    ├── datos persistentes
    └── healthcheck
```

La API utiliza dentro de la red Docker:

```text
mongodb://mongo:27017/shipnow
```

No necesita conectarse a `localhost` ni a `host.docker.internal` cuando MongoDB forma parte del mismo Compose.

---

# ❤️ MongoDB Healthcheck

MongoDB posee un healthcheck basado en:

```text
db.adminCommand('ping').ok
```

La API declara:

```yaml
depends_on:
  mongo:
    condition: service_healthy
```

De esta manera ShipNow espera a que MongoDB se encuentre saludable antes de iniciar.

---

# 💾 Persistencia con Docker Compose

Se utilizan tres volúmenes:

```text
mongo_data
shipnow_logs
shipnow_uploads
```

Responsabilidades:

```text
mongo_data
└── /data/db

shipnow_logs
└── /app/logs

shipnow_uploads
└── /app/uploads
```

Esto permite conservar datos, logs y archivos aunque los contenedores sean recreados.

---

# ▶ Ejecutar con Docker Compose

Construir y levantar:

```bash
docker compose up --build
```

Consultar estado:

```bash
docker compose ps
```

Un estado correcto muestra:

```text
shipnow-api     Up
shipnow-mongo   Up (healthy)
```

Health de ShipNow:

```text
http://localhost:8080/api/health
```

Swagger:

```text
http://localhost:8080/api/docs
```

Detener y eliminar contenedores y red:

```bash
docker compose down
```

Los named volumes no se eliminan con `docker compose down`.

Para eliminar también los volúmenes deliberadamente:

```bash
docker compose down -v
```

---

# ✅ Validación de Docker Compose

La configuración fue validada mediante:

```bash
docker compose config
```

El stack fue levantado correctamente con:

```bash
docker compose up --build
```

Se verificó:

```text
shipnow-api     Up
shipnow-mongo   Up (healthy)
```

Y la API respondió correctamente:

```http
GET /api/health
```

Resultado:

```text
HTTP 200
environment: production
```

Finalmente el stack fue detenido correctamente mediante:

```bash
docker compose down
```

---

# 🔐 Seguridad de configuración

ShipNow no versiona archivos de configuración sensibles.

`.gitignore` excluye:

```text
node_modules/
.env
.env.*
logs/
uploads/
coverage/
.nyc_output/
tmp/
temp/
```

Se mantienen explícitamente los archivos de ejemplo:

```text
.env.example
.env.test.example
```

La configuración real debe proporcionarse externamente.

---

# 📌 Scripts disponibles

Desarrollo:

```bash
npm run dev
```

Producción:

```bash
npm start
```

Testing:

```bash
npm test
```

Docker:

```bash
docker build -t shipnow-api .
```

Docker Compose:

```bash
docker compose up --build
```

---

# ✅ Criterios implementados

## Arquitectura

- ✅ Arquitectura por capas
- ✅ Repository Pattern
- ✅ separación entre lógica de negocio y persistencia
- ✅ variables de entorno centralizadas
- ✅ validación fail fast
- ✅ modelos relacionados
- ✅ configuración diferenciada por entorno

## Performance

- ✅ paginación de Users
- ✅ paginación de Products
- ✅ paginación de Orders
- ✅ paginación de Shipments
- ✅ `limit` por defecto de 10
- ✅ máximo de 100 registros
- ✅ filtros
- ✅ `skip()` / `limit()`
- ✅ `countDocuments()`
- ✅ payload JSON limitado a 1 MB
- ✅ uploads limitados a 5 MB

## Mocking

- ✅ usuarios
- ✅ repartidores
- ✅ pedidos
- ✅ envíos
- ✅ generación sin persistencia
- ✅ inserción en MongoDB
- ✅ validación de cantidad
- ✅ máximo de 100 registros simulados

## Errores

- ✅ `AppError`
- ✅ diccionario centralizado
- ✅ middleware global
- ✅ errores de dominio
- ✅ `CastError`
- ✅ rutas inexistentes
- ✅ respuestas JSON uniformes

## Logging

- ✅ Winston
- ✅ niveles personalizados
- ✅ `LOG_LEVEL`
- ✅ `logs/error.log`
- ✅ `logs/combined.log`
- ✅ consola únicamente en development
- ✅ integración con middleware global
- ✅ logs excluidos del repositorio

## Swagger

- ✅ OpenAPI 3.0
- ✅ Swagger UI
- ✅ Users
- ✅ Products
- ✅ Orders
- ✅ Deliveries / Shipments
- ✅ tracking
- ✅ Uploads
- ✅ Mocks
- ✅ Logger
- ✅ Health
- ✅ paginación
- ✅ filtros
- ✅ request bodies
- ✅ respuestas exitosas
- ✅ errores
- ✅ schemas reutilizables
- ✅ `multipart/form-data`

## Uploads

- ✅ Multer
- ✅ PDF
- ✅ JPEG
- ✅ PNG
- ✅ máximo 5 MB
- ✅ documentos de usuarios
- ✅ comprobantes de pedidos
- ✅ comprobantes de envíos
- ✅ metadata en MongoDB
- ✅ eliminación de archivos huérfanos
- ✅ limpieza asíncrona

## Testing

- ✅ Mocha
- ✅ Chai
- ✅ Supertest
- ✅ base independiente `shipnow_test`
- ✅ tests de Users
- ✅ tests de Orders
- ✅ tests de Shipments
- ✅ tests de tracking
- ✅ tests de Mocks
- ✅ tests de Logger
- ✅ tests de Swagger
- ✅ tests de Health
- ✅ tests de errores
- ✅ tests de Uploads
- ✅ **40 tests passing**

## Producción

- ✅ `NODE_ENV` validado
- ✅ `LOG_LEVEL` externo
- ✅ variables críticas obligatorias
- ✅ Health Check
- ✅ mocks deshabilitados en producción
- ✅ logger test deshabilitado en producción
- ✅ Swagger disponible
- ✅ archivos sensibles excluidos

## Docker

- ✅ Dockerfile multi-stage
- ✅ Node.js 24 Alpine
- ✅ `npm ci --omit=dev`
- ✅ `.dockerignore`
- ✅ imagen construida correctamente
- ✅ ejecución individual validada
- ✅ Docker Compose
- ✅ API + MongoDB
- ✅ MongoDB healthcheck
- ✅ API espera a Mongo healthy
- ✅ volumen de MongoDB
- ✅ volumen de logs
- ✅ volumen de uploads
- ✅ `/api/health` probado dentro de Compose
- ✅ entorno `production` validado
- ✅ `docker compose down` validado

---

# 📌 Estado final

ShipNow cuenta actualmente con:

```text
Arquitectura por capas             ✅
Repository Pattern                 ✅
MongoDB / Mongoose                 ✅
Variables de entorno               ✅
Mocking                            ✅
Errores centralizados              ✅
Logging con Winston                ✅
Swagger / OpenAPI                  ✅
Health Check                       ✅
Paginación                         ✅
Filtros                            ✅
Tracking de envíos                 ✅
Uploads de usuarios                ✅
Receipts de pedidos                ✅
Receipts de envíos                 ✅
Testing funcional                  ✅
40 tests passing                   ✅
Docker multi-stage                 ✅
Docker Compose                     ✅
MongoDB healthcheck                ✅
Persistencia mediante volúmenes    ✅
Configuración de producción        ✅
```

---

# 👨‍💻 Autor

Proyecto desarrollado por **Jeremías Perrota** como parte del curso **Backend III**.