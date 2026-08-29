import mongoose from "mongoose";
import config from "../config/env.config.js";
import logger from "../config/logger.js";

const connectDB = async () => {

    try {

        await mongoose.connect(config.mongoUri);

        logger.info(
            "Conexión a MongoDB establecida correctamente."
        );

    } catch (error) {

        logger.error(
            `Error al conectar con MongoDB: ${error.message}`
        );

        throw error;

    }

};

export default connectDB;