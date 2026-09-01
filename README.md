# 🚚 ShipNow API

API REST desarrollada con **Node.js, Express y MongoDB**, siguiendo una arquitectura profesional por capas.

El proyecto forma parte del curso **Backend III** y evoluciona progresivamente incorporando buenas prácticas de arquitectura, mocking, manejo centralizado de errores, logging, documentación con Swagger, testing funcional, gestión de archivos, optimización de performance y preparación para producción mediante Docker.

---

# 🚀 Tecnologías utilizadas

- Node.js
- Express
- MongoDB
- Mongoose
- Dotenv
- Nodemon
- Winston
- Winston Daily Rotate File
- Swagger / OpenAPI 3.0
- swagger-jsdoc
- swagger-ui-express
- Mocha
- Chai
- Supertest
- Multer
- Docker

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
MongoDB
```

Si ocurre un error:

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
HTTP Response
```

Cada capa posee una responsabilidad específica:

### Routes

Definen las rutas HTTP y conectan cada endpoint con su Controller.

### Controllers

Reciben las peticiones HTTP, delegan la operación al Service y derivan los errores mediante:

```js
next(error);
```

### Services

Contienen la lógica de negocio:

- validaciones;
- reglas del dominio;
- verificación de existencia de entidades;
- validación de paginación y filtros;
- generación de errores personalizados;
- coordinación entre repositories.

### Repositories

Encapsulan el acceso a MongoDB mediante Mongoose.

Se encargan de:

- consultas;
- creación;
- actualización;
- eliminación;
- paginación;
- conteo de documentos;
- persistencia de metadata.

### Models

Definen los schemas y relaciones de MongoDB.

### Middlewares

Contienen lógica transversal, como el manejo global de errores.

### Errors

Centralizan los códigos, mensajes y status HTTP utilizados por la aplicación.

### Logger

Centraliza el registro de eventos mediante Winston.

### Swagger

Documenta los endpoints mediante OpenAPI y permite probar la API desde una interfaz interactiva.

---

# 📂 Estructura del proyecto

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
│   │
│   ├── controllers/
│   │
│   ├── database/
│   │   └── mongo.js
│   │
│   ├── errors/
│   │   ├── AppError.js
│   │   └── errorDictionary.js
│   │
│   ├── middlewares/
│   │   └── error.middleware.js
│   │
│   ├── mocks/
│   │
│   ├── models/
│   │   ├── deliverer.js
│   │   ├── order.js
│   │   ├── product.js
│   │   ├── shipment.js
│   │   └── user.js
│   │
│   ├── repositories/
│   │
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
│   │   └── uploadservice.js
│   │
│   ├── utils/
│   │
│   ├── app.js
│   └── server.js
│
├── test/
│
├── uploads/
│   ├── users/
│   └── receipts/
│
├── logs/
│
├── Dockerfile
├── .dockerignore
├── .env.example
├── .env.test.example
├── .gitignore
├── package.json
└── README.md
```

Los archivos físicos cargados se almacenan durante la ejecución en:

```text
uploads/users/
uploads/receipts/
```

MongoDB almacena únicamente la metadata asociada.

Los logs persistidos se generan dentro de:

```text
logs/
```

Tanto `uploads/` como `logs/` están excluidos del repositorio.

---

# 📐 Decisiones de arquitectura

La separación entre Service y Repository permite desacoplar la lógica de negocio del acceso a datos.

Por ejemplo, un Service puede decidir cómo validar un usuario o un pedido sin conocer directamente cómo se consulta MongoDB.

El Repository, por otra parte, desconoce las reglas de negocio y se concentra en operaciones de persistencia.

Esto permite:

- mantener responsabilidades claras;
- facilitar testing;
- mejorar mantenibilidad;
- sustituir o modificar la persistencia con menor impacto;
- implementar optimizaciones como paginación sin mezclar lógica HTTP.

---

# 📦 Modelos implementados

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

El estado se determina según el stock disponible.

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

---

# 🔗 Relaciones entre entidades

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
      └── Deliverer
           │
           └── User con rol DELIVERER
```

Los repartidores forman parte de la colección de usuarios y se identifican mediante:

```text
role: DELIVERER
```

---

# ⚙ Variables de entorno

ShipNow utiliza variables de entorno para evitar configuraciones sensibles o dependientes del entorno dentro del código fuente.

Crear un archivo `.env` en la raíz:

