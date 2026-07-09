import Shipment from "../models/shipment.js";

class ShipmentRepository {

    async getAll() {
        return await Shipment.find()
            .sort({ createdAt: -1 });
    }

    async getById(id) {
        return await Shipment.findById(id);
    }

    async getByTrackingNumber(trackingNumber) {
        return await Shipment.findOne({ trackingNumber });
    }

    async create(shipmentData) {
        return await Shipment.create(shipmentData);
    }

    async update(id, shipmentData) {
        return await Shipment.findByIdAndUpdate(
            id,
            shipmentData,
            {
                new: true,
                runValidators: true,
            }
        );
    }

    async delete(id) {
        return await Shipment.findByIdAndDelete(id);
    }

}

export default new ShipmentRepository();