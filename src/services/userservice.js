import userRepository from "../repositories/user.repository.js";

class UserService {

    async getAllUsers() {
        return await userRepository.getAll();
    }

    async getUserById(id) {
        return await userRepository.getById(id);
    }

    async createUser(userData) {

        if (!userData.name || !userData.email) {
            throw new Error("Nombre y email son obligatorios.");
        }

        return await userRepository.create(userData);
    }

    async updateUser(id, userData) {
        return await userRepository.update(id, userData);
    }

    async deleteUser(id) {
        return await userRepository.delete(id);
    }

}

export default new UserService();