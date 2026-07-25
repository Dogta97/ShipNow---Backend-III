import { generateMockUsers } from "../mocks/user.mock.js";
import { generateMockDeliverers } from "../mocks/deliverer.mock.js";
import mockRepository from "../repositories/mock.repository.js";

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

}

export default new MockService();