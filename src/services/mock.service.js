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

import logger from "../config/logger.js";

class MockService {

    validateQuantity(quantity) {

        if (!Number.isInteger(quantity) || quantity <= 0) {

            throw new AppError(
                ERROR_TYPES.INVALID_QUANTITY
            );

        }

        if (quantity > 100) {

            throw new AppError(
                ERROR_TYPES.QUANTITY_LIMIT_EXCEEDED
            );

        }

    }

    generateUsers(quantity) {

        this.validateQuantity(quantity);

        const users = generateMockUsers(quantity);

        logger.info(
            `Se generaron ${quantity} usuarios mock sin persistir.`
        );

        return users;

    }

    async createUsers(quantity) {

        this.validateQuantity(quantity);

        const users = generateMockUsers(quantity);

        try {

            const createdUsers =
                await mockRepository.createUsers(users);

            logger.info(
                `Se guardaron ${createdUsers.length} usuarios mock en MongoDB.`
            );

            return createdUsers;

        } catch (error) {

            logger.error(
                `Error al guardar usuarios mock: ${error.message}`
            );

            throw new AppError(
                ERROR_TYPES.MOCK_DATABASE_ERROR
            );

        }

    }

    generateDeliverers(quantity) {

        this.validateQuantity(quantity);

        const deliverers =
            generateMockDeliverers(quantity);

        logger.info(
            `Se generaron ${quantity} repartidores mock sin persistir.`
        );

        return deliverers;

    }

    async createDeliverers(quantity) {

        this.validateQuantity(quantity);

        const deliverers =
            generateMockDeliverers(quantity);

        try {

            const createdDeliverers =
                await mockRepository.createDeliverers(
                    deliverers
                );

            logger.info(
                `Se guardaron ${createdDeliverers.length} repartidores mock en MongoDB.`
            );

            return createdDeliverers;

        } catch (error) {

            logger.error(
                `Error al guardar repartidores mock: ${error.message}`
            );

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

        const orders = generateMockOrders(
            quantity,
            users,
            products
        );

        logger.info(
            `Se generaron ${quantity} pedidos mock sin persistir.`
        );

        return orders;

    }

    async createOrders(quantity) {

        const orders =
            await this.generateOrders(quantity);

        try {

            const createdOrders =
                await mockRepository.createOrders(
                    orders
                );

            logger.info(
                `Se guardaron ${createdOrders.length} pedidos mock en MongoDB.`
            );

            return createdOrders;

        } catch (error) {

            logger.error(
                `Error al guardar pedidos mock: ${error.message}`
            );

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

        const shipments = generateMockShipments(
            quantity,
            orders,
            deliverers
        );

        logger.info(
            `Se generaron ${quantity} envíos mock sin persistir.`
        );

        return shipments;

    }

    async createShipments(quantity) {

        const shipments =
            await this.generateShipments(quantity);

        try {

            const createdShipments =
                await mockRepository.createShipments(
                    shipments
                );

            logger.info(
                `Se guardaron ${createdShipments.length} envíos mock en MongoDB.`
            );

            return createdShipments;

        } catch (error) {

            logger.error(
                `Error al guardar envíos mock: ${error.message}`
            );

            throw new AppError(
                ERROR_TYPES.MOCK_DATABASE_ERROR
            );

        }

    }

}

export default new MockService();