```env
PORT=8080
MONGODB_URI=mongodb://localhost:27017/shipnow
NODE_ENV=development
LOG_LEVEL=debug
```

Las variables requeridas son:

```text
PORT
MONGODB_URI
NODE_ENV
LOG_LEVEL
```

La aplicación valida las variables críticas durante el inicio.

Si falta alguna variable obligatoria, la aplicación falla inmediatamente mostrando un mensaje claro.

Ejemplo:

```text
La variable de entorno LOG_LEVEL es obligatoria.
```

Esto implementa una estrategia **fail fast**, evitando iniciar el servidor con una configuración incompleta.

---

# 🌎 Entornos soportados

`NODE_ENV` acepta:

```text
development
test
production
```

Cualquier otro valor provoca un error de configuración durante el inicio.

---

# 📋 LOG_LEVEL

El nivel del logger se controla mediante:

```env
LOG_LEVEL=debug
```

Valores disponibles:

```text
fatal
error
warning
info
http
debug
```

Para desarrollo se recomienda:

```env
LOG_LEVEL=debug
```

Para producción:

```env
LOG_LEVEL=info
```

La configuración del nivel de logging se realiza mediante `LOG_LEVEL`.

`NODE_ENV` se utiliza para identificar el entorno de ejecución y definir comportamientos específicos de producción.

---

# 🧪 Variables de testing

El proyecto utiliza un entorno separado para testing.

Ejemplo `.env.test`:

```env
PORT=8081
MONGODB_URI=mongodb://localhost:27017/shipnow_test
NODE_ENV=test
LOG_LEVEL=debug
```

De esta manera los tests no utilizan la base de datos principal.

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

Asegurarse de que MongoDB esté disponible.

Iniciar en desarrollo:

```bash
npm run dev
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
GET    /api/shipments/:id
POST   /api/shipments
PUT    /api/shipments/:id
DELETE /api/shipments/:id
```

## Uploads

```http
POST /api/uploads/users/:id/documents
POST /api/uploads/orders/:id/receipt
```

## Health

```http
GET /api/health
```

---

# ⚡ Performance y escalabilidad

La API evita devolver colecciones grandes sin control.

Los endpoints principales de listado implementan:

- paginación;
- límite configurable;
- límite máximo de registros;
- filtros opcionales;
- consultas mediante `skip()` y `limit()`;
- conteo independiente mediante `countDocuments()`.

El límite máximo permitido por página es:

```text
100
```

El valor por defecto es:

```text
10
```

---

# 📄 Paginación

Todos los siguientes endpoints soportan:

```text
?page=1&limit=10
```

Endpoints paginados:

```http
GET /api/users
GET /api/products
GET /api/orders
GET /api/shipments
```

Ejemplo:

```http
GET /api/users?page=1&limit=2
```

Respuesta:

