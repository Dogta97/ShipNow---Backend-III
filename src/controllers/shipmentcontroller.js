import shipmentService from "../services/shipmentservice.js";

class ShipmentController {

    async getAllShipments(
        req,
        res,
        next
    ) {

        try {

            const result =
                await shipmentService.getAllShipments(
                    req.query
                );

            res
                .status(200)
                .json(result);

        } catch (error) {

            next(error);

        }

    }

    async getShipmentByTrackingNumber(
        req,
        res,
        next
    ) {

        try {

            const {
                trackingNumber,
            } = req.params;

            const shipment =
                await shipmentService.getShipmentByTrackingNumber(
                    trackingNumber
                );

            res
                .status(200)
                .json(shipment);

        } catch (error) {

            next(error);

        }

    }

    async getShipmentById(
        req,
        res,
        next
    ) {

        try {

            const { id } =
                req.params;

            const shipment =
                await shipmentService.getShipmentById(
                    id
                );

            res
                .status(200)
                .json(shipment);

        } catch (error) {

            next(error);

        }

    }

    async createShipment(
        req,
        res,
        next
    ) {

        try {

            const shipment =
                await shipmentService.createShipment(
                    req.body
                );

            res
                .status(201)
                .json(shipment);

        } catch (error) {

            next(error);

        }

    }

    async updateShipment(
        req,
        res,
        next
    ) {

        try {

            const { id } =
                req.params;

            const shipment =
                await shipmentService.updateShipment(
                    id,
                    req.body
                );

            res
                .status(200)
                .json(shipment);

        } catch (error) {

            next(error);

        }

    }

    async deleteShipment(
        req,
        res,
        next
    ) {

        try {

            const { id } =
                req.params;

            await shipmentService.deleteShipment(
                id
            );

            res
                .status(200)
                .json({
                    message:
                        "Envío eliminado correctamente.",
                });

        } catch (error) {

            next(error);

        }

    }

}

export default new ShipmentController();