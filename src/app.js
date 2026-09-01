import express from "express";
import swaggerUi from "swagger-ui-express";

import userRoutes from "./routes/user.routes.js";
import productRoutes from "./routes/product.routes.js";
import orderRoutes from "./routes/order.routes.js";
import shipmentRoutes from "./routes/shipment.routes.js";
import healthRoutes from "./routes/health.routes.js";
import mockRoutes from "./routes/mock.routes.js";
import loggerRoutes from "./routes/logger.routes.js";
import uploadRoutes from "./routes/upload.routes.js";

import swaggerSpec from "./config/swagger.config.js";

import config from "./config/env.config.js";

import AppError from "./errors/AppError.js";

import {
    ERROR_TYPES,
} from "./errors/errorDictionary.js";

import errorMiddleware from "./middlewares/error.middleware.js";

const app = express();

app.use(
    express.json({
        limit: "1mb",
    })
);

app.use(
    "/api/docs",
    swaggerUi.serve,
    swaggerUi.setup(
        swaggerSpec
    )
);

app.get(
    "/",
    (req, res) => {

        res.json({

            message:
                "🚚 Bienvenido a ShipNow API",
        });
    }
);

app.use(
    "/api/users",
    userRoutes
);

app.use(
    "/api/products",
    productRoutes
);

app.use(
    "/api/orders",
    orderRoutes
);

app.use(
    "/api/shipments",
    shipmentRoutes
);

app.use(
    "/api/health",
    healthRoutes
);

app.use(
    "/api/uploads",
    uploadRoutes
);

if (
    config.nodeEnv !==
    "production"
) {

    app.use(
        "/api/mocks",
        mockRoutes
    );

    app.use(
        "/api/logger",
        loggerRoutes
    );
}

app.use(
    (req, res, next) => {

        next(
            new AppError(
                ERROR_TYPES.ROUTE_NOT_FOUND
            )
        );
    }
);

app.use(
    errorMiddleware
);

export default app;