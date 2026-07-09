import express from "express";

import userRoutes from "./routes/user.routes.js";
import shipmentRoutes from "./routes/shipment.routes.js";
import healthRoutes from "./routes/health.routes.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "🚚 Bienvenido a ShipNow API",
    });
});

app.use("/api/users", userRoutes);
app.use("/api/shipments", shipmentRoutes);
app.use("/api/health", healthRoutes);

export default app;