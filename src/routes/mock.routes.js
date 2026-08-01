import { Router } from "express";
import mockController from "../controllers/mock.controller.js";

const router = Router();

router.get("/users", mockController.generateUsers);

router.post("/users", mockController.createUsers);

router.get("/deliverers", mockController.generateDeliverers);

router.post("/deliverers", mockController.createDeliverers);

export default router;