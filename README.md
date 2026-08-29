# 🚚 ShipNow API

API REST desarrollada con Node.js, Express y MongoDB siguiendo una arquitectura profesional por capas.

El proyecto forma parte del curso **Backend III** y evoluciona progresivamente incorporando buenas prácticas de arquitectura, mocking, manejo centralizado de errores y herramientas orientadas a producción.

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

El proyecto implementa una arquitectura por capas:

```text
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

Además, la aplicación incorpora una capa transversal para el manejo centralizado de errores:

```text
Request
  │
  ▼
Route
  │
  ▼
Controller
  │
  ▼
Service
  │
  ▼
Repository
  │
  ▼
MongoDB

Si ocurre un error:
  │
  ▼
next(error)
  │
  ▼
Global Error Middleware
  │
  ▼
HTTP Response
```

Cada capa tiene una responsabilidad específica:

- **Controllers:** reciben las peticiones HTTP, delegan la operación al Service y derivan los errores al middleware global.
- **Services:** contienen la lógica de negocio, validaciones y generación de errores de dominio.
- **Repositories:** gestionan el acceso a MongoDB mediante Mongoose.
- **Models:** definen los esquemas y relaciones de MongoDB.
- **Middlewares:** contienen lógica transversal, incluyendo el manejo global de errores.
- **Errors:** centralizan los tipos y clases de errores utilizados por la aplicación.

---

# 📂 Estructura del proyecto

```text
src
│
├── config
├── constants
├── controllers
├── database
├── errors
│   ├── AppError.js
│   └── errorDictionary.js
├── middlewares
│   └── error.middleware.js
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

Se implementó una arquitectura por capas con el objetivo de separar responsabilidades y facilitar el mantenimiento, escalabilidad y testing del proyecto.

## Controllers

Gestionan exclusivamente la comunicación HTTP.

Los controllers no contienen la lógica de negocio ni construyen respuestas de error particulares.

Cuando ocurre un error, este se deriva mediante:

```js
next(error);
```

De esta manera, la respuesta final es responsabilidad del middleware global de errores.

## Services

Contienen la lógica de negocio de la aplicación.

Aquí se realizan:

- Validaciones.
- Reglas de negocio.
- Verificación de existencia de entidades.
- Generación de errores personalizados del dominio.

Por ejemplo:

```js
if (!product) {
    throw new AppError(
        ERROR_TYPES.PRODUCT_NOT_FOUND
    );
}
```

## Repositories

Encapsulan el acceso a MongoDB mediante Mongoose.

Esta capa se encarga de operaciones como:

- Consultar documentos.
- Crear documentos.
- Actualizar documentos.
- Eliminar documentos.

Los Services no necesitan conocer los detalles de implementación de MongoDB.

Esta separación permite modificar la lógica de negocio sin afectar el acceso a los datos y viceversa.

---

# ⚙ Variables de entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
PORT=8080
MONGODB_URI=mongodb://localhost:27017/shipnow
NODE_ENV=development
```

Las variables de entorno son centralizadas y validadas desde la configuración de la aplicación.

El archivo `.env` no debe subirse al repositorio.

---

# ▶ Instalación

Clonar el repositorio:

```bash
git clone <URL_DEL_REPOSITORIO>
```

Ingresar a la carpeta:

```bash
cd ShipNow
```

Instalar dependencias:

```bash
npm install
```

Asegurarse de que MongoDB esté disponible y luego iniciar el servidor:

```bash
npm run dev
```

Por defecto, la API estará disponible en:

```text
http://localhost:8080
```

---

# 📦 Modelos implementados

## Usuario (User)

Campos principales:

- name
- email
- role

Roles disponibles:

- ADMIN
- USER
- DELIVERER

---

## Producto (Product)

Campos principales:

- name
- description
- price
- stock
- status

Estados disponibles:

- AVAILABLE
- OUT_OF_STOCK

El estado del producto se determina según su stock.

---

## Pedido (Order)

Campos principales:

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

Campos principales:

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
       └── Deliverer
            │
            └── User con rol DELIVERER
```

Los repartidores forman parte de la colección de usuarios y se identifican mediante el rol:

```text
DELIVERER
```

---

# 📡 Endpoints disponibles

## Usuarios

Obtener usuarios:

```http
GET /api/users
```

Obtener usuario por ID:

```http
GET /api/users/:id
```

Crear usuario:

```http
POST /api/users
```

Actualizar usuario:

