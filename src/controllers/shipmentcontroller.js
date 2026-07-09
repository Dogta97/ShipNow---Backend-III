import shipmentService from "../services/shipmentservice.js";

class ShipmentController {

    async getAllShipments(req, res) {

        try {

            const shipments = await shipmentService.getAllShipments();

            res.status(200).json(shipments);

        } catch (error) {

            res.status(500).json({
                message: error.message,
            });

        }

    }

    async getShipmentById(req, res) {

        try {

            const { id } = req.params;

            const shipment = await shipmentService.getShipmentById(id);

            if (!shipment) {
                return res.status(404).json({
                    message: "Envío no encontrado.",
                });
            }

            res.status(200).json(shipment);

        } catch (error) {

            res.status(500).json({
                message: error.message,
            });

        }

    }

    async createShipment(req, res) {

        try {

            const shipment = await shipmentService.createShipment(req.body);

            res.status(201).json(shipment);

        } catch (error) {

            res.status(400).json({
                message: error.message,
            });

        }

    }

    async updateShipment(req, res) {

        try {

            const { id } = req.params;

            const shipment = await shipmentService.updateShipment(id, req.body);

            if (!shipment) {
                return res.status(404).json({
                    message: "Envío no encontrado.",
                });
            }

            res.status(200).json(shipment);

        } catch (error) {

            res.status(400).json({
                message: error.message,
            });

        }

    }

    async deleteShipment(req, res) {

        try {

            const { id } = req.params;

            const shipment = await shipmentService.deleteShipment(id);

            if (!shipment) {
                return res.status(404).json({
                    message: "Envío no encontrado.",
                });
            }

            res.status(200).json({
                message: "Envío eliminado correctamente.",
            });

        } catch (error) {

            res.status(500).json({
                message: error.message,
            });

        }

    }

}

export default new ShipmentController();