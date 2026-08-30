🚚 ShipNow API

API REST desarrollada con Node.js, Express y MongoDB siguiendo una arquitectura profesional por capas.

El proyecto forma parte del curso Backend III y evoluciona progresivamente incorporando buenas prácticas de arquitectura, mocking, manejo centralizado de errores, logging, documentación técnica, testing funcional automatizado y herramientas orientadas a producción.

🚀 Tecnologías utilizadas

Node.js

Express

MongoDB

Mongoose

Dotenv

Nodemon

Winston

Winston Daily Rotate File

Swagger / OpenAPI 3.0

swagger-jsdoc

swagger-ui-express

Mocha

Chai

Supertest

🏗 Arquitectura

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

Además, la aplicación incorpora capas transversales para el manejo centralizado de errores, logging y documentación.

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

Controllers: reciben las peticiones HTTP, delegan la operación al Service y derivan los errores al middleware global.

Services: contienen la lógica de negocio, validaciones y generación de errores de dominio.

Repositories: gestionan el acceso a MongoDB mediante Mongoose.

Models: definen los esquemas y relaciones de MongoDB.

Middlewares: contienen lógica transversal, incluyendo el manejo global de errores.

Errors: centralizan los tipos y clases de errores utilizados por la aplicación.

Logger: centraliza el registro de eventos, advertencias, errores y eventos críticos.

Swagger: documenta los endpoints de la API mediante OpenAPI y permite probarlos desde una interfaz interactiva.

📂 Estructura del proyecto

```text

src

│

├── config

│   ├── env.config.js

│   ├── logger.js

│   └── swagger.config.js

│

├── constants

│

├── controllers

│

├── database

│   └── mongo.js

│

├── errors

│   ├── AppError.js

│   └── errorDictionary.js

│

├── middlewares

│   └── error.middleware.js

│

├── mocks

│

├── models

│   ├── deliverer.js

│   ├── order.js

│   ├── product.js

│   ├── shipment.js

│   └── user.js

│

├── repositories

│

├── routes

│   ├── health.routes.js

│   ├── logger.routes.js

│   ├── mock.routes.js

│   ├── product.routes.js

│   ├── shipment.routes.js

│   └── user.routes.js

│

├── services

│

├── utils

│

├── app.js

└── server.js

```

Durante la ejecución también puede generarse:

```text

logs/

└── error-YYYY-MM-DD.log

```

La carpeta `logs/` se encuentra excluida del repositorio mediante `.gitignore`.

📐 Decisiones de arquitectura

Se implementó una arquitectura por capas con el objetivo de separar responsabilidades y facilitar el mantenimiento, escalabilidad y testing del proyecto.

Controllers

Gestionan exclusivamente la comunicación HTTP.

Los Controllers no contienen la lógica de negocio ni construyen respuestas de error particulares.

Cuando ocurre un error, este se deriva mediante:

```js

next(error);

```

De esta manera, la respuesta final es responsabilidad del middleware global de errores.

Services

Contienen la lógica de negocio de la aplicación.

Aquí se realizan:

Validaciones.

Reglas de negocio.

Verificación de existencia de entidades.

Generación de errores personalizados del dominio.

Registro de eventos relevantes cuando corresponde.

Por ejemplo:

```js

if (!product) {

    throw new AppError(

        ERROR_TYPES.PRODUCT_NOT_FOUND

    );

}

```

Repositories

Encapsulan el acceso a MongoDB mediante Mongoose.

Esta capa se encarga de operaciones como:

Consultar documentos.

Crear documentos.

Actualizar documentos.

Eliminar documentos.

Los Services no necesitan conocer los detalles de implementación de MongoDB.

Esta separación permite modificar la lógica de negocio sin afectar el acceso a los datos y viceversa.

Logging

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

Documentación

La documentación de la API se encuentra centralizada mediante Swagger/OpenAPI.

La configuración principal se encuentra separada de la lógica de las rutas:

```text

src/config/swagger.config.js

```

Las rutas contienen anotaciones Swagger utilizadas por `swagger-jsdoc` para construir la especificación OpenAPI.

⚙ Variables de entorno

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

▶ Instalación

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

La documentación Swagger estará disponible en:

```text

http://localhost:8080/api/docs

```

📚 Documentación de API con Swagger

ShipNow incorpora documentación técnica e interactiva utilizando Swagger y OpenAPI 3.0.

La documentación permite:

