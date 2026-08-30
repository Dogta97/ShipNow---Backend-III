import orderRepository from "../repositories/order.repository.js";
import userRepository from "../repositories/user.repository.js";
import productRepository from "../repositories/product.repository.js";

import AppError from "../errors/AppError.js";
import { ERROR_TYPES } from "../errors/errorDictionary.js";
import { ORDER_STATUS } from "../constants/index.js";

class OrderService {

    async getAllOrders() {
        return await orderRepository.getAll();
    }

    async getOrderById(id) {
        const order = await orderRepository.getById(id);

        if (!order) {
            throw new AppError(
                ERROR_TYPES.ORDER_NOT_FOUND
            );
        }

        return order;
    }

    async createOrder(orderData) {

        if (
            !orderData.user ||
            !Array.isArray(orderData.products) ||
            orderData.products.length === 0
        ) {
            throw new AppError(
                ERROR_TYPES.INVALID_DATA
            );
        }

        const user = await userRepository.getById(
            orderData.user
        );

        if (!user) {
            throw new AppError(
                ERROR_TYPES.USER_NOT_FOUND
            );
        }

        for (const item of orderData.products) {

            if (
                !item.product ||
                !Number.isInteger(item.quantity) ||
                item.quantity <= 0
            ) {
                throw new AppError(
                    ERROR_TYPES.INVALID_DATA
                );
            }

            const product =
                await productRepository.getById(
                    item.product
                );

            if (!product) {
                throw new AppError(
                    ERROR_TYPES.PRODUCT_NOT_FOUND
                );
            }
        }

        if (
            orderData.status &&
            !Object.values(ORDER_STATUS).includes(
                orderData.status
            )
        ) {
            throw new AppError(
                ERROR_TYPES.INVALID_STATUS
            );
        }

        return await orderRepository.create(
            orderData
        );
    }

    async updateOrderStatus(id, status) {

        if (
            !status ||
            !Object.values(ORDER_STATUS).includes(status)
        ) {
            throw new AppError(
                ERROR_TYPES.INVALID_STATUS
            );
        }

        const order =
            await orderRepository.updateStatus(
                id,
                status
            );

        if (!order) {
            throw new AppError(
                ERROR_TYPES.ORDER_NOT_FOUND
            );
        }

        return order;
    }
}

export default new OrderService();