```json
{
  "status": "success",
  "payload": [],
  "pagination": {
    "page": 1,
    "limit": 2,
    "totalDocs": 21,
    "totalPages": 11,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

Una solicitud con:

```http
?limit=101
```

es rechazada con:

```json
{
  "status": "error",
  "error": "INVALID_DATA",
  "message": "Los datos proporcionados no son válidos."
}
```

---

# 🔎 Filtros de consultas

## Users

Permite filtrar por rol:

```http
GET /api/users?role=USER
```

Valores:

```text
ADMIN
USER
DELIVERER
```

También puede combinarse con paginación:

```http
GET /api/users?page=1&limit=5&role=USER
```

---

## Products

Filtro:

```text
status
```

Ejemplo:

```http
GET /api/products?status=AVAILABLE
```

Valores:

```text
AVAILABLE
OUT_OF_STOCK
```

---

## Orders

Filtros:

```text
status
priority
```

Ejemplo:

```http
GET /api/orders?page=1&limit=5&status=PENDING&priority=HIGH
```

---

## Shipments

Filtro:

```text
status
```

Ejemplo:

```http
GET /api/shipments?page=1&limit=5&status=IN_TRANSIT
```

---

# 📦 Control del tamaño de payload JSON

Express limita el tamaño máximo del body JSON recibido a:

```text
1 MB
```

Configuración:

```js
express.json({
    limit: "1mb",
});
```

Esto ayuda a evitar payloads excesivamente grandes.

---

# 📤 Gestión de archivos con Multer

ShipNow utiliza Multer para procesar archivos enviados mediante:

```text
multipart/form-data
```

Endpoints:

```http
POST /api/uploads/users/:id/documents
POST /api/uploads/orders/:id/receipt
```

---

# 📄 Documentos de usuario

Campos:

```text
file
documentType
```

Tipos de documento permitidos:

```text
DNI
PASSPORT
LICENSE
OTHER
```

---

# 🧾 Comprobantes de pedidos

Endpoint:

```http
POST /api/uploads/orders/:id/receipt
```

Campo:

```text
file
```

El documento se registra automáticamente como:

```text
RECEIPT
```

---

# 📎 Tipos de archivo permitidos

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

---

# 📏 Tamaño máximo de archivo

```text
5 MB
```

Multer rechaza archivos que superen este límite.

---

# 🧹 Limpieza de archivos

Si Multer guarda un archivo pero luego ocurre una validación o error de persistencia, ShipNow elimina el archivo para evitar archivos huérfanos.

La eliminación se realiza de manera asíncrona mediante:

```js
await fs.promises.unlink(filePath);
```

Esto evita utilizar operaciones síncronas de filesystem dentro del flujo de una request.

---

# 💾 Persistencia de uploads

MongoDB no almacena el contenido binario del archivo.

Almacena únicamente metadata como:

```text
originalName
filename
path
mimetype
size
documentType
uploadedAt
```

Los archivos físicos se guardan localmente en:

```text
uploads/users/
uploads/receipts/
```

Esta implementación se utiliza como almacenamiento local del proyecto.

En un despliegue productivo real se recomienda utilizar almacenamiento persistente externo, object storage o un volumen administrado.

Los archivos almacenados directamente dentro de un contenedor Docker son efímeros si el contenedor se elimina y no existe un volumen persistente asociado.

---

# 🚨 Manejo centralizado de errores

ShipNow utiliza:

```text
AppError
errorDictionary.js
error.middleware.js
```

Los Services pueden generar errores mediante:

```js
throw new AppError(
    ERROR_TYPES.PRODUCT_NOT_FOUND
);
```

Los Controllers derivan el error:

```js
catch (error) {
    next(error);
}
```

El middleware global genera una respuesta uniforme.

---

# 📤 Formato de errores

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
  "error": "PRODUCT_NOT_FOUND",
  "message": "El producto no fue encontrado."
}
```

---

# 📖 Errores implementados

Entre los errores centralizados se encuentran:

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
MOCK_DATABASE_ERROR
DATABASE_ERROR
INTERNAL_ERROR
FILE_REQUIRED
INVALID_FILE_TYPE
FILE_TOO_LARGE
INVALID_DOCUMENT_TYPE
INVALID_FILE_FIELD
FILE_UPLOAD_ERROR
```

---

# 🛡 Manejo de errores de MongoDB

Los errores `CastError` de Mongoose son transformados por el middleware global.

Por ejemplo:

```http
GET /api/products/esto-no-es-un-objectid
```

Respuesta:

```json
{
  "status": "error",
  "error": "INVALID_ID",
  "message": "El ID proporcionado no es válido."
}
```

Esto evita exponer detalles internos de Mongoose al cliente.

---

# 📊 Logging y monitoreo

ShipNow utiliza Winston con niveles personalizados:

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

---

# 📝 Formato de logs

```text
timestamp + nivel + mensaje
```

Ejemplo:

```text
2026-08-31 22:35:19 [info] Servidor ShipNow escuchando en el puerto 8080
```

---

# 💾 Persistencia de logs

Los errores importantes se escriben en:

```text
logs/error-YYYY-MM-DD.log
```

La configuración utiliza:

```text
winston-daily-rotate-file
```

Política:

```text
Rotación: diaria
Tamaño máximo: 10 MB
Retención: 14 días
Compresión: habilitada
```

Los niveles persistidos son:

```text
error
fatal
```

---

# 🎭 Sistema de Mocking

El módulo de mocking permite generar datos simulados para desarrollo y testing.

Ruta base:

```text
/api/mocks
```

Endpoints principales:

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

Los `GET` generan información sin persistir.

Los `POST` generan y almacenan los registros en MongoDB.

La cantidad se controla mediante:

```text
?quantity=N
```

Ejemplo:

```http
GET /api/mocks/users?quantity=5
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

# 🏭 Política de endpoints internos en producción

Los endpoints técnicos de:

```text
/api/mocks
/api/logger
```

solo se montan cuando:

```text
NODE_ENV !== production
```

En producción no están disponibles.

Por ejemplo:

```http
GET /api/mocks
```

