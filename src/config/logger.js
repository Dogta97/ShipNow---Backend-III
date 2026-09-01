import winston from "winston";
import "winston-daily-rotate-file";

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

const logFormat = combine(

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

const errorTransport =
    new winston.transports
        .DailyRotateFile({

            filename:
                "logs/error-%DATE%.log",

            datePattern:
                "YYYY-MM-DD",

            zippedArchive:
                true,

            maxSize:
                "10m",

            maxFiles:
                "14d",

            level:
                "error",

            format:
                logFormat,
        });

const transports = [

    new winston.transports.Console({

        level:
            config.logLevel,

        format:
            logFormat,
    }),

    errorTransport,
];

const logger =
    winston.createLogger({

        levels,

        transports,
    });

export default logger;