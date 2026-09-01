import orderRepository from "../repositories/order.repository.js";

import userRepository from "../repositories/user.repository.js";

import productRepository from "../repositories/product.repository.js";

import AppError from "../errors/AppError.js";

import { ERROR_TYPES } from "../errors/errorDictionary.js";

import {
    ORDER_STATUS,
    ORDER_PRIORITY,
} from "../constants/index.js";

class OrderService {

    async getAllOrders(
        query = {}
    ) {

        const page =
            Number(query.page) || 1;

        const limit =
            Number(query.limit) || 10;

        const {
            status,
            priority,
        } = query;

        if (
            !Number.isInteger(page) ||
            page <= 0
        ) {

            throw new AppError(
                ERROR_TYPES.INVALID_DATA
            );
        }

        if (
            !Number.isInteger(limit) ||
            limit <= 0 ||
            limit > 100
        ) {

            throw new AppError(
                ERROR_TYPES.INVALID_DATA
            );
        }

        if (
            status &&
            !Object.values(
                ORDER_STATUS
            ).includes(status)
        ) {

            throw new AppError(
                ERROR_TYPES.INVALID_STATUS
            );
        }

        if (
            priority &&
            !Object.values(
                ORDER_PRIORITY
            ).includes(priority)
        ) {

            throw new AppError(
                ERROR_TYPES.INVALID_DATA
            );
        }

        const {
            orders,
            totalDocs,
        } =
            await orderRepository.getAll({
                page,
                limit,
                status,
                priority,
            });

        const totalPages =
            Math.ceil(
                totalDocs / limit
            );

        return {

            status: "success",

            payload: orders,

            pagination: {
                page,
                limit,
                totalDocs,
                totalPages,

                hasNextPage:
                    page < totalPages,

                hasPrevPage:
                    page > 1,
            },
        };
    }

    async getOrderById(id) {

        const order =
            await orderRepository.getById(
                id
            );

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
            !Array.isArray(
                orderData.products
            ) ||
            orderData.products.length ===
                0
        ) {

            throw new AppError(
                ERROR_TYPES.INVALID_DATA
            );
        }

        const user =
            await userRepository.getById(
                orderData.user
            );

        if (!user) {

            throw new AppError(
                ERROR_TYPES.USER_NOT_FOUND
            );
        }

        for (
            const item
            of orderData.products
        ) {

            if (
                !item.product ||
                !Number.isInteger(
                    item.quantity
                ) ||
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
            !Object.values(
                ORDER_STATUS
            ).includes(
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

    async updateOrderStatus(
        id,
        status
    ) {

        if (
            !status ||
            !Object.values(
                ORDER_STATUS
            ).includes(status)
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