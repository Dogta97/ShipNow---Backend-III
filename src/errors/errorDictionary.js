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

    ROUTE_NOT_FOUND: {
        code: "ROUTE_NOT_FOUND",
        message: "La ruta solicitada no existe.",
        statusCode: 404,
    },

    INVALID_ID: {
        code: "INVALID_ID",
        message: "El ID proporcionado no es válido.",
        statusCode: 400,
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

    INVALID_PRODUCT_DATA: {
        code: "INVALID_PRODUCT_DATA",
        message: "Los datos del producto no son válidos.",
        statusCode: 400,
    },

    TRACKING_NUMBER_ALREADY_EXISTS: {
        code: "TRACKING_NUMBER_ALREADY_EXISTS",
        message: "El número de seguimiento ya existe.",
        statusCode: 400,
    },

    NO_USERS_AVAILABLE: {
        code: "NO_USERS_AVAILABLE",
        message: "No hay usuarios cargados en la base de datos.",
        statusCode: 400,
    },

    NO_PRODUCTS_AVAILABLE: {
        code: "NO_PRODUCTS_AVAILABLE",
        message: "No hay productos cargados en la base de datos.",
        statusCode: 400,
    },

    NO_ORDERS_AVAILABLE: {
        code: "NO_ORDERS_AVAILABLE",
        message: "No hay pedidos cargados en la base de datos.",
        statusCode: 400,
    },

    NO_DELIVERERS_AVAILABLE: {
        code: "NO_DELIVERERS_AVAILABLE",
        message: "No hay repartidores cargados en la base de datos.",
        statusCode: 400,
    },

    // =========================
    // FILES / MULTER
    // =========================

    FILE_REQUIRED: {
        code: "FILE_REQUIRED",
        message: "El archivo es obligatorio.",
        statusCode: 400,
    },

    INVALID_FILE_TYPE: {
        code: "INVALID_FILE_TYPE",
        message: "El tipo de archivo no está permitido.",
        statusCode: 400,
    },

    FILE_TOO_LARGE: {
        code: "FILE_TOO_LARGE",
        message: "El archivo supera el tamaño máximo permitido de 5 MB.",
        statusCode: 400,
    },

    INVALID_DOCUMENT_TYPE: {
        code: "INVALID_DOCUMENT_TYPE",
        message: "El tipo de documento no es válido.",
        statusCode: 400,
    },

    INVALID_FILE_FIELD: {
        code: "INVALID_FILE_FIELD",
        message: "El campo utilizado para enviar el archivo no es válido.",
        statusCode: 400,
    },

    FILE_UPLOAD_ERROR: {
        code: "FILE_UPLOAD_ERROR",
        message: "Ocurrió un error al procesar la carga del archivo.",
        statusCode: 500,
    },

    MOCK_DATABASE_ERROR: {
        code: "MOCK_DATABASE_ERROR",
        message: "Ocurrió un error al guardar los datos de prueba.",
        statusCode: 500,
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