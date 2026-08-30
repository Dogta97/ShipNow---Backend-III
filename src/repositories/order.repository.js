import Order from "../models/order.js";

class OrderRepository {

    async getAll() {

        return await Order.find()
            .populate("user")
            .populate("products.product")
            .sort({ createdAt: -1 });
    }

    async getById(id) {

        return await Order.findById(id)
            .populate("user")
            .populate("products.product");
    }

    async create(orderData) {

        return await Order.create(orderData);
    }

    async createMany(orders) {

        return await Order.insertMany(orders);
    }

    async updateStatus(id, status) {

        return await Order.findByIdAndUpdate(
            id,
            { status },
            {
                returnDocument: "after",
                runValidators: true,
            }
        )
            .populate("user")
            .populate("products.product");
    }

    async addReceipt(id, receiptMetadata) {

        return await Order.findByIdAndUpdate(
            id,
            {
                receipt: receiptMetadata,
            },
            {
                returnDocument: "after",
                runValidators: true,
            }
        )
            .populate("user")
            .populate("products.product");
    }
}

export default new OrderRepository();