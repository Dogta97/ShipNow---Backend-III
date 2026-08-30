import { Router } from "express";
import orderController from "../controllers/ordercontroller.js";

const router = Router();

router.get(
    "/",
    orderController.getAllOrders
);

router.get(
    "/:id",
    orderController.getOrderById
);

router.post(
    "/",
    orderController.createOrder
);

router.put(
    "/:id/status",
    orderController.updateOrderStatus
);

export default router;