import Shipment from "../models/shipment.js";

class ShipmentRepository {

    async getAll({
        page = 1,
        limit = 10,
        status,
    }) {

        const filter = {};

        if (status) {
            filter.status = status;
        }

        const skip =
            (page - 1) * limit;

        const [
            shipments,
            totalDocs,
        ] = await Promise.all([

            Shipment.find(filter)
                .sort({
                    createdAt: -1,
                })
                .skip(skip)
                .limit(limit),

            Shipment.countDocuments(
                filter
            ),

        ]);

        return {
            shipments,
            totalDocs,
        };

    }

    async getById(id) {

        return await Shipment.findById(
            id
        );

    }

    async getByTrackingNumber(
        trackingNumber
    ) {

        return await Shipment.findOne({
            trackingNumber,
        });

    }

    async create(
        shipmentData
    ) {

        return await Shipment.create(
            shipmentData
        );

    }

    async update(
        id,
        shipmentData
    ) {

        return await Shipment.findByIdAndUpdate(
            id,
            shipmentData,
            {
                returnDocument: "after",
                runValidators: true,
            }
        );

    }

    async addReceipt(
        id,
        receipt
    ) {

        return await Shipment.findByIdAndUpdate(
            id,
            {
                $set: {
                    receipt,
                },
            },
            {
                returnDocument: "after",
                runValidators: true,
            }
        );

    }

    async delete(id) {

        return await Shipment.findByIdAndDelete(
            id
        );

    }

}

export default new ShipmentRepository();