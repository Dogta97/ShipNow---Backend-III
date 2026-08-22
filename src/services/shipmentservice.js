import shipmentRepository from "../repositories/shipmentrepository.js";
import AppError from "../errors/AppError.js";
import { ERROR_TYPES } from "../errors/errorDictionary.js";

class ShipmentService {

    async getAllShipments() {
        return await shipmentRepository.getAll();
    }

    async getShipmentById(id) {

        const shipment = await shipmentRepository.getById(id);

        if (!shipment) {
            throw new AppError(ERROR_TYPES.SHIPMENT_NOT_FOUND);
        }

        return shipment;

    }

    async createShipment(shipmentData) {

        if (
            !shipmentData.trackingNumber ||
            !shipmentData.origin ||
            !shipmentData.destination
        ) {
            throw new AppError(ERROR_TYPES.INVALID_DATA);
        }

        const shipmentExists =
            await shipmentRepository.getByTrackingNumber(
                shipmentData.trackingNumber
            );

        if (shipmentExists) {
            throw new AppError(
                ERROR_TYPES.TRACKING_NUMBER_ALREADY_EXISTS
            );
        }

        return await shipmentRepository.create(shipmentData);

    }

    async updateShipment(id, shipmentData) {

        const shipment =
            await shipmentRepository.update(id, shipmentData);

        if (!shipment) {
            throw new AppError(ERROR_TYPES.SHIPMENT_NOT_FOUND);
        }

        return shipment;

    }

    async deleteShipment(id) {

        const shipment =
            await shipmentRepository.delete(id);

        if (!shipment) {
            throw new AppError(ERROR_TYPES.SHIPMENT_NOT_FOUND);
        }

        return shipment;

    }

}

export default new ShipmentService();