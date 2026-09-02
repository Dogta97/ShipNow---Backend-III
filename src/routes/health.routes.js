import {
    Router,
} from "express";

import config from "../config/env.config.js";

const router = Router();

/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: Verificar el estado de la API
 *     description: Devuelve información básica sobre el estado actual de ShipNow.
 *     tags:
 *       - Health
 *     responses:
 *       200:
 *         description: API operativa.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 *                 environment:
 *                   type: string
 *                   example: development
 *                 uptime:
 *                   type: number
 *                   example: 125.42
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                   example: 2026-09-01T20:30:00.000Z
 */
router.get(
    "/",
    (req, res) => {

        res
            .status(200)
            .json({
                status:
                    "ok",

                environment:
                    config.nodeEnv,

                uptime:
                    Number(
                        process
                            .uptime()
                            .toFixed(2)
                    ),

                timestamp:
                    new Date()
                        .toISOString(),
            });

    }
);

export default router;