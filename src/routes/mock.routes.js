import { Router } from "express";
import mockController from "../controllers/mock.controller.js";

const router = Router();

/**
 * @swagger
 * /api/mocks/users:
 *   get:
 *     summary: Generar usuarios mock
 *     description: Genera usuarios simulados sin persistirlos en MongoDB. Si no se indica quantity, se generan 10.
 *     tags:
 *       - Mocks
 *     parameters:
 *       - in: query
 *         name: quantity
 *         required: false
 *         description: Cantidad de usuarios mock a generar. Debe ser un entero entre 1 y 100.
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         example: 5
 *     responses:
 *       200:
 *         description: Usuarios mock generados correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 count:
 *                   type: integer
 *                   example: 5
 *                 payload:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       400:
 *         description: Cantidad inválida o superior al límite permitido.
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
    "/users",
    mockController.generateUsers
);


/**
 * @swagger
 * /api/mocks/users:
 *   post:
 *     summary: Crear usuarios mock
 *     description: Genera usuarios simulados y los inserta en MongoDB. No requiere body; la cantidad se indica mediante el parámetro query quantity. Si no se indica, se crean 10.
 *     tags:
 *       - Mocks
 *     parameters:
 *       - in: query
 *         name: quantity
 *         required: false
 *         description: Cantidad de usuarios mock a crear. Debe ser un entero entre 1 y 100.
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         example: 5
 *     responses:
 *       201:
 *         description: Usuarios mock creados correctamente.
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
 *                   example: Usuarios de prueba creados correctamente.
 *                 count:
 *                   type: integer
 *                   example: 5
 *                 payload:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       400:
 *         description: Cantidad inválida o superior al límite permitido.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Error al persistir los mocks o error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post(
    "/users",
    mockController.createUsers
);


/**
 * @swagger
 * /api/mocks/deliverers:
 *   get:
 *     summary: Generar repartidores mock
 *     description: Genera usuarios simulados con rol DELIVERER sin persistirlos en MongoDB. Si no se indica quantity, se generan 10.
 *     tags:
 *       - Mocks
 *     parameters:
 *       - in: query
 *         name: quantity
 *         required: false
 *         description: Cantidad de repartidores mock a generar. Debe ser un entero entre 1 y 100.
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         example: 5
 *     responses:
 *       200:
 *         description: Repartidores mock generados correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 count:
 *                   type: integer
 *                   example: 5
 *                 payload:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       400:
 *         description: Cantidad inválida o superior al límite permitido.
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
    "/deliverers",
    mockController.generateDeliverers
);


/**
 * @swagger
 * /api/mocks/deliverers:
 *   post:
 *     summary: Crear repartidores mock
 *     description: Genera repartidores simulados y los inserta en MongoDB. No requiere body; la cantidad se indica mediante quantity.
 *     tags:
 *       - Mocks
 *     parameters:
 *       - in: query
 *         name: quantity
 *         required: false
 *         description: Cantidad de repartidores mock a crear. Debe ser un entero entre 1 y 100.
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         example: 5
 *     responses:
 *       201:
 *         description: Repartidores mock creados correctamente.
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
 *                   example: Repartidores de prueba creados correctamente.
 *                 count:
 *                   type: integer
 *                   example: 5
 *                 payload:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       400:
 *         description: Cantidad inválida o superior al límite permitido.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Error al persistir los mocks o error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post(
    "/deliverers",
    mockController.createDeliverers
);


/**
 * @swagger
 * /api/mocks/orders:
 *   get:
 *     summary: Generar pedidos mock
 *     description: Genera pedidos simulados sin persistirlos. Requiere que existan usuarios y productos disponibles en la base de datos.
 *     tags:
 *       - Mocks
 *       - Orders
 *     parameters:
 *       - in: query
 *         name: quantity
 *         required: false
 *         description: Cantidad de pedidos mock a generar. Debe ser un entero entre 1 y 100.
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         example: 5
 *     responses:
 *       200:
 *         description: Pedidos mock generados correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 count:
 *                   type: integer
 *                   example: 5
 *                 payload:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Order'
 *       400:
 *         description: Cantidad inválida, cantidad superior al límite o ausencia de datos necesarios para generar pedidos.
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
    "/orders",
    mockController.generateOrders
);


/**
 * @swagger
 * /api/mocks/orders:
 *   post:
 *     summary: Crear pedidos mock
 *     description: Genera pedidos simulados y los inserta en MongoDB. No requiere body; la cantidad se indica mediante quantity. Requiere usuarios y productos existentes.
 *     tags:
 *       - Mocks
 *       - Orders
 *     parameters:
 *       - in: query
 *         name: quantity
 *         required: false
 *         description: Cantidad de pedidos mock a crear. Debe ser un entero entre 1 y 100.
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         example: 5
 *     responses:
 *       201:
 *         description: Pedidos mock creados correctamente.
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
 *                   example: Pedidos de prueba creados correctamente.
 *                 count:
 *                   type: integer
 *                   example: 5
 *                 payload:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Order'
 *       400:
 *         description: Cantidad inválida, cantidad superior al límite o ausencia de datos necesarios para generar pedidos.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Error al persistir los mocks o error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post(
    "/orders",
    mockController.createOrders
);


/**
 * @swagger
 * /api/mocks/shipments:
 *   get:
 *     summary: Generar envíos mock
 *     description: Genera envíos simulados sin persistirlos. Requiere pedidos y usuarios con rol DELIVERER existentes.
 *     tags:
 *       - Mocks
 *       - Deliveries
 *     parameters:
 *       - in: query
 *         name: quantity
 *         required: false
 *         description: Cantidad de envíos mock a generar. Debe ser un entero entre 1 y 100.
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         example: 5
 *     responses:
 *       200:
 *         description: Envíos mock generados correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 count:
 *                   type: integer
 *                   example: 5
 *                 payload:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Delivery'
 *       400:
 *         description: Cantidad inválida, cantidad superior al límite o ausencia de datos necesarios para generar envíos.
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
    "/shipments",
    mockController.generateShipments
);


/**
 * @swagger
 * /api/mocks/shipments:
 *   post:
 *     summary: Crear envíos mock
 *     description: Genera envíos simulados y los inserta en MongoDB. No requiere body; la cantidad se indica mediante quantity. Requiere pedidos y repartidores existentes.
 *     tags:
 *       - Mocks
 *       - Deliveries
 *     parameters:
 *       - in: query
 *         name: quantity
 *         required: false
 *         description: Cantidad de envíos mock a crear. Debe ser un entero entre 1 y 100.
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         example: 5
 *     responses:
 *       201:
 *         description: Envíos mock creados correctamente.
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
 *                   example: Envíos de prueba creados correctamente.
 *                 count:
 *                   type: integer
 *                   example: 5
 *                 payload:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Delivery'
 *       400:
 *         description: Cantidad inválida, cantidad superior al límite o ausencia de datos necesarios para generar envíos.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Error al persistir los mocks o error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post(
    "/shipments",
    mockController.createShipments
);

export default router;