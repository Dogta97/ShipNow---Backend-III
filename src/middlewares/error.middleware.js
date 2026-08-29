import { ERROR_TYPES } from "../errors/errorDictionary.js";
import logger from "../config/logger.js";

const errorMiddleware = (error, req, res, next) => {

    // Error de Mongoose cuando el ID no tiene un formato válido
    if (error.name === "CastError") {

        const invalidIdError =
            ERROR_TYPES.INVALID_ID;

        logger.warning(
            `ID inválido en ${req.method} ${req.originalUrl}: ${error.value}`
        );

        return res
            .status(invalidIdError.statusCode)
            .json({
                status: "error",
                error: invalidIdError.code,
                message: invalidIdError.message,
            });

    }

    // Errores controlados
    if (error.statusCode) {

        const logMessage =
            `${error.code} en ${req.method} ${req.originalUrl}: ${error.message}`;

        if (error.statusCode >= 500) {

            logger.error(logMessage);

        } else {

            logger.warning(logMessage);

        }

        return res
            .status(error.statusCode)
            .json({
                status: "error",
                error: error.code,
                message: error.message,
            });

    }

    // Errores inesperados
    logger.error(
        `Error inesperado en ${req.method} ${req.originalUrl}: ${error.message}`
    );

    return res
        .status(500)
        .json({
            status: "error",
            error: ERROR_TYPES.INTERNAL_ERROR.code,
            message: ERROR_TYPES.INTERNAL_ERROR.message,
        });

};

export default errorMiddleware;