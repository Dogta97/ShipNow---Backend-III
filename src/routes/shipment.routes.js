import { Router } from "express";
import shipmentController from "../controllers/shipmentcontroller.js";

const router = Router();

router.get("/", shipmentController.getAllShipments);

router.get("/:id", shipmentController.getShipmentById);

router.post("/", shipmentController.createShipment);

router.put("/:id", shipmentController.updateShipment);

router.delete("/:id", shipmentController.deleteShipment);

export default router;