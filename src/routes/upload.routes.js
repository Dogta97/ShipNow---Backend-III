import {
    Router,
} from "express";

import uploadController from "../controllers/uploadcontroller.js";

import {
    uploadUserDocument,
    uploadReceipt,
} from "../config/multer.config.js";

const router = Router();

/**
 * @swagger
 * /api/uploads/users/{id}/documents:
 *   post:
 *     summary: Cargar un documento para un usuario
 *     description: >
 *       Permite cargar un archivo PDF, JPG, JPEG o PNG y asociarlo
 *       a un usuario existente. El archivo se almacena físicamente
 *       en el servidor y MongoDB conserva únicamente su metadata.
 *       El tamaño máximo permitido es de 5 MB.
 *     tags:
 *       - Uploads
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de MongoDB del usuario.
 *         example: 66d0a132dc78230f1b421001
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - file
 *               - documentType
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Archivo PDF, JPG, JPEG o PNG. Máximo 5 MB.
 *               documentType:
 *                 type: string
 *                 enum:
 *                   - DNI
 *                   - PASSPORT
 *                   - LICENSE
 *                   - OTHER
 *                 description: Tipo de documento asociado al usuario.
 *                 example: DNI
 *     responses:
 *       200:
 *         description: Documento cargado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Documento cargado correctamente.
 *                 payload:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Error de validación del archivo o documento.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               fileRequired:
 *                 summary: Archivo no enviado
 *                 value:
 *                   status: error
 *                   error: FILE_REQUIRED
 *                   message: El archivo es obligatorio.
 *               invalidFileType:
 *                 summary: Tipo de archivo no permitido
 *                 value:
 *                   status: error
 *                   error: INVALID_FILE_TYPE
 *                   message: El tipo de archivo no está permitido.
 *               fileTooLarge:
 *                 summary: Archivo demasiado grande
 *                 value:
 *                   status: error
 *                   error: FILE_TOO_LARGE
 *                   message: El archivo supera el tamaño máximo permitido de 5 MB.
 *               invalidDocumentType:
 *                 summary: Tipo de documento inválido
 *                 value:
 *                   status: error
 *                   error: INVALID_DOCUMENT_TYPE
 *                   message: El tipo de documento no es válido.
 *               invalidFileField:
 *                 summary: Campo de archivo incorrecto
 *                 value:
 *                   status: error
 *                   error: INVALID_FILE_FIELD
 *                   message: El campo utilizado para enviar el archivo no es válido.
 *       404:
 *         description: El usuario no existe.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               status: error
 *               error: USER_NOT_FOUND
 *               message: El usuario no fue encontrado.
 *       500:
 *         description: Error interno durante la carga del archivo.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post(
    "/users/:id/documents",
    uploadUserDocument.single(
        "file"
    ),
    uploadController.uploadUserDocument
);

/**
 * @swagger
 * /api/uploads/orders/{id}/receipt:
 *   post:
 *     summary: Cargar un comprobante para un pedido
 *     description: >
 *       Permite cargar un comprobante PDF, JPG, JPEG o PNG y asociarlo
 *       a un pedido existente. El archivo se almacena en uploads/receipts
 *       y MongoDB conserva únicamente su metadata. El tipo de documento
 *       se registra automáticamente como RECEIPT. El tamaño máximo es de 5 MB.
 *     tags:
 *       - Uploads
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de MongoDB del pedido.
 *         example: 66d0a132dc78230f1b421020
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - file
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Comprobante PDF, JPG, JPEG o PNG. Máximo 5 MB.
 *     responses:
 *       200:
 *         description: Comprobante cargado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Comprobante cargado correctamente.
 *                 payload:
 *                   $ref: '#/components/schemas/Order'
 *       400:
 *         description: Error de validación del archivo.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: El pedido no existe.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               status: error
 *               error: ORDER_NOT_FOUND
 *               message: El pedido no fue encontrado.
 *       500:
 *         description: Error interno durante la carga del comprobante.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post(
    "/orders/:id/receipt",
    uploadReceipt.single(
        "file"
    ),
    uploadController.uploadOrderReceipt
);

/**
 * @swagger
 * /api/uploads/shipments/{id}/receipt:
 *   post:
 *     summary: Cargar un comprobante para un envío
 *     description: >
 *       Permite cargar un comprobante PDF, JPG, JPEG o PNG y asociarlo
 *       a un envío existente. El archivo se almacena físicamente en
 *       uploads/receipts y MongoDB conserva únicamente su metadata.
 *       El tipo de documento se registra automáticamente como RECEIPT.
 *       El tamaño máximo permitido es de 5 MB.
 *     tags:
 *       - Uploads
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de MongoDB del envío.
 *         example: 66d0a132dc78230f1b421030
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - file
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Comprobante PDF, JPG, JPEG o PNG. Máximo 5 MB.
 *     responses:
 *       200:
 *         description: Comprobante del envío cargado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Comprobante del envío cargado correctamente.
 *                 payload:
 *                   $ref: '#/components/schemas/Shipment'
 *       400:
 *         description: Error de validación del archivo.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               fileRequired:
 *                 summary: Archivo no enviado
 *                 value:
 *                   status: error
 *                   error: FILE_REQUIRED
 *                   message: El archivo es obligatorio.
 *               invalidFileType:
 *                 summary: Tipo de archivo no permitido
 *                 value:
 *                   status: error
 *                   error: INVALID_FILE_TYPE
 *                   message: El tipo de archivo no está permitido.
 *               fileTooLarge:
 *                 summary: Archivo demasiado grande
 *                 value:
 *                   status: error
 *                   error: FILE_TOO_LARGE
 *                   message: El archivo supera el tamaño máximo permitido de 5 MB.
 *               invalidFileField:
 *                 summary: Campo de archivo incorrecto
 *                 value:
 *                   status: error
 *                   error: INVALID_FILE_FIELD
 *                   message: El campo utilizado para enviar el archivo no es válido.
 *       404:
 *         description: El envío no existe.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               status: error
 *               error: SHIPMENT_NOT_FOUND
 *               message: El envío no fue encontrado.
 *       500:
 *         description: Error interno durante la carga del comprobante.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post(
    "/shipments/:id/receipt",
    uploadReceipt.single(
        "file"
    ),
    uploadController.uploadShipmentReceipt
);

export default router;