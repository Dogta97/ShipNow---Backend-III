# **🚚 ShipNow API**

API REST desarrollada con Node.js, Express y MongoDB siguiendo una arquitectura profesional por capas.

El proyecto forma parte del curso **Backend III** y evoluciona progresivamente incorporando buenas prácticas de arquitectura, mocking, manejo centralizado de errores, logging y herramientas orientadas a producción.

---

# **🚀 Tecnologías utilizadas**

- Node.js
- Express
- MongoDB
- Mongoose
- Dotenv
- Nodemon
- Winston
- Winston Daily Rotate File

---

# **🏗 Arquitectura**

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

Además, la aplicación incorpora capas transversales para el manejo centralizado de errores y logging.

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
  ├── Logger
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
- **Logger:** centraliza el registro de eventos, advertencias, errores y eventos críticos.

---

# **📂 Estructura del proyecto**

```text
src
│
├── config
│   ├── env.config.js
│   └── logger.js
│
├── constants
├── controllers
├── database
│   └── mongo.js
│
├── errors
│   ├── AppError.js
│   └── errorDictionary.js
│
├── middlewares
│   └── error.middleware.js
│
├── mocks
├── models
├── repositories
├── routes
│   └── logger.routes.js
│
├── services
├── utils
├── app.js
└── server.js
```

Durante la ejecución también puede generarse:

```text
logs/
└── error-YYYY-MM-DD.log
```

La carpeta `logs/` se encuentra excluida del repositorio mediante `.gitignore`.

---

# **📐 Decisiones de arquitectura**

Se implementó una arquitectura por capas con el objetivo de separar responsabilidades y facilitar el mantenimiento, escalabilidad y testing del proyecto.

## **Controllers**

Gestionan exclusivamente la comunicación HTTP.

Los Controllers no contienen la lógica de negocio ni construyen respuestas de error particulares.

Cuando ocurre un error, este se deriva mediante:

```js
next(error);
```

De esta manera, la respuesta final es responsabilidad del middleware global de errores.

## **Services**

Contienen la lógica de negocio de la aplicación.

Aquí se realizan:

- Validaciones.
- Reglas de negocio.
- Verificación de existencia de entidades.
- Generación de errores personalizados del dominio.
- Registro de eventos relevantes cuando corresponde.

Por ejemplo:

```js
if (!product) {
    throw new AppError(
        ERROR_TYPES.PRODUCT_NOT_FOUND
    );
}
```

## **Repositories**

Encapsulan el acceso a MongoDB mediante Mongoose.

Esta capa se encarga de operaciones como:

- Consultar documentos.
- Crear documentos.
- Actualizar documentos.
- Eliminar documentos.

Los Services no necesitan conocer los detalles de implementación de MongoDB.

Esta separación permite modificar la lógica de negocio sin afectar el acceso a los datos y viceversa.

## **Logging**

El logging se encuentra centralizado mediante Winston.

Esto evita distribuir llamadas a:

```js
console.log();
console.error();
console.warn();
console.debug();
```

por diferentes módulos de la aplicación.

Los eventos son registrados utilizando el nivel correspondiente según su importancia.

---

# **⚙ Variables de entorno**

Crear un archivo `.env` en la raíz del proyecto:

```env
PORT=8080
MONGODB_URI=mongodb://localhost:27017/shipnow
NODE_ENV=development
```

Las variables de entorno son centralizadas y validadas desde la configuración de la aplicación.

La configuración expone internamente valores como:

```js
config.port
config.mongoUri
config.nodeEnv
```

El archivo `.env` no debe subirse al repositorio.

La variable `NODE_ENV` también permite modificar el nivel de detalle del sistema de logging.

---

# **▶ Instalación**

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

# **📦 Modelos implementados**

## **Usuario (User)**

Campos principales:

- name
- email
- role

Roles disponibles:

- ADMIN
- USER
- DELIVERER

---

## **Producto (Product)**

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

## **Pedido (Order)**

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