o:

```http
GET /api/logger
```

responden:

```json
{
  "status": "error",
  "error": "ROUTE_NOT_FOUND",
  "message": "La ruta solicitada no existe."
}
```

Esto evita exponer herramientas internas de desarrollo en producción.

---

# 📚 Swagger / OpenAPI

ShipNow incorpora documentación mediante Swagger y OpenAPI 3.0.

Configuración:

```text
src/config/swagger.config.js
```

Swagger UI:

```text
http://localhost:8080/api/docs
```

La interfaz permite utilizar:

```text
Try it out
Execute
```

para ejecutar solicitudes reales contra la API.

---

# 📑 Swagger y paginación

Swagger documenta los query parameters utilizados por los endpoints paginados.

## Users

```text
page
limit
role
```

## Products

```text
page
limit
status
```

## Orders

```text
page
limit
status
priority
```

## Deliveries / Shipments

```text
page
limit
status
```

Ejemplo desde Swagger:

```text
page = 1
limit = 2
role = USER
```

produce una solicitud equivalente a:

```http
GET /api/users?page=1&limit=2&role=USER
```

---

# 🏷 Módulos documentados en Swagger

```text
Users
Products
Orders
Deliveries
Mocks
Logger
Uploads
```

Swagger también documenta:

- parámetros;
- request bodies;
- respuestas exitosas;
- errores;
- roles;
- estados;
- prioridades;
- schemas reutilizables;
- multipart/form-data;
- filtros;
- paginación.

---

# ❤️ Health Check

Endpoint:

```http
GET /api/health
```

Respuesta:

```json
{
  "status": "ok",
  "environment": "production",
  "uptime": 137.65,
  "timestamp": "2026-09-01T01:28:33.321Z"
}
```

El endpoint informa:

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

Esto permite utilizarlo para verificar el estado básico de la aplicación.

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

El comando utiliza el entorno definido en `.env.test`.

Actualmente:

```text
25 passing
```

Los tests cubren, entre otros:

```text
Orders
Users
Mocks
Logger
Swagger
Rutas inexistentes
Uploads
Manejo de errores
Paginación
```

---

# 🧪 Ejemplo de ejecución de tests

```text
Orders API
  ✔ debería obtener la lista paginada de pedidos
  ✔ debería obtener un pedido por ID
  ✔ debería devolver 404 si el pedido no existe
  ✔ debería crear un pedido válido
  ✔ debería actualizar correctamente el estado

Uploads API
  ✔ debe subir correctamente un documento de usuario
  ✔ debe rechazar tipos de archivo no permitidos
  ✔ debe subir correctamente un comprobante

Users API
  ✔ debería obtener la lista paginada de usuarios
  ✔ debería obtener un usuario por ID

25 passing
```

---

# 🐳 Docker

ShipNow puede ejecutarse dentro de un contenedor Docker.

El proyecto contiene:

```text
Dockerfile
.dockerignore
```

---

# 🏗 Dockerfile

El Dockerfile utiliza Node.js 24 sobre Alpine:

```dockerfile
FROM node:24-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

COPY . .

RUN mkdir -p logs uploads/users uploads/receipts

EXPOSE 8080

CMD ["npm", "start"]
```

La imagen instala únicamente las dependencias necesarias para producción mediante:

```bash
npm ci --omit=dev
```

---

# 🙈 .dockerignore

El contexto enviado durante el build excluye archivos que no deben formar parte de la imagen.

Entre ellos:

```text
node_modules
.env
.env.*
.git
logs
uploads
coverage
.nyc_output
.vscode
.idea
test
```

Los archivos de ejemplo de configuración pueden mantenerse disponibles según las excepciones definidas en `.dockerignore`.

Esto reduce el tamaño del contexto y evita copiar información sensible o innecesaria.

---

# 🔨 Construir la imagen Docker

Desde la raíz del proyecto:

```bash
docker build -t shipnow-api .
```

Verificar:

```bash
docker images
```

La imagen generada será:

```text
shipnow-api:latest
```

---

# ▶ Ejecutar ShipNow con Docker

La configuración se inyecta externamente al contenedor.

Ejemplo:

```powershell
docker run --name shipnow-api-container -p 8080:8080 -e PORT=8080 -e MONGODB_URI=mongodb://host.docker.internal:27017/shipnow -e NODE_ENV=production -e LOG_LEVEL=info shipnow-api
```

No se copia un `.env` real dentro de la imagen.