```http
PUT /api/users/:id
```

Eliminar usuario:

```http
DELETE /api/users/:id
```

---

## Productos

Obtener productos:

```http
GET /api/products
```

Obtener producto por ID:

```http
GET /api/products/:id
```

Crear producto:

```http
POST /api/products
```

---

## Envíos

Obtener envíos:

```http
GET /api/shipments
```

Obtener envío por ID:

```http
GET /api/shipments/:id
```

Crear envío:

```http
POST /api/shipments
```

Actualizar envío:

```http
PUT /api/shipments/:id
```

Eliminar envío:

```http
DELETE /api/shipments/:id
```

---

## Health Check

```http
GET /api/health
```

Permite verificar que la API se encuentra funcionando correctamente.

---

# 🎭 Sistema de Mocking

El proyecto incluye un módulo de generación de datos simulados para facilitar pruebas y desarrollo.

Ruta base:

```text
/api/mocks
```

Los endpoints `GET` generan información simulada sin persistirla.

Los endpoints `POST` generan la información y la almacenan en MongoDB.

---

## Usuarios

Generar usuarios sin guardar:

```http
GET /api/mocks/users?quantity=10
```

Generar y guardar usuarios:

```http
POST /api/mocks/users?quantity=10
```

---

## Repartidores

Generar repartidores sin guardar:

```http
GET /api/mocks/deliverers?quantity=10
```

Generar y guardar repartidores:

```http
POST /api/mocks/deliverers?quantity=10
```

---

## Pedidos

Generar pedidos sin guardar:

```http
GET /api/mocks/orders?quantity=10
```

Generar y guardar pedidos:

```http
POST /api/mocks/orders?quantity=10
```

Los pedidos utilizan usuarios y productos existentes para mantener relaciones válidas entre las entidades.

---

## Envíos

Generar envíos sin guardar:

```http
GET /api/mocks/shipments?quantity=10
```

Generar y guardar envíos:

```http
POST /api/mocks/shipments?quantity=10
```

Los envíos utilizan pedidos existentes y usuarios con rol `DELIVERER`.

---

# 🚨 Manejo centralizado de errores

La aplicación implementa un sistema profesional y centralizado de manejo de errores.

Los errores no son respondidos directamente desde cada Controller.

En su lugar, los Services detectan las situaciones inválidas y generan errores personalizados mediante:

```js
throw new AppError(ERROR_TYPES.PRODUCT_NOT_FOUND);
```

Los Controllers capturan el error y lo derivan:

```js
catch (error) {
    next(error);
}
```

Finalmente, `error.middleware.js` transforma el error en una respuesta HTTP uniforme.

---

# 🧩 AppError

La clase personalizada `AppError` permite representar errores controlados del dominio.

Cada error posee:

- `code`
- `message`
- `statusCode`

Ejemplo conceptual:

```js
throw new AppError(
    ERROR_TYPES.USER_NOT_FOUND
);
```

Esto permite separar la detección del error de la construcción de la respuesta HTTP.

---

# 📖 Diccionario de errores

Los errores conocidos de la aplicación se encuentran centralizados en:

```text
src/errors/errorDictionary.js
```

Algunos de los errores implementados son:

```text
USER_NOT_FOUND
PRODUCT_NOT_FOUND
ORDER_NOT_FOUND
SHIPMENT_NOT_FOUND
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
```

Esto evita tener códigos, mensajes y status HTTP repetidos en diferentes partes del proyecto.

---

# 📤 Estructura de las respuestas de error

Todos los errores controlados utilizan una estructura uniforme:

```json
{
    "status": "error",
    "error": "ERROR_CODE",
    "message": "Descripción del error."
}
```

Por ejemplo, al buscar un producto inexistente:

```json
{
    "status": "error",
    "error": "PRODUCT_NOT_FOUND",
    "message": "El producto no fue encontrado."
}
```

Al utilizar un ID de MongoDB inválido:

```json
{
    "status": "error",
    "error": "INVALID_ID",
    "message": "El ID proporcionado no es válido."
}
```

Y para un error inesperado:

```json
{
    "status": "error",
    "error": "INTERNAL_ERROR",
    "message": "Ocurrió un error interno en el servidor."
}
```

---

# 🧪 Cómo probar el manejo de errores

Los siguientes casos permiten verificar el sistema centralizado utilizando Postman.

## Usuario inexistente

Utilizar un ObjectId válido que no corresponda a un usuario existente:

