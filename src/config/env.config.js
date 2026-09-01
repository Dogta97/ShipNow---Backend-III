import dotenv from "dotenv";

dotenv.config();

const allowedEnvironments = [
    "development",
    "test",
    "production",
];

const config = {

    port: Number(process.env.PORT),

    mongoUri: process.env.MONGODB_URI,

    nodeEnv: process.env.NODE_ENV,

    logLevel: process.env.LOG_LEVEL,
};

const requiredVariables = {
    PORT: process.env.PORT,
    MONGODB_URI: process.env.MONGODB_URI,
    NODE_ENV: process.env.NODE_ENV,
    LOG_LEVEL: process.env.LOG_LEVEL,
};

for (
    const [key, value]
    of Object.entries(requiredVariables)
) {

    if (!value) {

        throw new Error(
            `La variable de entorno ${key} es obligatoria.`
        );
    }
}

if (
    !Number.isInteger(config.port) ||
    config.port <= 0
) {

    throw new Error(
        "La variable PORT debe ser un número entero mayor a 0."
    );
}

if (
    !allowedEnvironments.includes(
        config.nodeEnv
    )
) {

    throw new Error(
        `NODE_ENV debe ser uno de los siguientes valores: ${allowedEnvironments.join(", ")}.`
    );
}

export default config;