import userService from "../services/userservice.js";

class UserController {

    async getAllUsers(req, res) {

        try {

            const users = await userService.getAllUsers();

            res.status(200).json(users);

        } catch (error) {

            res.status(500).json({
                message: error.message,
            });

        }

    }

    async getUserById(req, res) {

        try {

            const { id } = req.params;

            const user = await userService.getUserById(id);

            if (!user) {
                return res.status(404).json({
                    message: "Usuario no encontrado",
                });
            }

            res.status(200).json(user);

        } catch (error) {

            res.status(500).json({
                message: error.message,
            });

        }

    }

    async createUser(req, res) {

        try {

            const user = await userService.createUser(req.body);

            res.status(201).json(user);

        } catch (error) {

            res.status(400).json({
                message: error.message,
            });

        }

    }

    async updateUser(req, res) {

        try {

            const { id } = req.params;

            const user = await userService.updateUser(id, req.body);

            if (!user) {
                return res.status(404).json({
                    message: "Usuario no encontrado",
                });
            }

            res.status(200).json(user);

        } catch (error) {

            res.status(400).json({
                message: error.message,
            });

        }

    }

    async deleteUser(req, res) {

        try {

            const { id } = req.params;

            const user = await userService.deleteUser(id);

            if (!user) {
                return res.status(404).json({
                    message: "Usuario no encontrado",
                });
            }

            res.status(200).json({
                message: "Usuario eliminado correctamente.",
            });

        } catch (error) {

            res.status(500).json({
                message: error.message,
            });

        }

    }

}

export default new UserController();