import app from "./app.js";
import connectDB from "./database/mongo.js";
import config from "./config/env.config.js";
import logger from "./config/logger.js";

const startServer = async () => {

    try {

        await connectDB();

        app.listen(config.port, () => {

            logger.info(
                `Servidor ShipNow escuchando en el puerto ${config.port}`
            );

        });

    } catch (error) {

        logger.fatal(
            `No fue posible iniciar ShipNow: ${error.message}`
        );

        process.exit(1);

    }

};

startServer();