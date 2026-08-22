import userService from "../services/userservice.js";

class UserController {

    async getAllUsers(req, res, next) {

        try {

            const users = await userService.getAllUsers();

            res.status(200).json(users);

        } catch (error) {

            next(error);

        }

    }

    async getUserById(req, res, next) {

        try {

            const { id } = req.params;

            const user = await userService.getUserById(id);

            res.status(200).json(user);

        } catch (error) {

            next(error);

        }

    }

    async createUser(req, res, next) {

        try {

            const user = await userService.createUser(req.body);

            res.status(201).json(user);

        } catch (error) {

            next(error);

        }

    }

    async updateUser(req, res, next) {

        try {

            const { id } = req.params;

            const user = await userService.updateUser(id, req.body);

            res.status(200).json(user);

        } catch (error) {

            next(error);

        }

    }

    async deleteUser(req, res, next) {

        try {

            const { id } = req.params;

            await userService.deleteUser(id);

            res.status(200).json({
                message: "Usuario eliminado correctamente.",
            });

        } catch (error) {

            next(error);

        }

    }

}

export default new UserController();