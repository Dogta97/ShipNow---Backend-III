import { generateMockUsers } from "../mocks/user.mock.js";
import { generateMockDeliverers } from "../mocks/deliverer.mock.js";
import { generateMockOrders } from "../mocks/order.mock.js";
import { generateMockShipments } from "../mocks/shipment.mock.js";

import mockRepository from "../repositories/mock.repository.js";
import userRepository from "../repositories/user.repository.js";
import productRepository from "../repositories/product.repository.js";
import orderRepository from "../repositories/order.repository.js";

import AppError from "../errors/AppError.js";
import { ERROR_TYPES } from "../errors/errorDictionary.js";
import { USER_ROLES } from "../constants/index.js";

class MockService {

    validateQuantity(quantity) {

        if (!Number.isInteger(quantity) || quantity <= 0) {
            throw new AppError(ERROR_TYPES.INVALID_QUANTITY);
        }

        if (quantity > 100) {
            throw new AppError(
                ERROR_TYPES.QUANTITY_LIMIT_EXCEEDED
            );
        }

    }

    generateUsers(quantity) {

        this.validateQuantity(quantity);

        return generateMockUsers(quantity);

    }

    async createUsers(quantity) {

        this.validateQuantity(quantity);

        const users = generateMockUsers(quantity);

        try {

            return await mockRepository.createUsers(users);

        } catch (error) {

            throw new AppError(
                ERROR_TYPES.MOCK_DATABASE_ERROR
            );

        }

    }

    generateDeliverers(quantity) {

        this.validateQuantity(quantity);

        return generateMockDeliverers(quantity);

    }

    async createDeliverers(quantity) {

        this.validateQuantity(quantity);

        const deliverers =
            generateMockDeliverers(quantity);

        try {

            return await mockRepository.createDeliverers(
                deliverers
            );

        } catch (error) {

            throw new AppError(
                ERROR_TYPES.MOCK_DATABASE_ERROR
            );

        }

    }

    async generateOrders(quantity) {

        this.validateQuantity(quantity);

        const users =
            await userRepository.getAll();

        const products =
            await productRepository.getAll();

        if (users.length === 0) {
            throw new AppError(
                ERROR_TYPES.NO_USERS_AVAILABLE
            );
        }

        if (products.length === 0) {
            throw new AppError(
                ERROR_TYPES.NO_PRODUCTS_AVAILABLE
            );
        }

        return generateMockOrders(
            quantity,
            users,
            products
        );

    }

    async createOrders(quantity) {

        const orders =
            await this.generateOrders(quantity);

        try {

            return await mockRepository.createOrders(
                orders
            );

        } catch (error) {

            throw new AppError(
                ERROR_TYPES.MOCK_DATABASE_ERROR
            );

        }

    }

    async generateShipments(quantity) {

        this.validateQuantity(quantity);

        const orders =
            await orderRepository.getAll();

        const users =
            await userRepository.getAll();

        const deliverers = users.filter(
            (user) =>
                user.role === USER_ROLES.DELIVERER
        );

        if (orders.length === 0) {
            throw new AppError(
                ERROR_TYPES.NO_ORDERS_AVAILABLE
            );
        }

        if (deliverers.length === 0) {
            throw new AppError(
                ERROR_TYPES.NO_DELIVERERS_AVAILABLE
            );
        }

        return generateMockShipments(
            quantity,
            orders,
            deliverers
        );

    }

    async createShipments(quantity) {

        const shipments =
            await this.generateShipments(quantity);

        try {

            return await mockRepository.createShipments(
                shipments
            );

        } catch (error) {

            throw new AppError(
                ERROR_TYPES.MOCK_DATABASE_ERROR
            );

        }

    }

}

export default new MockService();