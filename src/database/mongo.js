import mongoose from "mongoose";
import config from "../config/env.config.js";

const connectDB = async () => {
    try {
        await mongoose.connect(config.mongoUri);
        console.log("✅ MongoDB conectado correctamente.");
    } catch (error) {
        console.error("❌ Error al conectar MongoDB:", error.message);
        process.exit(1);
    }
};

export default connectDB;