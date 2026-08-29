import { Router } from "express";
import logger from "../config/logger.js";

const router = Router();

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