import app from "./app.js";
import connectDB from "./database/mongo.js";
import config from "./config/env.config.js";

const startServer = async () => {
    await connectDB();

    app.listen(config.port, () => {
        console.log(`🚀 Servidor corriendo en http://localhost:${config.port}`);
    });
};

startServer();