import { Router } from "express";

import shipmentController from "../controllers/shipmentcontroller.js";

const router = Router();

/**
 * @swagger
 * /api/shipments:
 *   get:
 *     summary: Obtener envíos
 *     description: Obtiene envíos con paginación y filtro opcional por estado.
 *     tags:
 *       - Deliveries
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum:
 *             - PENDING
 *             - IN_TRANSIT
 *             - DELIVERED
 *             - CANCELLED
 *     responses:
 *       200:
 *         description: Envíos obtenidos correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 payload:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Delivery'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: integer
 *                     limit:
 *                       type: integer
 *                     totalDocs:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *                     hasNextPage:
 *                       type: boolean
 *                     hasPrevPage:
 *                       type: boolean
 *       400:
 *         description: Parámetros inválidos.
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
 * /api/shipments/tracking/{trackingNumber}:
 *   get:
 *     summary: Buscar un envío por número de seguimiento
 *     description: Obtiene un envío utilizando su número de tracking.
 *     tags:
 *       - Deliveries
 *     parameters:
 *       - in: path
 *         name: trackingNumber
 *         required: true
 *         description: Número de seguimiento del envío.
 *         schema:
 *           type: string
 *         example: SHIP-2026-0001
 *     responses:
 *       200:
 *         description: Envío encontrado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Delivery'
 *       404:
 *         description: Envío no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get(
    "/tracking/:trackingNumber",
    shipmentController.getShipmentByTrackingNumber
);

/**
 * @swagger
 * /api/shipments/{id}:
 *   get:
 *     summary: Obtener un envío por ID
 *     tags:
 *       - Deliveries
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Envío encontrado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Delivery'
 *       404:
 *         description: Envío no encontrado.
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
 *               deliverer:
 *                 type: string
 *                 nullable: true
 *                 description: ID del repartidor asociado.
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
 *     responses:
 *       201:
 *         description: Envío creado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Delivery'
 *       400:
 *         description: Datos inválidos.
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
 *     tags:
 *       - Deliveries
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               trackingNumber:
 *                 type: string
 *               order:
 *                 type: string
 *               deliverer:
 *                 type: string
 *                 nullable: true
 *               origin:
 *                 type: string
 *               destination:
 *                 type: string
 *               weight:
 *                 type: number
 *                 minimum: 0
 *               status:
 *                 type: string
 *                 enum:
 *                   - PENDING
 *                   - IN_TRANSIT
 *                   - DELIVERED
 *                   - CANCELLED
 *     responses:
 *       200:
 *         description: Envío actualizado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Delivery'
 *       404:
 *         description: Envío no encontrado.
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
 *     tags:
 *       - Deliveries
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
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
 *       404:
 *         description: Envío no encontrado.
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