## **Envío (Shipment)**

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

# **🔗 Relaciones entre entidades**

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

# **📡 Endpoints disponibles**

## **Usuarios**

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

## **Productos**

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

## **Envíos**

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

## **Health Check**

```http
GET /api/health
```

Permite verificar que la API se encuentra funcionando correctamente.

---

## **Logger**

```http
GET /api/logger/test
```

Permite probar todos los niveles configurados en el sistema de logging.

---

# **🎭 Sistema de Mocking**

El proyecto incluye un módulo de generación de datos simulados para facilitar pruebas y desarrollo.

Ruta base:

```text
/api/mocks
```

Los endpoints `GET` generan información simulada sin persistirla.

Los endpoints `POST` generan la información y la almacenan en MongoDB.

---

## **Usuarios**

Generar usuarios sin guardar:

```http
GET /api/mocks/users?quantity=10
```

Generar y guardar usuarios:

```http
POST /api/mocks/users?quantity=10
```

---

## **Repartidores**

Generar repartidores sin guardar:

```http
GET /api/mocks/deliverers?quantity=10
```

Generar y guardar repartidores:

```http
POST /api/mocks/deliverers?quantity=10
```

---

## **Pedidos**

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

## **Envíos**

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

# **🚨 Manejo centralizado de errores**

La aplicación implementa un sistema profesional y centralizado de manejo de errores.

Los errores no son respondidos directamente desde cada Controller.

En su lugar, los Services detectan las situaciones inválidas y generan errores personalizados mediante:

```js
throw new AppError(
    ERROR_TYPES.PRODUCT_NOT_FOUND
);
```

Los Controllers capturan el error y lo derivan:

```js
catch (error) {
    next(error);
}
```

Finalmente, `error.middleware.js` transforma el error en una respuesta HTTP uniforme y registra el evento mediante el logger según su gravedad.

---

# **🧩 AppError**

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

