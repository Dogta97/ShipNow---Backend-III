import { ORDER_PRIORITY, ORDER_STATUS } from "../constants/index.js";

const statuses = Object.values(ORDER_STATUS);
const priorities = Object.values(ORDER_PRIORITY);

export const generateMockOrders = (
    quantity,
    users,
    products
) => {

    const orders = [];

    for (let i = 0; i < quantity; i++) {

        const randomUser =
            users[Math.floor(Math.random() * users.length)];

        const randomProduct =
            products[Math.floor(Math.random() * products.length)];

        const randomStatus =
            statuses[Math.floor(Math.random() * statuses.length)];

        const randomPriority =
            priorities[Math.floor(Math.random() * priorities.length)];

        orders.push({

            user: randomUser._id,

            products: [
                {
                    product: randomProduct._id,
                    quantity: Math.floor(Math.random() * 5) + 1,
                },
            ],

            status: randomStatus,

            priority: randomPriority,

        });

    }

    return orders;

};