Consultar los endpoints disponibles.

Conocer métodos y rutas.

Visualizar parámetros.

Consultar request bodies.

Consultar respuestas exitosas.

Consultar posibles errores.

Visualizar schemas reutilizables.

Ejecutar solicitudes reales desde el navegador.

La configuración se encuentra en:

```text

src/config/swagger.config.js

```

De esta manera, la configuración general de Swagger permanece separada de la lógica de negocio.

🌐 Swagger UI

Con el servidor ejecutándose:

```bash

npm run dev

```

Swagger UI puede abrirse desde:

```text

http://localhost:8080/api/docs

```

La interfaz permite desplegar cada endpoint y utilizar:

```text

Try it out

```

seguido de:

```text

Execute

```

para realizar solicitudes contra la API local.

Swagger muestra:

Request URL.

Código HTTP.

Response body.

Response headers.

Parámetros.

Schemas.

Posibles respuestas.

🏷 Módulos documentados en Swagger

La documentación está organizada mediante los siguientes tags:

```text

Users

Orders

Deliveries

Mocks

Logger

```

Esto permite separar visualmente las distintas responsabilidades de ShipNow.

Users

Documenta la gestión de usuarios.

```http

GET /api/users

GET /api/users/{id}

POST /api/users

PUT /api/users/{id}

DELETE /api/users/{id}

```

Cada operación documenta sus parámetros, body cuando corresponde, respuesta exitosa y posibles errores.

Orders

Actualmente ShipNow no expone un router CRUD independiente para pedidos.

Las operaciones reales relacionadas con pedidos disponibles actualmente pertenecen al módulo de mocking:

```http

GET /api/mocks/orders

POST /api/mocks/orders

```

Estas operaciones se encuentran asociadas a los tags:

```text

Mocks

Orders

```

De esta manera Swagger expone el módulo `Orders` sin documentar rutas inexistentes.

Deliveries

El dominio de entregas de ShipNow se implementa internamente mediante el modelo `Shipment`.

Swagger utiliza el tag:

```text

Deliveries

```

para documentar las rutas reales:

```http

GET /api/shipments

GET /api/shipments/{id}

POST /api/shipments

PUT /api/shipments/{id}

DELETE /api/shipments/{id}

```

Mocks

El sistema de mocking documenta:

```http

GET  /api/mocks/users

POST /api/mocks/users

GET  /api/mocks/deliverers

POST /api/mocks/deliverers

GET  /api/mocks/orders

POST /api/mocks/orders

GET  /api/mocks/shipments

POST /api/mocks/shipments

```

Los endpoints `GET` generan información sin persistirla.

Los endpoints `POST` generan la información y la almacenan en MongoDB.

Logger

Swagger documenta:

```http

GET /api/logger/test

```

Este endpoint es una herramienta técnica utilizada para validar el funcionamiento del sistema centralizado de logging.

No representa una funcionalidad de negocio de ShipNow.

📐 Schemas reutilizables de Swagger

La especificación OpenAPI define schemas reutilizables dentro de:

```text

components.schemas

```

Los schemas principales son:

```text

User

Order

OrderItem

Delivery

ErrorResponse

SuccessResponse

```

Esto evita repetir estructuras y mantiene una documentación consistente.

User

Representa un usuario de ShipNow.

Campos:

```text

_id

name

email

role

createdAt

updatedAt

```

Roles disponibles:

```text

ADMIN

USER

DELIVERER

```

OrderItem

Representa un producto dentro de un pedido.

Campos:

```text

product

quantity

```

`quantity` debe ser como mínimo:

```text

1

```

Order

Representa un pedido.

Campos:

```text

_id

user

products

status

priority

createdAt

updatedAt

```

Estados disponibles:

```text

PENDING

CONFIRMED

PREPARING

SHIPPED

DELIVERED

CANCELLED

```

Prioridades disponibles:

```text

LOW

NORMAL

HIGH

URGENT

```

Delivery

Representa una entrega o envío.

Campos:

```text

_id

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

Estados disponibles:

```text

PENDING

IN_TRANSIT

DELIVERED

CANCELLED

```

ErrorResponse

Las respuestas de error documentadas siguen la estructura real utilizada por el middleware global:

```json

{

    "status": "error",

    "error": "ERROR_CODE",

    "message": "Descripción del error."

}

```

SuccessResponse

Representa respuestas simples de operaciones exitosas.

```json