# **📖 Diccionario de errores**

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
```

Esto evita tener códigos, mensajes y status HTTP repetidos en diferentes partes del proyecto.

---

# **📤 Estructura de las respuestas de error**

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

# **🧪 Cómo probar el manejo de errores**

Los siguientes casos permiten verificar el sistema centralizado utilizando Postman.

## **Usuario inexistente**

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

## **ID inválido**

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

Este error también genera un log de nivel `warning`.

---

## **Producto inexistente**

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

## **Producto con datos inválidos**

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

## **Envío inexistente**

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

## **Ruta inexistente**

```http
GET /api/esto-no-existe
```

Respuesta esperada:

```json
{
    "status": "error",
    "error": "ROUTE_NOT_FOUND",
    "message": "La ruta solicitada no existe."
}
```

La ruta inexistente es procesada por el mismo sistema centralizado de errores y registrada como un evento de nivel `warning`.

---

# **🧪 Validaciones del sistema de Mocking**

La cantidad recibida por los endpoints de mocks debe ser un número entero mayor a `0`.

También se estableció un máximo de `100` registros por solicitud.

## **Cantidad igual a cero**

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

## **Cantidad negativa**

```http
GET /api/mocks/users?quantity=-5
```

Devuelve:

```text
INVALID_QUANTITY
```

Además, el intento queda registrado por el sistema de logging como `warning`.

Ejemplo:

```text
[warning] INVALID_QUANTITY en GET /api/mocks/users?quantity=-5: La cantidad debe ser un número entero mayor a 0.
```

---

## **Cantidad no numérica**

```http
GET /api/mocks/users?quantity=abc
```

Devuelve:

```text
INVALID_QUANTITY
```

---

## **Límite máximo superado**

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

# **🛡 Manejo de errores de MongoDB**

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

El evento también queda registrado mediante Winston como un `warning`.

Los errores inesperados son transformados en:

```json
{
    "status": "error",
    "error": "INTERNAL_ERROR",
    "message": "Ocurrió un error interno en el servidor."
}
```

Los errores inesperados del servidor se registran con nivel `error`.

---

# **📊 Logging y monitoreo**

ShipNow implementa un sistema de logging centralizado utilizando **Winston**.

El objetivo es registrar de forma uniforme los eventos relevantes de la aplicación y evitar el uso disperso de métodos como:

```js
console.log();
console.error();
console.warn();
console.debug();
```

La configuración del logger se encuentra centralizada en:

```text
src/config/logger.js
```

---

## **📋 Niveles de logging**

Se definieron seis niveles personalizados:

```text
fatal
error
warning
info
http
debug
```

Su prioridad es:

```text
fatal   → 0
error   → 1
warning → 2
info    → 3
http    → 4
debug   → 5
```

Cada nivel representa un tipo diferente de evento.

### `debug`

Información detallada utilizada principalmente durante el desarrollo.

### `http`

Eventos relacionados con operaciones o tráfico HTTP cuando corresponde.

### `info`

Eventos normales y relevantes de funcionamiento.

Por ejemplo:

```text
[info] Conexión a MongoDB establecida correctamente.
[info] Servidor ShipNow escuchando en el puerto 8080
[info] Se generaron 3 usuarios mock sin persistir.
```

### `warning`

Situaciones controladas que requieren atención pero no representan una falla interna del servidor.

Por ejemplo:

```text
[warning] ID inválido en GET /api/products/esto-no-es-un-objectid: esto-no-es-un-objectid
```

También se utiliza para errores de negocio o peticiones inválidas como:

```text
INVALID_QUANTITY
PRODUCT_NOT_FOUND
SHIPMENT_NOT_FOUND
ROUTE_NOT_FOUND
```

### `error`

Errores internos, errores de persistencia o situaciones inesperadas del servidor.

### `fatal`

Errores críticos que pueden impedir el inicio o funcionamiento de la aplicación.

---

# **📝 Formato de los logs**

Los logs utilizan una estructura uniforme:

```text
timestamp + nivel + mensaje
```

Ejemplo:

```text
2026-08-29 13:08:26 [info] Conexión a MongoDB establecida correctamente.
2026-08-29 13:08:26 [info] Servidor ShipNow escuchando en el puerto 8080
```

Otro ejemplo:

```text
2026-08-29 13:08:34 [warning] Prueba de logger nivel WARNING
2026-08-29 13:08:34 [error] Prueba de logger nivel ERROR
2026-08-29 13:08:34 [fatal] Prueba de logger nivel FATAL
```

Este formato facilita la lectura, búsqueda y análisis de los eventos registrados.

---

# **🌎 Logging según el entorno**

El comportamiento del logger depende de:

```env
NODE_ENV
```

## **Development**

Con:

```env
NODE_ENV=development
```

la consola permite visualizar todos los niveles configurados:

```text
debug
http
info
warning
error
fatal
```

Esto proporciona información detallada durante el desarrollo.

---

## **Production**

Con:

```env
NODE_ENV=production
```

la consola registra desde el nivel `info`:

```text
info
warning
error
fatal
```

Por lo tanto, los niveles:

```text
debug
http
```

no se muestran en producción.

Esto permite reducir la cantidad de información innecesaria registrada en un entorno productivo.

---

# **💾 Persistencia de logs**

Además de mostrar información por consola, ShipNow persiste los eventos más importantes en archivos.

Los archivos son almacenados dentro de:

```text
logs/
```

Para la persistencia y rotación se utiliza:

```text
winston-daily-rotate-file
```

El nombre del archivo sigue el formato:

```text
logs/error-YYYY-MM-DD.log
```

Ejemplo:

```text
logs/error-2026-08-29.log
```

---

# **🚨 Logs persistidos**

El transporte destinado a archivos utiliza el nivel:

```text
error
```

Debido al orden de prioridades configurado, esto permite almacenar:

```text
error
fatal
```

Por lo tanto, el archivo de errores no almacena:

```text
debug
http
info
warning
```

Ejemplo de contenido:

```text
2026-08-29 13:08:34 [error] Prueba de logger nivel ERROR
2026-08-29 13:08:34 [fatal] Prueba de logger nivel FATAL
```

---

# **🔄 Rotación automática de logs**

Los archivos de errores utilizan rotación automática mediante `winston-daily-rotate-file`.

La configuración utilizada establece:

```text
Rotación: diaria
Tamaño máximo por archivo: 10 MB
Retención: 14 días
Compresión de archivos antiguos: habilitada
```

Esto evita que un único archivo de logs crezca indefinidamente.

---

# **🔗 Integración del logger con el middleware de errores**

El sistema de logging se encuentra integrado con:

```text
src/middlewares/error.middleware.js
```

El middleware determina el nivel apropiado según el tipo y gravedad del error.

Los errores esperados o controlados asociados a peticiones inválidas se registran generalmente como:

```text
warning
```

Por ejemplo:

```text
INVALID_ID
INVALID_QUANTITY
PRODUCT_NOT_FOUND
SHIPMENT_NOT_FOUND
ROUTE_NOT_FOUND
```

Un ejemplo real de log es:

```text
[warning] INVALID_QUANTITY en GET /api/mocks/users?quantity=-5: La cantidad debe ser un número entero mayor a 0.
```

Los errores de servidor con status `500` son registrados como:

```text
error
```

Los errores inesperados que no pertenecen al sistema de errores controlados también se registran como:

```text
error
```

Los fallos críticos durante el inicio de la aplicación pueden registrarse como:

```text
fatal
```

De esta manera es posible diferenciar:

```text
warning → error controlado o situación que requiere atención
error   → error interno del servidor
fatal   → fallo crítico de la aplicación
```

---

# **📡 Eventos registrados por el logger**

Entre los eventos relevantes registrados por ShipNow se encuentran:

- Inicio correcto del servidor.
- Conexión exitosa con MongoDB.
- Errores de conexión con MongoDB.
- Fallos críticos durante el inicio de la aplicación.
- Generación de usuarios mock.
- Generación de repartidores mock.
- Generación de pedidos mock.
- Generación de envíos mock.
- Persistencia de información mock.
- Errores durante la persistencia de mocks.
- Cantidades inválidas solicitadas a los endpoints de mocking.
- IDs inválidos.
- Recursos inexistentes.
- Rutas inexistentes.
- Errores controlados del dominio.
- Errores internos inesperados.

---

# **🧪 Endpoint de prueba del logger**

Para verificar el funcionamiento del sistema se implementó:

```http
GET /api/logger/test
```

Este endpoint genera manualmente un evento para cada nivel:

```text
debug
http
info
warning
error
fatal
```

En entorno de desarrollo se espera visualizar:

```text
[debug] Prueba de logger nivel DEBUG
[http] Prueba de logger nivel HTTP
[info] Prueba de logger nivel INFO
[warning] Prueba de logger nivel WARNING
[error] Prueba de logger nivel ERROR
[fatal] Prueba de logger nivel FATAL
```

La respuesta HTTP esperada es:

```json
{
    "status": "success",
    "message": "Logs de prueba generados correctamente."
}
```

---

# **🧪 Prueba del logger en producción**

Para verificar el comportamiento según el entorno puede ejecutarse temporalmente la aplicación con:

```powershell
$env:NODE_ENV="production"
npm run dev
```

Luego:

```http
GET /api/logger/test
```

En este entorno la consola muestra:

```text
info
warning
error
fatal
```

y no muestra:

```text
debug
http
```

Esto permite comprobar que el nivel mínimo del transporte de consola cambia correctamente según `NODE_ENV`.

---

# **🔎 Logging de rutas inexistentes**

Las rutas que no coinciden con ningún endpoint de la API son derivadas al middleware global mediante un `AppError`.

Se utiliza el error:

```text
ROUTE_NOT_FOUND
```

Por ejemplo:

```http
GET /api/esto-no-existe
```

Respuesta:

```json
{
    "status": "error",
    "error": "ROUTE_NOT_FOUND",
    "message": "La ruta solicitada no existe."
}
```

Además, se genera un log de nivel:

```text
warning
```

Esto permite que los errores `404` mantengan el mismo sistema de respuestas y logging utilizado por el resto de la API.

---

# **🎭 Logging del sistema de Mocking**

El módulo de mocking también se encuentra integrado con el logger.

Por ejemplo:

```http
GET /api/mocks/users?quantity=3
```

genera un evento similar a:

```text
[info] Se generaron 3 usuarios mock sin persistir.
```

Mientras que una solicitud inválida:

```http
GET /api/mocks/users?quantity=-5
```

genera:

```text
[warning] INVALID_QUANTITY en GET /api/mocks/users?quantity=-5: La cantidad debe ser un número entero mayor a 0.
```

Los errores producidos durante la persistencia de datos mock se registran con nivel:

```text
error
```

---

# **🚀 Logging del inicio de la aplicación**

La conexión exitosa con MongoDB genera:

```text
[info] Conexión a MongoDB establecida correctamente.
```

Cuando el servidor comienza a escuchar peticiones se genera:

```text
[info] Servidor ShipNow escuchando en el puerto 8080
```

Si ocurre un error durante la conexión con MongoDB, este es registrado y propagado.

Si el proceso de inicio de ShipNow falla, el servidor registra el evento como:

```text
fatal
```

y finaliza el proceso.

Esto permite diferenciar errores operativos normales de errores críticos que impiden iniciar correctamente la aplicación.

---

# **🧹 Eliminación de console.log dispersos**

Como parte de la implementación del sistema centralizado de logging se verificó el código fuente para evitar llamadas dispersas a:

```text
console.log
console.error
console.warn
console.debug
```

Los eventos relevantes de la aplicación deben utilizar el logger centralizado.

Esto mantiene una estrategia uniforme de logging y permite controlar los niveles según el entorno.

---

# **🙈 Archivos excluidos del repositorio**

El archivo `.gitignore` contiene:

```gitignore
node_modules/
.env
logs/
```

Esto evita subir al repositorio:

- Dependencias instaladas.
- Variables de entorno.
- Archivos de logs generados durante la ejecución.

En particular, los archivos:

```text
logs/error-YYYY-MM-DD.log
```

no deben formar parte del repositorio Git.

---

# **✅ Criterios cumplidos**

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
- Manejo centralizado de rutas inexistentes.
- Logging centralizado con Winston.
- Seis niveles personalizados de logging.
- Niveles `debug`, `http`, `info`, `warning`, `error` y `fatal`.
- Logging diferenciado según el entorno.
- Nivel `debug` habilitado durante desarrollo.
- Nivel mínimo `info` en producción.
- Integración del logger con el middleware global de errores.
- Registro de errores controlados como `warning`.
- Registro de errores internos como `error`.
- Registro de errores críticos como `fatal`.
- Logging de conexión con MongoDB.
- Logging de inicio del servidor.
- Logging del sistema de mocking.
- Persistencia de errores en archivos.
- Persistencia exclusiva de niveles `error` y `fatal`.
- Rotación diaria de archivos de logs.
- Retención de archivos de logs.
- Compresión de logs antiguos.
- Endpoint de prueba del logger.
- Exclusión de logs mediante `.gitignore`.
- Eliminación del uso disperso de `console.log`.
- Logging de rutas inexistentes.

---

# **📌 Estado del proyecto**

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

✅ Logging centralizado con Winston

✅ Niveles personalizados de logging

✅ Logging diferenciado por entorno

✅ Integración entre logging y manejo de errores

✅ Persistencia de errores en archivos

✅ Rotación automática de logs

✅ Logging de mocks

✅ Logging de rutas inexistentes

🔜 Swagger

🔜 Testing automatizado

🔜 Docker

---

# **👨‍💻 Autor**

Proyecto desarrollado por **Jeremías Perrota** como parte del curso **Backend III**.