```http
GET /api/users/507f1f77bcf86cd799439011
```

Respuesta esperada:

```json
{
    "status": "error",
    "error": "USER_NOT_FOUND",
    "message": "El usuario no fue encontrado."
}
```

---

## ID inválido

```http
GET /api/products/esto-no-es-un-objectid
```

Respuesta esperada:

```json
{
    "status": "error",
    "error": "INVALID_ID",
    "message": "El ID proporcionado no es válido."
}
```

---

## Producto inexistente

```http
GET /api/products/507f1f77bcf86cd799439011
```

Respuesta esperada:

```json
{
    "status": "error",
    "error": "PRODUCT_NOT_FOUND",
    "message": "El producto no fue encontrado."
}
```

---

## Producto con datos inválidos

```http
POST /api/products
```

Body:

```json
{
    "name": "Producto prueba",
    "description": "Producto inválido",
    "price": -100,
    "stock": 10
}
```

Respuesta esperada:

```json
{
    "status": "error",
    "error": "INVALID_PRODUCT_DATA",
    "message": "Los datos del producto no son válidos."
}
```

---

## Envío inexistente

```http
GET /api/shipments/507f1f77bcf86cd799439011
```

Respuesta esperada:

```json
{
    "status": "error",
    "error": "SHIPMENT_NOT_FOUND",
    "message": "El envío no fue encontrado."
}
```

---

# 🧪 Validaciones del sistema de Mocking

La cantidad recibida por los endpoints de mocks debe ser un número entero mayor a `0`.

También se estableció un máximo de `100` registros por solicitud.

## Cantidad igual a cero

```http
GET /api/mocks/users?quantity=0
```

Respuesta:

```json
{
    "status": "error",
    "error": "INVALID_QUANTITY",
    "message": "La cantidad debe ser un número entero mayor a 0."
}
```

---

## Cantidad negativa

```http
GET /api/mocks/users?quantity=-5
```

Devuelve:

```text
INVALID_QUANTITY
```

---

## Cantidad no numérica

```http
GET /api/mocks/users?quantity=abc
```

Devuelve:

```text
INVALID_QUANTITY
```

---

## Límite máximo superado

```http
GET /api/mocks/users?quantity=101
```

Respuesta:

```json
{
    "status": "error",
    "error": "QUANTITY_LIMIT_EXCEEDED",
    "message": "La cantidad máxima permitida es 100."
}
```

Las mismas validaciones se aplican a los mocks de:

- usuarios
- repartidores
- pedidos
- envíos

---

# 🛡 Manejo de errores de MongoDB

El middleware global también contempla errores generados por Mongoose.

Por ejemplo, un ID con formato inválido genera un `CastError`.

Este error se transforma automáticamente en:

```json
{
    "status": "error",
    "error": "INVALID_ID",
    "message": "El ID proporcionado no es válido."
}
```

Esto evita exponer errores internos de Mongoose directamente al cliente.

Los errores inesperados son transformados en:

```json
{
    "status": "error",
    "error": "INTERNAL_ERROR",
    "message": "Ocurrió un error interno en el servidor."
}
```

---

# ✅ Criterios cumplidos

- Arquitectura por capas.
- Repository Pattern.
- Variables de entorno centralizadas.
- Modelos relacionados.
- Sistema de mocking.
- Generación de usuarios.
- Generación de repartidores.
- Generación de pedidos.
- Generación de envíos.
- Persistencia controlada de datos simulados.
- Manejo centralizado de errores.
- Clase personalizada `AppError`.
- Diccionario centralizado de errores.
- Middleware global de errores.
- Errores personalizados del dominio.
- Manejo de IDs inválidos.
- Validación de cantidades de mocking.
- Manejo de errores de persistencia de mocks.
- Respuestas HTTP de error uniformes.
- Separación entre detección del error y respuesta HTTP.

---

# 📌 Estado del proyecto

✅ Arquitectura por capas

✅ Variables de entorno

✅ Repository Pattern

✅ Modelos y relaciones

✅ Sistema de mocking

✅ Persistencia de datos de prueba

✅ Health Check

✅ Manejo centralizado de errores

✅ Errores personalizados de dominio

✅ Validaciones de mocking

🔜 Logging

🔜 Swagger

🔜 Testing automatizado

🔜 Docker

---

# 👨‍💻 Autor

Proyecto desarrollado por **Jeremías Perrota** como parte del curso **Backend III**.