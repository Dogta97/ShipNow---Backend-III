import { Router } from "express";
import userController from "../controllers/usercontroller.js";

const router = Router();

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Obtener todos los usuarios
 *     description: Devuelve la lista completa de usuarios registrados en ShipNow.
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get(
    "/",
    userController.getAllUsers
);


/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Obtener un usuario por ID
 *     description: Busca y devuelve un usuario específico utilizando su identificador de MongoDB.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario.
 *         schema:
 *           type: string
 *         example: 66d0a132dc78230f1b421001
 *     responses:
 *       200:
 *         description: Usuario encontrado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: ID inválido.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Usuario no encontrado.
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
    userController.getUserById
);


/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Crear un usuario
 *     description: Crea un nuevo usuario en ShipNow.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *             properties:
 *               name:
 *                 type: string
 *                 example: Juan Pérez
 *               email:
 *                 type: string
 *                 format: email
 *                 example: juan@example.com
 *               role:
 *                 type: string
 *                 enum:
 *                   - ADMIN
 *                   - USER
 *                   - DELIVERER
 *                 example: USER
 *     responses:
 *       201:
 *         description: Usuario creado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Datos de usuario inválidos.
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
    userController.createUser
);


/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Actualizar un usuario
 *     description: Actualiza los datos de un usuario existente.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario.
 *         schema:
 *           type: string
 *         example: 66d0a132dc78230f1b421001
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Juan Pérez Actualizado
 *               email:
 *                 type: string
 *                 format: email
 *                 example: juan.actualizado@example.com
 *               role:
 *                 type: string
 *                 enum:
 *                   - ADMIN
 *                   - USER
 *                   - DELIVERER
 *                 example: DELIVERER
 *     responses:
 *       200:
 *         description: Usuario actualizado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: ID o datos inválidos.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Usuario no encontrado.
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
    userController.updateUser
);


/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Eliminar un usuario
 *     description: Elimina un usuario existente utilizando su ID.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario.
 *         schema:
 *           type: string
 *         example: 66d0a132dc78230f1b421001
 *     responses:
 *       200:
 *         description: Usuario eliminado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Usuario eliminado correctamente.
 *       400:
 *         description: ID inválido.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Usuario no encontrado.
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
    userController.deleteUser
);

export default router;