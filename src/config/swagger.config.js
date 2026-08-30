import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions = {

    definition: {

        openapi: "3.0.0",

        info: {

            title: "ShipNow API",

            version: "1.0.0",

            description:
                "API REST para la gestión de usuarios, pedidos, entregas, datos de prueba y herramientas internas de ShipNow.",

        },

        servers: [

            {

                url: "http://localhost:8080",

                description: "Servidor local de desarrollo",

            },

        ],

        tags: [

            {

                name: "Users",

                description:
                    "Gestión de usuarios de ShipNow.",

            },

            {

                name: "Orders",

                description:
                    "Gestión y operaciones relacionadas con pedidos.",

            },

            {

                name: "Deliveries",

                description:
                    "Gestión de entregas y envíos de ShipNow.",

            },

            {

                name: "Mocks",

                description:
                    "Generación y persistencia de datos simulados para pruebas.",

            },

            {

                name: "Logger",

                description:
                    "Herramientas internas para validar el sistema de logging. No representa una funcionalidad de negocio.",

            },

        ],

        components: {

            schemas: {

                User: {

                    type: "object",

                    properties: {

                        _id: {

                            type: "string",

                            description:
                                "Identificador único del usuario generado por MongoDB.",

                            example:
                                "66d0a132dc78230f1b421001",

                        },

                        name: {

                            type: "string",

                            description:
                                "Nombre del usuario.",

                            example:
                                "Juan Pérez",

                        },

                        email: {

                            type: "string",

                            format: "email",

                            description:
                                "Correo electrónico único del usuario.",

                            example:
                                "juan@example.com",

                        },

                        role: {

                            type: "string",

                            enum: [
                                "ADMIN",
                                "USER",
                                "DELIVERER",
                            ],

                            description:
                                "Rol asignado al usuario.",

                            example:
                                "USER",

                        },

                        createdAt: {

                            type: "string",

                            format: "date-time",

                            description:
                                "Fecha de creación del usuario.",

                        },

                        updatedAt: {

                            type: "string",

                            format: "date-time",

                            description:
                                "Fecha de última actualización del usuario.",

                        },

                    },

                },


                OrderItem: {

                    type: "object",

                    required: [
                        "product",
                        "quantity",
                    ],

                    properties: {

                        product: {

                            type: "string",

                            description:
                                "ID del producto incluido en el pedido.",

                            example:
                                "66d0a132dc78230f1b421010",

                        },

                        quantity: {

                            type: "integer",

                            minimum: 1,

                            description:
                                "Cantidad solicitada del producto.",

                            example: 2,

                        },

                    },

                },


                Order: {

                    type: "object",

                    properties: {

                        _id: {

                            type: "string",

                            description:
                                "Identificador único del pedido.",

                            example:
                                "66d0a132dc78230f1b421020",

                        },

                        user: {

                            type: "string",

                            description:
                                "ID del usuario propietario del pedido.",

                            example:
                                "66d0a132dc78230f1b421001",

                        },

                        products: {

                            type: "array",

                            description:
                                "Productos incluidos en el pedido.",

                            items: {

                                $ref:
                                    "#/components/schemas/OrderItem",

                            },

                        },

                        status: {

                            type: "string",

                            enum: [
                                "PENDING",
                                "CONFIRMED",
                                "PREPARING",
                                "SHIPPED",
                                "DELIVERED",
                                "CANCELLED",
                            ],

                            description:
                                "Estado actual del pedido.",

                            example:
                                "PENDING",

                        },

                        priority: {

                            type: "string",

                            enum: [
                                "LOW",
                                "NORMAL",
                                "HIGH",
                                "URGENT",
                            ],

                            description:
                                "Prioridad asignada al pedido.",

                            example:
                                "NORMAL",

                        },

                        createdAt: {

                            type: "string",

                            format: "date-time",

                        },

                        updatedAt: {

                            type: "string",

                            format: "date-time",

                        },

                    },

                },


                Delivery: {

                    type: "object",

                    properties: {

                        _id: {

                            type: "string",

                            description:
                                "Identificador único de la entrega.",

                            example:
                                "66d0a132dc78230f1b421030",

                        },

                        trackingNumber: {

                            type: "string",

                            description:
                                "Número de seguimiento único del envío.",

                            example:
                                "SHIP-2026-0001",

                        },

                        order: {

                            type: "string",

                            description:
                                "ID del pedido asociado a la entrega.",

                            example:
                                "66d0a132dc78230f1b421020",

                        },

                        deliverer: {

                            type: "string",

                            nullable: true,

                            description:
                                "ID del usuario repartidor asignado al envío.",

                            example:
                                "66d0a132dc78230f1b421040",

                        },

                        origin: {

                            type: "string",

                            description:
                                "Lugar de origen del envío.",

                            example:
                                "Buenos Aires",

                        },

                        destination: {

                            type: "string",

                            description:
                                "Lugar de destino del envío.",

                            example:
                                "La Plata",

                        },

                        weight: {

                            type: "number",

                            minimum: 0,

                            description:
                                "Peso del envío.",

                            example: 4.5,

                        },

                        status: {

                            type: "string",

                            enum: [
                                "PENDING",
                                "IN_TRANSIT",
                                "DELIVERED",
                                "CANCELLED",
                            ],

                            description:
                                "Estado actual de la entrega.",

                            example:
                                "PENDING",

                        },

                        createdAt: {

                            type: "string",

                            format: "date-time",

                        },

                        updatedAt: {

                            type: "string",

                            format: "date-time",

                        },

                    },

                },


                ErrorResponse: {

                    type: "object",

                    properties: {

                        status: {

                            type: "string",

                            example:
                                "error",

                        },

                        error: {

                            type: "string",

                            description:
                                "Código interno del error.",

                            example:
                                "USER_NOT_FOUND",

                        },

                        message: {

                            type: "string",

                            description:
                                "Descripción del error.",

                            example:
                                "El usuario solicitado no existe.",

                        },

                    },

                },


                SuccessResponse: {

                    type: "object",

                    properties: {

                        status: {

                            type: "string",

                            example:
                                "success",

                        },

                        message: {

                            type: "string",

                            description:
                                "Mensaje descriptivo de la operación.",

                            example:
                                "Operación realizada correctamente.",

                        },

                    },

                },

            },

        },

    },


    apis: [

        "./src/routes/*.js",

        "./src/docs/*.yaml",

        "./src/docs/*.yml",

    ],

};


const swaggerSpec =
    swaggerJSDoc(
        swaggerOptions
    );


export default swaggerSpec;