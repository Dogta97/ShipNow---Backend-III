import { Router } from "express";

import orderController from "../controllers/ordercontroller.js";

const router = Router();

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Obtener pedidos
 *     description: Obtiene pedidos con paginación y filtros opcionales por estado y prioridad.
 *     tags:
 *       - Orders
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
 *             - CONFIRMED
 *             - PREPARING
 *             - SHIPPED
 *             - DELIVERED
 *             - CANCELLED
 *       - in: query
 *         name: priority
 *         schema:
 *           type: string
 *           enum:
 *             - LOW
 *             - NORMAL
 *             - HIGH
 *             - URGENT
 *     responses:
 *       200:
 *         description: Pedidos obtenidos correctamente.
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
 *                     $ref: '#/components/schemas/Order'
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
    orderController.getAllOrders
);

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Obtener un pedido por ID
 *     tags:
 *       - Orders
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Pedido encontrado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: Pedido no encontrado.
 */
router.get(
    "/:id",
    orderController.getOrderById
);

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Crear un nuevo pedido
 *     tags:
 *       - Orders
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user
 *               - products
 *             properties:
 *               user:
 *                 type: string
 *               products:
 *                 type: array
 *                 minItems: 1
 *                 items:
 *                   type: object
 *                   required:
 *                     - product
 *                     - quantity
 *                   properties:
 *                     product:
 *                       type: string
 *                     quantity:
 *                       type: integer
 *                       minimum: 1
 *               priority:
 *                 type: string
 *                 enum:
 *                   - LOW
 *                   - NORMAL
 *                   - HIGH
 *                   - URGENT
 *                 default: NORMAL
 *     responses:
 *       201:
 *         description: Pedido creado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: Datos inválidos.
 */
router.post(
    "/",
    orderController.createOrder
);

/**
 * @swagger
 * /api/orders/{id}/status:
 *   put:
 *     summary: Actualizar estado de un pedido
 *     tags:
 *       - Orders
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
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum:
 *                   - PENDING
 *                   - CONFIRMED
 *                   - PREPARING
 *                   - SHIPPED
 *                   - DELIVERED
 *                   - CANCELLED
 *     responses:
 *       200:
 *         description: Estado actualizado correctamente.
 *       404:
 *         description: Pedido no encontrado.
 */
router.put(
    "/:id/status",
    orderController.updateOrderStatus
);

export default router;