{

    "status": "success",

    "message": "Operación realizada correctamente."

}

```

Por ejemplo, es utilizado para documentar la respuesta del endpoint técnico del logger.

📦 Modelos implementados

Usuario (User)

Campos principales:

name

email

role

Roles disponibles:

ADMIN

USER

DELIVERER

Producto (Product)

Campos principales:

name

description

price

stock

status

Estados disponibles:

AVAILABLE

OUT_OF_STOCK

El estado del producto se determina según su stock.

Pedido (Order)

Campos principales:

user

products

status

priority

Estados disponibles:

PENDING

CONFIRMED

PREPARING

SHIPPED

DELIVERED

CANCELLED

Prioridades disponibles:

LOW

NORMAL

HIGH

URGENT

Envío (Shipment)

Campos principales:

trackingNumber

order

deliverer

origin

destination

weight

status

Estados disponibles:

PENDING

IN_TRANSIT

DELIVERED

CANCELLED

🔗 Relaciones entre entidades

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

📡 Endpoints disponibles

Usuarios

```http

GET /api/users

```

```http

GET /api/users/

```

```http

POST /api/users

```

```http

PUT /api/users/

```

```http

DELETE /api/users/

```

Productos

```http

GET /api/products

```

```http

GET /api/products/

```

```http

POST /api/products

```

Envíos

```http

GET /api/shipments

```

```http

GET /api/shipments/

```

```http

POST /api/shipments

```

```http

PUT /api/shipments/

```

```http

DELETE /api/shipments/

```

Health Check

```http

GET /api/health

```

Permite verificar que la API se encuentra funcionando correctamente.

Logger

```http

GET /api/logger/test

```

Permite probar todos los niveles configurados en el sistema de logging.

También se encuentra disponible desde Swagger UI bajo el tag:

```text

Logger

```

Su propósito es exclusivamente técnico y no representa una funcionalidad de negocio.

🎭 Sistema de Mocking

El proyecto incluye un módulo de generación de datos simulados para facilitar pruebas y desarrollo.

Ruta base:

```text

/api/mocks

```

Los endpoints `GET` generan información simulada sin persistirla.

Los endpoints `POST` generan la información y la almacenan en MongoDB.

Si no se especifica `quantity`, el sistema utiliza:

```text

10

```

como valor predeterminado.

Usuarios

Generar usuarios sin guardar:

```http

GET /api/mocks/users?quantity=10

```

Generar y guardar usuarios:

```http

POST /api/mocks/users?quantity=10

```

Repartidores

Generar repartidores sin guardar:

```http

GET /api/mocks/deliverers?quantity=10

```

Generar y guardar repartidores:

```http

POST /api/mocks/deliverers?quantity=10

```

Pedidos

Generar pedidos sin guardar:

```http

GET /api/mocks/orders?quantity=10

```

Generar y guardar pedidos:

```http

POST /api/mocks/orders?quantity=10

```

Los pedidos utilizan usuarios y productos existentes para mantener relaciones válidas entre las entidades.

Envíos

Generar envíos sin guardar:

```http

GET /api/mocks/shipments?quantity=10

```

Generar y guardar envíos:

```http

POST /api/mocks/shipments?quantity=10

```

Los envíos utilizan pedidos existentes y usuarios con rol `DELIVERER`.

📚 Mocking documentado en Swagger

Todos los endpoints del módulo de mocking pueden probarse desde Swagger UI.

La cantidad se controla mediante:

```text

quantity

```

La cantidad debe ser:

```text

entero

mayor a 0

máximo 100

```

Ejemplo:

```http

GET /api/mocks/users?quantity=5

```

Si no se proporciona `quantity`, se utiliza:

```text

10

```

POST de mocks

Los endpoints `POST` del sistema de mocking no requieren request body.

Por ejemplo:

```http

POST /api/mocks/users?quantity=5

```

genera y persiste cinco usuarios.

La cantidad se recibe mediante el query parameter `quantity`.

Esto se encuentra documentado explícitamente en Swagger para que la documentación refleje el comportamiento real de los Controllers.

🚨 Manejo centralizado de errores

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

🧩 AppError

La clase personalizada `AppError` permite representar errores controlados del dominio.

Cada error posee:

`code`

`message`

`statusCode`

Ejemplo:

```js

throw new AppError(

    ERROR_TYPES.USER_NOT_FOUND

);

