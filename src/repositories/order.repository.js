import Order from "../models/order.js";

class OrderRepository {

    async getAll() {
        return await Order.find()
            .populate("user")
            .populate("products.product")
            .sort({ createdAt: -1 });
    }

    async createMany(orders) {
        return await Order.insertMany(orders);
    }

}

export default new OrderRepository();