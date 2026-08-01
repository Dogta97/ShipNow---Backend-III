import { SHIPMENT_STATUS } from "../constants/index.js";

const statuses = Object.values(SHIPMENT_STATUS);

export const generateMockShipments = (
    quantity,
    orders,
    deliverers
) => {

    const shipments = [];

    for (let i = 0; i < quantity; i++) {

        const randomOrder =
            orders[Math.floor(Math.random() * orders.length)];

        const randomDeliverer =
            deliverers[Math.floor(Math.random() * deliverers.length)];

        const randomStatus =
            statuses[Math.floor(Math.random() * statuses.length)];

        shipments.push({

            trackingNumber: `TRK-${Date.now()}-${i}`,

            order: randomOrder._id,

            deliverer: randomDeliverer._id,

            origin: "Depósito central",

            destination: "Cliente",

            weight: Math.floor(Math.random() * 20) + 1,

            status: randomStatus,

        });

    }

    return shipments;

};