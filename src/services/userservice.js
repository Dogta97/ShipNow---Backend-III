import userRepository from "../repositories/user.repository.js";

import AppError from "../errors/AppError.js";

import { ERROR_TYPES } from "../errors/errorDictionary.js";

import { USER_ROLES } from "../constants/index.js";

class UserService {

    async getAllUsers(query = {}) {

        const page =
            Number(query.page) || 1;

        const limit =
            Number(query.limit) || 10;

        const { role } = query;

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
            role &&
            !Object.values(
                USER_ROLES
            ).includes(role)
        ) {
            throw new AppError(
                ERROR_TYPES.INVALID_DATA
            );
        }

        const {
            users,
            totalDocs,
        } =
            await userRepository.getAll({
                page,
                limit,
                role,
            });

        const totalPages =
            Math.ceil(
                totalDocs / limit
            );

        return {

            status: "success",

            payload: users,

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

        if (
            !userData.name ||
            !userData.email
        ) {

            throw new AppError(
                ERROR_TYPES.INVALID_DATA
            );
        }

        return await userRepository.create(
            userData
        );
    }

    async updateUser(
        id,
        userData
    ) {

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
            await userRepository.delete(
                id
            );

        if (!user) {

            throw new AppError(
                ERROR_TYPES.USER_NOT_FOUND
            );
        }

        return user;
    }
}

export default new UserService();