import { generateMockUsers } from "../mocks/user.mock.js";
import { generateMockDeliverers } from "../mocks/deliverer.mock.js";
import { generateMockOrders } from "../mocks/order.mock.js";

import mockRepository from "../repositories/mock.repository.js";
import userRepository from "../repositories/user.repository.js";
import productRepository from "../repositories/product.repository.js";

class MockService {

    generateUsers(quantity) {

        if (!Number.isInteger(quantity) || quantity <= 0) {
            throw new Error("La cantidad debe ser un número entero mayor a 0.");
        }

        if (quantity > 100) {
            throw new Error("La cantidad máxima de usuarios a generar es 100.");
        }

        return generateMockUsers(quantity);

    }

    async createUsers(quantity) {

        if (!Number.isInteger(quantity) || quantity <= 0) {
            throw new Error("La cantidad debe ser un número entero mayor a 0.");
        }

        if (quantity > 100) {
            throw new Error("La cantidad máxima de usuarios a generar es 100.");
        }

        const users = generateMockUsers(quantity);

        return await mockRepository.createUsers(users);

    }

    generateDeliverers(quantity) {

        if (!Number.isInteger(quantity) || quantity <= 0) {
            throw new Error("La cantidad debe ser un número entero mayor a 0.");
        }

        if (quantity > 100) {
            throw new Error("La cantidad máxima de repartidores a generar es 100.");
        }

        return generateMockDeliverers(quantity);

    }

    async createDeliverers(quantity) {

        if (!Number.isInteger(quantity) || quantity <= 0) {
            throw new Error("La cantidad debe ser un número entero mayor a 0.");
        }

        if (quantity > 100) {
            throw new Error("La cantidad máxima de repartidores a generar es 100.");
        }

        const deliverers = generateMockDeliverers(quantity);

        return await mockRepository.createDeliverers(deliverers);

    }

    async generateOrders(quantity) {

        if (!Number.isInteger(quantity) || quantity <= 0) {
            throw new Error("La cantidad debe ser un número entero mayor a 0.");
        }

        if (quantity > 100) {
            throw new Error("La cantidad máxima de pedidos a generar es 100.");
        }

        const users = await userRepository.getAll();
        const products = await productRepository.getAll();

        if (users.length === 0) {
            throw new Error(
                "No hay usuarios cargados en la base de datos."
            );
        }

        if (products.length === 0) {
            throw new Error(
                "No hay productos cargados en la base de datos."
            );
        }

        return generateMockOrders(
            quantity,
            users,
            products
        );

    }

    async createOrders(quantity) {

        const orders = await this.generateOrders(quantity);

        return await mockRepository.createOrders(orders);

    }

}

export default new MockService();