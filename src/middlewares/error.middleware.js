import multer from "multer";

import AppError from "../errors/AppError.js";
import { ERROR_TYPES } from "../errors/errorDictionary.js";
import logger from "../config/logger.js";

const errorMiddleware = (
    error,
    req,
    res,
    next
) => {

    let finalError = error;

    // ========================================
    // ERROR DE MULTER: ARCHIVO DEMASIADO GRANDE
    // ========================================

    if (
        error instanceof multer.MulterError &&
        error.code === "LIMIT_FILE_SIZE"
    ) {
        finalError = new AppError(
            ERROR_TYPES.FILE_TOO_LARGE
        );
    }

    // ========================================
    // ERROR DE MULTER: CAMPO INCORRECTO
    // ========================================

    else if (
        error instanceof multer.MulterError &&
        error.code === "LIMIT_UNEXPECTED_FILE"
    ) {
        finalError = new AppError(
            ERROR_TYPES.INVALID_FILE_FIELD
        );
    }

    // ========================================
    // TIPO DE ARCHIVO NO PERMITIDO
    // ========================================

    else if (
        error.message === "INVALID_FILE_TYPE"
    ) {
        finalError = new AppError(
            ERROR_TYPES.INVALID_FILE_TYPE
        );
    }

    // ========================================
    // OTROS ERRORES DE MULTER
    // ========================================

    else if (
        error instanceof multer.MulterError
    ) {
        finalError = new AppError(
            ERROR_TYPES.FILE_UPLOAD_ERROR
        );
    }

    // ========================================
    // ID INVÁLIDO DE MONGODB
    // ========================================

    else if (
        error.name === "CastError"
    ) {
        finalError = new AppError(
            ERROR_TYPES.INVALID_ID
        );
    }

    // ========================================
    // ERROR CONTROLADO DE SHIPNOW
    // ========================================

    if (finalError instanceof AppError) {

        const logMessage =
            `${finalError.code} en ${req.method} ${req.originalUrl}: ${finalError.message}`;

        if (finalError.statusCode >= 500) {
            logger.error(logMessage);
        } else {
            logger.warning(logMessage);
        }

        return res
            .status(finalError.statusCode)
            .json({
                status: "error",
                error: finalError.code,
                message: finalError.message,
            });
    }

    // ========================================
    // ERROR NO CONTROLADO
    // ========================================

    logger.error(
        `INTERNAL_ERROR en ${req.method} ${req.originalUrl}: ${error.message}`
    );

    return res
        .status(
            ERROR_TYPES.INTERNAL_ERROR.statusCode
        )
        .json({
            status: "error",
            error:
                ERROR_TYPES.INTERNAL_ERROR.code,
            message:
                ERROR_TYPES.INTERNAL_ERROR.message,
        });
};

export default errorMiddleware;