```

Esto permite separar la detección del error de la construcción de la respuesta HTTP.

📖 Diccionario de errores

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

📤 Estructura de las respuestas de error

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

Para un error inesperado:

```json

{

    "status": "error",

    "error": "INTERNAL_ERROR",

    "message": "Ocurrió un error interno en el servidor."

}

```

📖 Errores documentados en Swagger

Swagger reutiliza el schema:

```text

ErrorResponse

```

para representar las respuestas de error.

La documentación contempla los errores reales implementados por ShipNow, incluyendo:

```text

INVALID_ID

INVALID_DATA

INVALID_QUANTITY

QUANTITY_LIMIT_EXCEEDED

INVALID_STATUS

USER_NOT_FOUND

ORDER_NOT_FOUND

SHIPMENT_NOT_FOUND

NO_USERS_AVAILABLE

NO_PRODUCTS_AVAILABLE

NO_ORDERS_AVAILABLE

NO_DELIVERERS_AVAILABLE

MOCK_DATABASE_ERROR

DATABASE_ERROR

INTERNAL_ERROR

```

Dependiendo del endpoint pueden encontrarse respuestas:

```text

400 → petición o datos inválidos

404 → recurso no encontrado

500 → error interno del servidor

```

La API actualmente no implementa autenticación sobre estos endpoints.

Por lo tanto, Swagger no documenta respuestas `401` o `403` que la aplicación no devuelve actualmente.

🧪 Cómo probar el manejo de errores

Usuario inexistente

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

ID inválido

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

Producto inexistente

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

Producto con datos inválidos

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

Envío inexistente

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

Ruta inexistente

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

🧪 Validaciones del sistema de Mocking

La cantidad recibida por los endpoints de mocks debe ser un número entero mayor a `0`.

También se estableció un máximo de `100` registros por solicitud.

Cantidad igual a cero

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

Cantidad negativa

```http

GET /api/mocks/users?quantity=-5

```

Devuelve:

```text

INVALID_QUANTITY

```

Además, el intento queda registrado por el sistema de logging como `warning`.

Cantidad no numérica

```http

GET /api/mocks/users?quantity=abc

```

Devuelve:

```text

INVALID_QUANTITY

```

Límite máximo superado

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

Las mismas validaciones se aplican a:

usuarios

repartidores

pedidos

envíos

Estas validaciones también están documentadas en Swagger mediante los límites del parámetro `quantity` y las respuestas de error correspondientes.

🛡 Manejo de errores de MongoDB

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

📊 Logging y monitoreo

ShipNow implementa un sistema de logging centralizado utilizando Winston.

El objetivo es registrar de forma uniforme los eventos relevantes de la aplicación y evitar el uso disperso de:

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

📋 Niveles de logging

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

fatal   → 0

error   → 1

warning → 2

info    → 3

http    → 4

debug   → 5

```

debug

Información detallada utilizada principalmente durante el desarrollo.

http

Eventos relacionados con operaciones o tráfico HTTP cuando corresponde.

info

Eventos normales y relevantes de funcionamiento.

Ejemplo:

```text

[info] Conexión a MongoDB establecida correctamente.

[info] Servidor ShipNow escuchando en el puerto 8080

[info] Se generaron 3 usuarios mock sin persistir.

```

warning

Situaciones controladas que requieren atención pero no representan una falla interna.

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

error

Errores internos, errores de persistencia o situaciones inesperadas del servidor.

fatal

Errores críticos que pueden impedir el inicio o funcionamiento de la aplicación.

📝 Formato de los logs

Los logs utilizan:

```text

timestamp + nivel + mensaje

```

Ejemplo:

```text

2026-08-29 13:08:26 [info] Conexión a MongoDB establecida correctamente.

2026-08-29 13:08:26 [info] Servidor ShipNow escuchando en el puerto 8080

```

🌎 Logging según el entorno

El comportamiento depende de:

```env

NODE_ENV

```

Development

Con:

```env

NODE_ENV=development

```

se visualizan:

```text

debug

http

info

warning

error

fatal

```

Production

Con:

```env

NODE_ENV=production

```

la consola registra desde `info`:

```text

info

warning

error

fatal

```

No se muestran:

```text

debug

http

```

💾 Persistencia de logs

Los eventos más importantes se almacenan en:

```text

logs/

```

Se utiliza:

```text

winston-daily-rotate-file

```

El nombre sigue:

```text

logs/error-YYYY-MM-DD.log

```

