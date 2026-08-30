import { Router } from "express";
import shipmentController from "../controllers/shipmentcontroller.js";

const router = Router();

/**
 * @swagger
 * /api/shipments:
 *   get:
 *     summary: Obtener todos los envíos
 *     description: Devuelve la lista completa de envíos registrados en ShipNow.
 *     tags:
 *       - Deliveries
 *     responses:
 *       200:
 *         description: Lista de envíos obtenida correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Delivery'
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get(
    "/",
    shipmentController.getAllShipments
);


/**
 * @swagger
 * /api/shipments/{id}:
 *   get:
 *     summary: Obtener un envío por ID
 *     description: Busca y devuelve un envío específico utilizando su identificador de MongoDB.
 *     tags:
 *       - Deliveries
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del envío.
 *         schema:
 *           type: string
 *         example: 66d0a132dc78230f1b421030
 *     responses:
 *       200:
 *         description: Envío encontrado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Delivery'
 *       400:
 *         description: ID inválido.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Envío no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get(
    "/:id",
    shipmentController.getShipmentById
);


/**
 * @swagger
 * /api/shipments:
 *   post:
 *     summary: Crear un envío
 *     description: Crea un nuevo envío asociado a un pedido de ShipNow.
 *     tags:
 *       - Deliveries
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - trackingNumber
 *               - order
 *               - origin
 *               - destination
 *               - weight
 *             properties:
 *               trackingNumber:
 *                 type: string
 *                 example: SHIP-2026-0001
 *               order:
 *                 type: string
 *                 description: ID del pedido asociado.
 *                 example: 66d0a132dc78230f1b421020
 *               deliverer:
 *                 type: string
 *                 nullable: true
 *                 description: ID del repartidor asignado.
 *                 example: 66d0a132dc78230f1b421040
 *               origin:
 *                 type: string
 *                 example: Buenos Aires
 *               destination:
 *                 type: string
 *                 example: La Plata
 *               weight:
 *                 type: number
 *                 minimum: 0
 *                 example: 4.5
 *               status:
 *                 type: string
 *                 enum:
 *                   - PENDING
 *                   - IN_TRANSIT
 *                   - DELIVERED
 *                   - CANCELLED
 *                 example: PENDING
 *     responses:
 *       201:
 *         description: Envío creado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Delivery'
 *       400:
 *         description: Datos o estado del envío inválidos.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post(
    "/",
    shipmentController.createShipment
);


/**
 * @swagger
 * /api/shipments/{id}:
 *   put:
 *     summary: Actualizar un envío
 *     description: Actualiza los datos de un envío existente.
 *     tags:
 *       - Deliveries
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del envío.
 *         schema:
 *           type: string
 *         example: 66d0a132dc78230f1b421030
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               trackingNumber:
 *                 type: string
 *                 example: SHIP-2026-0001
 *               order:
 *                 type: string
 *                 example: 66d0a132dc78230f1b421020
 *               deliverer:
 *                 type: string
 *                 nullable: true
 *                 example: 66d0a132dc78230f1b421040
 *               origin:
 *                 type: string
 *                 example: Buenos Aires
 *               destination:
 *                 type: string
 *                 example: Rosario
 *               weight:
 *                 type: number
 *                 minimum: 0
 *                 example: 5.2
 *               status:
 *                 type: string
 *                 enum:
 *                   - PENDING
 *                   - IN_TRANSIT
 *                   - DELIVERED
 *                   - CANCELLED
 *                 example: IN_TRANSIT
 *     responses:
 *       200:
 *         description: Envío actualizado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Delivery'
 *       400:
 *         description: ID, datos o estado del envío inválidos.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Envío no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.put(
    "/:id",
    shipmentController.updateShipment
);


/**
 * @swagger
 * /api/shipments/{id}:
 *   delete:
 *     summary: Eliminar un envío
 *     description: Elimina un envío existente utilizando su ID.
 *     tags:
 *       - Deliveries
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del envío.
 *         schema:
 *           type: string
 *         example: 66d0a132dc78230f1b421030
 *     responses:
 *       200:
 *         description: Envío eliminado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Envío eliminado correctamente.
 *       400:
 *         description: ID inválido.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Envío no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.delete(
    "/:id",
    shipmentController.deleteShipment
);

export default router;