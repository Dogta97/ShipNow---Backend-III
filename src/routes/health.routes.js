import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    res.status(200).json({
        status: "OK",
        message: "ShipNow API funcionando correctamente"
    });
});

export default router;