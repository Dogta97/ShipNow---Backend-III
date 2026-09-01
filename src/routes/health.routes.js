import {
    Router,
} from "express";

import config from "../config/env.config.js";

const router = Router();

router.get(
    "/",
    (req, res) => {

        res
            .status(200)
            .json({

                status: "ok",

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