Las variables son proporcionadas al momento de ejecutar el contenedor.

---

# 🍃 MongoDB desde Docker

Cuando MongoDB se ejecuta directamente en la máquina host, dentro del contenedor no debe utilizarse:

```text
localhost
```

porque `localhost` dentro de Docker hace referencia al propio contenedor.

Con Docker Desktop se utiliza:

```text
host.docker.internal
```

Por ejemplo:

```env
MONGODB_URI=mongodb://host.docker.internal:27017/shipnow
```

Esto permite que ShipNow, ejecutándose dentro del contenedor, se conecte al MongoDB disponible en la máquina host.

---

# 🌐 Puerto Docker

Docker publica:

```text
8080:8080
```

Por lo tanto la API continúa disponible desde:

```text
http://localhost:8080
```

Swagger:

```text
http://localhost:8080/api/docs
```

Health:

```text
http://localhost:8080/api/health
```

---

# 🔍 Verificar el contenedor

```bash
docker ps
```

Ejemplo:

```text
IMAGE         PORTS                    NAMES
shipnow-api   0.0.0.0:8080->8080/tcp   shipnow-api-container
```

---

# 📜 Ver logs del contenedor

```bash
docker logs shipnow-api-container
```

Seguimiento continuo:

```bash
docker logs -f shipnow-api-container
```

---

# ⏹ Detener el contenedor

```bash
docker stop shipnow-api-container
```

---

# 🗑 Eliminar el contenedor

```bash
docker rm shipnow-api-container
```

También puede detenerse y eliminarse en un solo paso:

```bash
docker rm -f shipnow-api-container
```

---

# 🔄 Reconstruir después de modificar código

Los cambios realizados en el código fuente local no modifican automáticamente una imagen Docker ya construida.

Después de modificar ShipNow se debe reconstruir:

```bash
docker build -t shipnow-api .
```

Luego recrear el contenedor.

---

# ✅ Validación realizada dentro de Docker

La imagen fue construida y ejecutada correctamente utilizando:

```text
NODE_ENV=production
LOG_LEVEL=info
PORT=8080
```

Se verificaron correctamente:

```http
GET /api/health
GET /api/products?page=1&limit=2
GET /api/users?page=1&limit=2
GET /api/orders?page=1&limit=2
GET /api/shipments?page=1&limit=2
```

También se verificó:

```text
http://localhost:8080/api/docs
```

Swagger permaneció disponible dentro del contenedor.

En producción se comprobó además que:

```http
GET /api/mocks
GET /api/logger
```

responden con:

```text
404 ROUTE_NOT_FOUND
```

tal como establece la política de endpoints internos.

---

# 💾 Logs y uploads dentro de Docker

El Dockerfile crea:

```text
logs/
uploads/users/
uploads/receipts/
```

Estos directorios pertenecen al filesystem del contenedor.

Para un entorno productivo real deben considerarse efímeros salvo que se configure persistencia externa.

Una estrategia de producción puede utilizar:

```text
Docker volumes
almacenamiento persistente
object storage
servicios externos de archivos
```

La implementación actual se mantiene intencionalmente simple para el alcance del proyecto académico.

---

# 🔐 Seguridad de configuración

ShipNow evita incluir variables reales de entorno dentro de la imagen.

`.env` se excluye mediante:

```text
.gitignore
.dockerignore
```

La configuración productiva debe proporcionarse externamente al proceso o contenedor.

Actualmente ShipNow no implementa autenticación JWT, por lo tanto no requiere una variable `JWT_SECRET`.

Tampoco utiliza actualmente servicios externos que requieran URLs configurables adicionales.

---

# 🙈 Archivos excluidos del repositorio

`.gitignore` excluye:

```text
node_modules
.env
.env.test
logs/
uploads/
```

Esto evita versionar:

- dependencias;
- variables de entorno;
- variables del entorno de testing;
- archivos cargados;
- logs generados durante la ejecución.

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

Docker build:

```bash
docker build -t shipnow-api .
```

Docker run:

```powershell
docker run --name shipnow-api-container -p 8080:8080 -e PORT=8080 -e MONGODB_URI=mongodb://host.docker.internal:27017/shipnow -e NODE_ENV=production -e LOG_LEVEL=info shipnow-api
```

---

# ✅ Criterios implementados

## Arquitectura

✅ Arquitectura por capas  
✅ Repository Pattern  
✅ Separación entre lógica de negocio y acceso a datos  
✅ Variables de entorno centralizadas  
✅ Validación fail fast de configuración  
✅ Modelos relacionados  

