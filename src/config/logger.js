import fs from "fs";
import path from "path";
import winston from "winston";

import config from "./env.config.js";

const {
    combine,
    timestamp,
    printf,
} = winston.format;

const levels = {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    debug: 5,
};

const validLogLevels =
    Object.keys(levels);

if (
    !validLogLevels.includes(
        config.logLevel
    )
) {
    throw new Error(
        `LOG_LEVEL debe ser uno de los siguientes valores: ${validLogLevels.join(", ")}.`
    );
}

const logsDirectory =
    path.join(
        process.cwd(),
        "logs"
    );

if (
    !fs.existsSync(
        logsDirectory
    )
) {
    fs.mkdirSync(
        logsDirectory,
        {
            recursive: true,
        }
    );
}

const logFormat =
    combine(
        timestamp({
            format:
                "YYYY-MM-DD HH:mm:ss",
        }),

        printf(
            ({
                timestamp,
                level,
                message,
            }) => {
                return `${timestamp} [${level}] ${message}`;
            }
        )
    );

const transports = [

    new winston.transports.File({
        filename:
            path.join(
                logsDirectory,
                "error.log"
            ),

        level:
            "error",

        format:
            logFormat,
    }),

    new winston.transports.File({
        filename:
            path.join(
                logsDirectory,
                "combined.log"
            ),

        level:
            config.logLevel,

        format:
            logFormat,
    }),
];

if (
    config.nodeEnv ===
    "development"
) {
    transports.push(
        new winston.transports.Console({
            level:
                config.logLevel,

            format:
                logFormat,
        })
    );
}

const logger =
    winston.createLogger({
        levels,
        transports,
    });

export default logger;