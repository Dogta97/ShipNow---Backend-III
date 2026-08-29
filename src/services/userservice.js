import userRepository from "../repositories/user.repository.js";

import AppError from "../errors/AppError.js";
import { ERROR_TYPES } from "../errors/errorDictionary.js";

class UserService {

    async getAllUsers() {

        return await userRepository.getAll();

    }

    async getUserById(id) {

        const user =
            await userRepository.getById(id);

        if (!user) {
            throw new AppError(
                ERROR_TYPES.USER_NOT_FOUND
            );
        }

        return user;

    }

    async createUser(userData) {

        if (!userData.name || !userData.email) {
            throw new AppError(
                ERROR_TYPES.INVALID_DATA
            );
        }

        return await userRepository.create(userData);

    }

    async updateUser(id, userData) {

        const user =
            await userRepository.update(
                id,
                userData
            );

        if (!user) {
            throw new AppError(
                ERROR_TYPES.USER_NOT_FOUND
            );
        }

        return user;

    }

    async deleteUser(id) {

        const user =
            await userRepository.delete(id);

        if (!user) {
            throw new AppError(
                ERROR_TYPES.USER_NOT_FOUND
            );
        }

        return user;

    }

}

export default new UserService();