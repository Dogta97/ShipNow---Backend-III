import fs from "fs";
import path from "path";

import userRepository from "../repositories/user.repository.js";
import orderRepository from "../repositories/order.repository.js";

import AppError from "../errors/AppError.js";
import { ERROR_TYPES } from "../errors/errorDictionary.js";

import logger from "../config/logger.js";

const VALID_DOCUMENT_TYPES = [
    "DNI",
    "PASSPORT",
    "LICENSE",
    "OTHER",
];

class UploadService {

    async uploadUserDocument(
        userId,
        file,
        documentType
    ) {

        if (!file) {
            throw new AppError(
                ERROR_TYPES.FILE_REQUIRED
            );
        }

        try {

            if (
                !documentType ||
                !VALID_DOCUMENT_TYPES.includes(
                    documentType
                )
            ) {
                throw new AppError(
                    ERROR_TYPES.INVALID_DOCUMENT_TYPE
                );
            }

            const user =
                await userRepository.getById(
                    userId
                );

            if (!user) {
                throw new AppError(
                    ERROR_TYPES.USER_NOT_FOUND
                );
            }

            const metadata =
                this.buildMetadata(
                    file,
                    documentType
                );

            const updatedUser =
                await userRepository.addDocument(
                    userId,
                    metadata
                );

            if (!updatedUser) {
                throw new AppError(
                    ERROR_TYPES.FILE_UPLOAD_ERROR
                );
            }

            logger.info(
                `Documento ${documentType} cargado correctamente para el usuario ${userId}.`
            );

            return updatedUser;

        } catch (error) {

            this.deleteFileIfExists(
                file.path
            );

            if (
                error instanceof AppError ||
                error.name === "CastError"
            ) {
                throw error;
            }

            logger.error(
                `Error al guardar documento del usuario ${userId}: ${error.message}`
            );

            throw new AppError(
                ERROR_TYPES.FILE_UPLOAD_ERROR
            );
        }
    }

    async uploadOrderReceipt(
        orderId,
        file
    ) {

        if (!file) {
            throw new AppError(
                ERROR_TYPES.FILE_REQUIRED
            );
        }

        try {

            const order =
                await orderRepository.getById(
                    orderId
                );

            if (!order) {
                throw new AppError(
                    ERROR_TYPES.ORDER_NOT_FOUND
                );
            }

            const metadata =
                this.buildMetadata(
                    file,
                    "RECEIPT"
                );

            const updatedOrder =
                await orderRepository.addReceipt(
                    orderId,
                    metadata
                );

            if (!updatedOrder) {
                throw new AppError(
                    ERROR_TYPES.FILE_UPLOAD_ERROR
                );
            }

            logger.info(
                `Comprobante asociado correctamente al pedido ${orderId}.`
            );

            return updatedOrder;

        } catch (error) {

            this.deleteFileIfExists(
                file.path
            );

            if (
                error instanceof AppError ||
                error.name === "CastError"
            ) {
                throw error;
            }

            logger.error(
                `Error al guardar comprobante del pedido ${orderId}: ${error.message}`
            );

            throw new AppError(
                ERROR_TYPES.FILE_UPLOAD_ERROR
            );
        }
    }

    buildMetadata(
        file,
        documentType
    ) {

        return {
            originalName:
                file.originalname,

            filename:
                file.filename,

            path: path
                .relative(
                    process.cwd(),
                    file.path
                )
                .replace(/\\/g, "/"),

            mimetype:
                file.mimetype,

            size:
                file.size,

            documentType,

            uploadedAt:
                new Date(),
        };
    }

    deleteFileIfExists(
        filePath
    ) {

        try {

            if (
                filePath &&
                fs.existsSync(filePath)
            ) {
                fs.unlinkSync(filePath);
            }

        } catch (error) {

            logger.error(
                `No se pudo eliminar el archivo ${filePath}: ${error.message}`
            );
        }
    }
}

export {
    VALID_DOCUMENT_TYPES,
};

export default new UploadService();