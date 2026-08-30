import { Router } from "express";
import logger from "../config/logger.js";

const router = Router();

/**
 * @swagger
 * /api/logger/test:
 *   get:
 *     summary: Probar todos los niveles del logger
 *     description: >
 *       Endpoint técnico utilizado exclusivamente para validar el funcionamiento
 *       del sistema centralizado de logging de ShipNow. Genera un mensaje para
 *       cada nivel configurado: debug, http, info, warning, error y fatal.
 *       No representa una funcionalidad de negocio de la aplicación.
 *     tags:
 *       - Logger
 *     responses:
 *       200:
 *         description: Logs de prueba generados correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *             example:
 *               status: success
 *               message: Logs de prueba generados correctamente.
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/test", (req, res) => {

    logger.debug(
        "Prueba de logger nivel DEBUG"
    );

    logger.http(
        "Prueba de logger nivel HTTP"
    );

    logger.info(
        "Prueba de logger nivel INFO"
    );

    logger.warning(
        "Prueba de logger nivel WARNING"
    );

    logger.error(
        "Prueba de logger nivel ERROR"
    );

    logger.fatal(
        "Prueba de logger nivel FATAL"
    );

    res.status(200).json({

        status: "success",

        message:
            "Logs de prueba generados correctamente.",

    });

});

export default router;