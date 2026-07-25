import { Router } from "express";
import productController from "../controllers/productcontroller.js";

const router = Router();

router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.post("/", productController.createProduct);

export default router;