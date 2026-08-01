import { Router } from "express";
import mockController from "../controllers/mock.controller.js";

const router = Router();

router.get("/users", mockController.generateUsers);

router.post("/users", mockController.createUsers);

router.get("/deliverers", mockController.generateDeliverers);

router.post("/deliverers", mockController.createDeliverers);

router.get("/orders", mockController.generateOrders);

router.post("/orders", mockController.createOrders);

router.get("/shipments", mockController.generateShipments);

router.post("/shipments", mockController.createShipments);

export default router;