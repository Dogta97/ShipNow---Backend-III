import { ERROR_TYPES } from "../errors/errorDictionary.js";

const errorMiddleware = (error, req, res, next) => {

    // Error de Mongoose cuando el ID no tiene un formato válido
    if (error.name === "CastError") {

        const invalidIdError = ERROR_TYPES.INVALID_ID;

        return res.status(invalidIdError.statusCode).json({
            status: "error",
            error: invalidIdError.code,
            message: invalidIdError.message,
        });

    }

    const statusCode = error.statusCode || 500;

    const code = error.code || "INTERNAL_ERROR";

    const message =
        error.statusCode
            ? error.message
            : ERROR_TYPES.INTERNAL_ERROR.message;

    return res.status(statusCode).json({
        status: "error",
        error: code,
        message: message,
    });

};

export default errorMiddleware;