Por ejemplo:

```text

logs/error-2026-08-29.log

```

🚨 Logs persistidos

El transporte de archivos utiliza el nivel:

```text

error

```

Debido a las prioridades configuradas, almacena:

```text

error

fatal

```

No almacena:

```text

debug

http

info

warning

```

🔄 Rotación automática de logs

La configuración establece:

```text

Rotación: diaria

Tamaño máximo por archivo: 10 MB

Retención: 14 días

Compresión de archivos antiguos: habilitada

```

Esto evita que un único archivo crezca indefinidamente.

🔗 Integración del logger con el middleware de errores

El logger se encuentra integrado con:

```text

src/middlewares/error.middleware.js

```

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

Los errores con status `500` se registran como:

```text

error

```

Los errores inesperados también utilizan:

```text

error

```

Los fallos críticos durante el inicio pueden registrarse como:

```text

fatal

```

📡 Eventos registrados por el logger

Entre los eventos relevantes registrados por ShipNow se encuentran:

Inicio correcto del servidor.

Conexión exitosa con MongoDB.

Errores de conexión con MongoDB.

Fallos críticos durante el inicio.

Generación de usuarios mock.

Generación de repartidores mock.

Generación de pedidos mock.

Generación de envíos mock.

Persistencia de información mock.

Errores durante la persistencia de mocks.

Cantidades inválidas.

IDs inválidos.

Recursos inexistentes.

Rutas inexistentes.

Errores controlados del dominio.

Errores internos inesperados.

🧪 Endpoint de prueba del logger

Para verificar el funcionamiento:

```http

GET /api/logger/test

```

Este endpoint genera:

```text

debug

http

info

warning

error

fatal

```

Respuesta:

```json

{

    "status": "success",

    "message": "Logs de prueba generados correctamente."

}

```

El endpoint también se encuentra documentado y puede ejecutarse desde:

```text

http://localhost:8080/api/docs

```

bajo el tag:

```text

Logger

```

Se trata de una herramienta de validación y no de una funcionalidad de negocio.

🧪 Prueba del logger en producción

En PowerShell:

```powershell

$env="production"

npm run dev

```

Luego:

```http

GET /api/logger/test

```

La consola muestra:

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

🔎 Logging de rutas inexistentes

Las rutas que no coinciden con ningún endpoint son derivadas al middleware global mediante `AppError`.

Se utiliza:

```text

ROUTE_NOT_FOUND

```

Ejemplo:

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

🎭 Logging del sistema de Mocking

Ejemplo:

```http

GET /api/mocks/users?quantity=3

```

genera:

```text

[info] Se generaron 3 usuarios mock sin persistir.

```

Una solicitud inválida:

```http

GET /api/mocks/users?quantity=-5

```

genera un `warning`.

Los errores durante la persistencia de mocks se registran con:

```text

error

```

🚀 Logging del inicio de la aplicación

La conexión exitosa con MongoDB genera:

```text

[info] Conexión a MongoDB establecida correctamente.

```

Cuando el servidor comienza a escuchar:

```text

[info] Servidor ShipNow escuchando en el puerto 8080

```

Si el inicio falla de manera crítica se utiliza:

```text

fatal

```

y se finaliza el proceso.

🧹 Eliminación de console.log dispersos

Se verificó el código fuente para evitar llamadas dispersas a:

```text

console.log

console.error

console.warn

console.debug

```

Los eventos relevantes utilizan el logger centralizado.

🧪 Probar ShipNow desde Swagger

Iniciar el servidor:

```bash

npm run dev

```

Abrir:

```text

http://localhost:8080/api/docs

```

Seleccionar un endpoint.

Luego:

```text

Try it out

```

y:

```text

Execute

```

Por ejemplo:

```http

GET /api/logger/test

```

debe responder:

```json

{

    "status": "success",

    "message": "Logs de prueba generados correctamente."

}

```

También pueden probarse usuarios, envíos y mocks directamente desde la interfaz.

🔍 Correspondencia entre Swagger y la API real

La documentación fue construida sobre las rutas y comportamientos existentes de ShipNow.

Swagger documenta:

Métodos HTTP reales.

Rutas reales.

Parámetros de ruta reales.

Query parameters reales.

Bodies aceptados por los endpoints.

Códigos HTTP.

Respuestas exitosas.

Respuestas de error.

Roles válidos.

Estados válidos.

Validaciones del sistema de mocking.

