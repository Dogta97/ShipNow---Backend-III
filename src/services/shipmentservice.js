import shipmentRepository from "../repositories/shipmentrepository.js";

class ShipmentService {

    async getAllShipments() {
        return await shipmentRepository.getAll();
    }

    async getShipmentById(id) {
        return await shipmentRepository.getById(id);
    }

    async createShipment(shipmentData) {

        if (
            !shipmentData.trackingNumber ||
            !shipmentData.origin ||
            !shipmentData.destination
        ) {
            throw new Error("Tracking, origen y destino son obligatorios.");
        }

        const shipmentExists = await shipmentRepository.getByTrackingNumber(
            shipmentData.trackingNumber
        );

        if (shipmentExists) {
            throw new Error("El número de seguimiento ya existe.");
        }

        return await shipmentRepository.create(shipmentData);
    }

    async updateShipment(id, shipmentData) {
        return await shipmentRepository.update(id, shipmentData);
    }

    async deleteShipment(id) {
        return await shipmentRepository.delete(id);
    }

}

export default new ShipmentService();