## Performance

✅ Paginación de Users  
✅ Paginación de Products  
✅ Paginación de Orders  
✅ Paginación de Shipments  
✅ `limit` por defecto de 10  
✅ máximo de 100 registros por página  
✅ filtros de consultas  
✅ `skip()` y `limit()` en MongoDB  
✅ `countDocuments()` para metadata de paginación  
✅ payload JSON limitado a 1 MB  
✅ uploads limitados a 5 MB  
✅ tipos de archivo restringidos  
✅ eliminación asíncrona de archivos ante errores  

## Mocking

✅ Generación de usuarios  
✅ Generación de repartidores  
✅ Generación de pedidos  
✅ Generación de envíos  
✅ Persistencia controlada  
✅ validación de cantidad  
✅ máximo de 100 registros simulados  

## Manejo de errores

✅ AppError  
✅ diccionario centralizado  
✅ middleware global  
✅ errores de dominio  
✅ manejo de CastError  
✅ rutas inexistentes  
✅ respuestas uniformes  

## Logging

✅ Winston  
✅ seis niveles personalizados  
✅ `LOG_LEVEL` configurable  
✅ persistencia de error y fatal  
✅ rotación diaria  
✅ retención de 14 días  
✅ tamaño máximo de 10 MB  
✅ integración con middleware global  

## Swagger

✅ OpenAPI 3.0  
✅ Swagger UI  
✅ documentación de Users  
✅ documentación de Products  
✅ documentación de Orders  
✅ documentación de Deliveries  
✅ documentación de Uploads  
✅ documentación de Mocks  
✅ documentación del Logger  
✅ parámetros de paginación  
✅ filtros  
✅ request bodies  
✅ respuestas y errores  
✅ Try it out  

## Uploads

✅ Multer  
✅ PDF  
✅ JPEG  
✅ PNG  
✅ máximo 5 MB  
✅ documentos de usuarios  
✅ comprobantes de pedidos  
✅ metadata en MongoDB  
✅ eliminación de archivos huérfanos  
✅ limpieza asíncrona  

## Producción

✅ `NODE_ENV` validado  
✅ `LOG_LEVEL` externo  
✅ variables críticas obligatorias  
✅ Health Check  
✅ environment  
✅ uptime  
✅ timestamp  
✅ mocks deshabilitados en producción  
✅ logger test deshabilitado en producción  
✅ Swagger disponible en producción  

## Docker

✅ Dockerfile  
✅ Node 24 Alpine  
✅ `npm ci --omit=dev`  
✅ `.dockerignore`  
✅ `.env` excluido  
✅ puerto 8080 expuesto  
✅ variables inyectadas externamente  
✅ conexión a MongoDB desde contenedor  
✅ build exitoso  
✅ contenedor funcionando  
✅ Health probado dentro del contenedor  
✅ Swagger probado dentro del contenedor  
✅ endpoints principales probados dentro del contenedor  

## Testing

✅ Mocha  
✅ Chai  
✅ Supertest  
✅ base separada `shipnow_test`  
✅ tests de Users  
✅ tests de Orders  
✅ tests de Mocks  
✅ tests de Logger  
✅ tests de Swagger  
✅ tests de errores  
✅ tests de Uploads  
✅ **25 tests passing**

---

# 📌 Estado del proyecto

✅ Arquitectura por capas  
✅ Variables de entorno  
✅ Repository Pattern  
✅ MongoDB / Mongoose  
✅ Sistema de mocking  
✅ Health Check  
✅ Manejo centralizado de errores  
✅ Logging centralizado  
✅ Swagger / OpenAPI  
✅ Gestión de archivos con Multer  
✅ Paginación y filtros  
✅ Optimización de endpoints de listado  
✅ Configuración diferenciada por entorno  
✅ Política de endpoints internos en producción  
✅ Testing automatizado  
✅ 25 tests funcionales passing  
✅ Dockerfile  
✅ .dockerignore  
✅ Imagen Docker construida correctamente  
✅ API ejecutada correctamente dentro de Docker  
✅ MongoDB accesible desde Docker  
✅ Swagger funcionando dentro de Docker  
✅ ShipNow preparado para entrega del módulo de Performance, Escalabilidad y Docker  

---

# 👨‍💻 Autor

Proyecto desarrollado por **Jeremías Perrota** como parte del curso **Backend III**.