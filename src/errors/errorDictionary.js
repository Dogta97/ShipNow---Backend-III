export const ERROR_TYPES = Object.freeze({
    USER_NOT_FOUND: {
        code: "USER_NOT_FOUND",
        message: "El usuario no fue encontrado.",
        statusCode: 404,
    },

    PRODUCT_NOT_FOUND: {
        code: "PRODUCT_NOT_FOUND",
        message: "El producto no fue encontrado.",
        statusCode: 404,
    },

    ORDER_NOT_FOUND: {
        code: "ORDER_NOT_FOUND",
        message: "El pedido no fue encontrado.",
        statusCode: 404,
    },

    SHIPMENT_NOT_FOUND: {
        code: "SHIPMENT_NOT_FOUND",
        message: "El envío no fue encontrado.",
        statusCode: 404,
    },

    INVALID_QUANTITY: {
        code: "INVALID_QUANTITY",
        message: "La cantidad debe ser un número entero mayor a 0.",
        statusCode: 400,
    },

    QUANTITY_LIMIT_EXCEEDED: {
        code: "QUANTITY_LIMIT_EXCEEDED",
        message: "La cantidad máxima permitida es 100.",
        statusCode: 400,
    },

    INVALID_STATUS: {
        code: "INVALID_STATUS",
        message: "El estado proporcionado no es válido.",
        statusCode: 400,
    },

    INVALID_DATA: {
        code: "INVALID_DATA",
        message: "Los datos proporcionados no son válidos.",
        statusCode: 400,
    },

    DATABASE_ERROR: {
        code: "DATABASE_ERROR",
        message: "Ocurrió un error al acceder a la base de datos.",
        statusCode: 500,
    },

    INTERNAL_ERROR: {
        code: "INTERNAL_ERROR",
        message: "Ocurrió un error interno en el servidor.",
        statusCode: 500,
    },
});