No se documentan endpoints inexistentes.

El módulo de pedidos dispone actualmente de rutas reales:

GET /api/orders
GET /api/orders/{id}
POST /api/orders
PUT /api/orders/{id}/status

Estas rutas se encuentran documentadas en Swagger y también forman parte del testing funcional automatizado.

El módulo de mocking conserva adicionalmente:

GET /api/mocks/orders
POST /api/mocks/orders

Los endpoints POST de mocks no reciben body, ya que la cantidad se indica mediante:

?quantity=N

Esto permite mantener la especificación OpenAPI sincronizada con el comportamiento real de la aplicación.

🙈 Archivos excluidos del repositorio

El archivo `.gitignore` contiene:

```gitignore

node_modules

.env

logs/

```

Esto evita subir:

Dependencias instaladas.

Variables de entorno.

Archivos de logs.

Los archivos:

```text

logs/error-YYYY-MM-DD.log

```

no forman parte del repositorio Git.

✅ Criterios cumplidos

Arquitectura

Arquitectura por capas.

Repository Pattern.

Variables de entorno centralizadas.

Modelos relacionados.

Separación de responsabilidades.

Mocking

Sistema de mocking.

Generación de usuarios.

Generación de repartidores.

Generación de pedidos.

Generación de envíos.

Persistencia controlada de datos simulados.

Validación de cantidades.

Límite máximo de mocks.

Manejo de errores de persistencia.

Errores

Manejo centralizado de errores.

Clase personalizada `AppError`.

Diccionario centralizado de errores.

Middleware global.

Errores personalizados del dominio.

Manejo de IDs inválidos.

Respuestas HTTP uniformes.

Manejo centralizado de rutas inexistentes.

Logging

Logging centralizado con Winston.

Seis niveles personalizados.

`debug`.

`http`.

`info`.

`warning`.

`error`.

`fatal`.

Logging diferenciado según entorno.

`debug` habilitado en desarrollo.

Nivel mínimo `info` en producción.

Integración con middleware de errores.

Errores controlados como `warning`.

Errores internos como `error`.

Errores críticos como `fatal`.

Logging de MongoDB.

Logging de inicio del servidor.

Logging de mocks.

Persistencia de errores.

Persistencia de `error` y `fatal`.

Rotación diaria.

Retención de logs.

Compresión de logs antiguos.

Endpoint de prueba del logger.

Exclusión de logs mediante `.gitignore`.

Eliminación del uso disperso de `console.log`.

Logging de rutas inexistentes.

Swagger / OpenAPI

Documentación profesional con Swagger/OpenAPI 3.0.

Swagger UI interactiva.

Swagger UI accesible desde `/api/docs`.

Configuración separada de la lógica de rutas.

Información general de ShipNow documentada.

Versión de la API documentada.

Servidor local documentado.

Propósito de la API documentado.

Documentación organizada mediante tags.

Tag `Users`.

Tag `Orders`.

Tag `Deliveries`.

Tag `Mocks`.

Tag `Logger`.

Schema reutilizable `User`.

Schema reutilizable `Order`.

Schema reutilizable `OrderItem`.

Schema reutilizable `Delivery`.

Schema reutilizable `ErrorResponse`.

Schema reutilizable `SuccessResponse`.

Parámetros de ruta documentados.

Query parameters documentados.

Request bodies documentados.

Respuestas exitosas documentadas.

Respuestas de error documentadas.

Roles válidos documentados.

Estados válidos documentados.

Endpoints de mocks documentados.

`quantity` documentado.

Valor por defecto de mocks documentado.

Límite máximo de mocks documentado.

Persistencia de mocks documentada.

Endpoint técnico del logger documentado.

Logger identificado como herramienta de validación.

Pruebas interactivas mediante `Try it out`.

Documentación sincronizada con las rutas reales.

📌 Estado del proyecto

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

✅ Documentación con Swagger/OpenAPI

✅ Swagger UI interactiva

✅ Schemas reutilizables

✅ Documentación de Users

✅ Documentación de Orders

✅ Documentación de Deliveries

✅ Documentación de Mocks

✅ Documentación de Logger

✅ Testing automatizado con Mocha, Chai y Supertest

✅ Entorno de testing separado con shipnow_test

✅ 19 tests funcionales passing

🔜 Docker

👨‍💻 Autor

Proyecto desarrollado por Jeremías Perrota como parte del curso Backend III.