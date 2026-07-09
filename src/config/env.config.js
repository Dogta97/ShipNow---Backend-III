import dotenv from "dotenv";

dotenv.config();

const config = {
    port: process.env.PORT,
    mongoUri: process.env.MONGODB_URI,
    nodeEnv: process.env.NODE_ENV,
};

for (const [key, value] of Object.entries(config)) {
    if (!value) {
        throw new Error(`La variable de entorno ${key} es obligatoria.`);
    }
}

export default config;