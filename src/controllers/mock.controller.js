import mockService from "../services/mock.service.js";

class MockController {

    async generateUsers(req, res) {

        try {

            const quantity = req.query.quantity
                ? Number(req.query.quantity)
                : 10;

            const users = mockService.generateUsers(quantity);

            return res.status(200).json({
                status: "success",
                count: users.length,
                payload: users,
            });

        } catch (error) {

            return res.status(400).json({
                status: "error",
                message: error.message,
            });

        }

    }

    async createUsers(req, res) {

        try {

            const quantity = req.query.quantity
                ? Number(req.query.quantity)
                : 10;

            const users = await mockService.createUsers(quantity);

            return res.status(201).json({
                status: "success",
                message: "Usuarios de prueba creados correctamente.",
                count: users.length,
                payload: users,
            });

        } catch (error) {

            return res.status(400).json({
                status: "error",
                message: error.message,
            });

        }

    }

    async generateDeliverers(req, res) {

        try {

            const quantity = req.query.quantity
                ? Number(req.query.quantity)
                : 10;

            const deliverers = mockService.generateDeliverers(quantity);

            return res.status(200).json({
                status: "success",
                count: deliverers.length,
                payload: deliverers,
            });

        } catch (error) {

            return res.status(400).json({
                status: "error",
                message: error.message,
            });

        }

    }

    async createDeliverers(req, res) {

        try {

            const quantity = req.query.quantity
                ? Number(req.query.quantity)
                : 10;

            const deliverers = await mockService.createDeliverers(quantity);

            return res.status(201).json({
                status: "success",
                message: "Repartidores de prueba creados correctamente.",
                count: deliverers.length,
                payload: deliverers,
            });

        } catch (error) {

            return res.status(400).json({
                status: "error",
                message: error.message,
            });

        }

    }

}

export default new MockController();