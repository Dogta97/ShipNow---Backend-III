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

    async generateOrders(req, res) {

        try {

            const quantity = req.query.quantity
                ? Number(req.query.quantity)
                : 10;

            const orders = await mockService.generateOrders(quantity);

            return res.status(200).json({
                status: "success",
                count: orders.length,
                payload: orders,
            });

        } catch (error) {

            return res.status(400).json({
                status: "error",
                message: error.message,
            });

        }

    }

    async createOrders(req, res) {

        try {

            const quantity = req.query.quantity
                ? Number(req.query.quantity)
                : 10;

            const orders = await mockService.createOrders(quantity);

            return res.status(201).json({
                status: "success",
                message: "Pedidos de prueba creados correctamente.",
                count: orders.length,
                payload: orders,
            });

        } catch (error) {

            return res.status(400).json({
                status: "error",
                message: error.message,
            });

        }

    }

    async generateShipments(req, res) {

    try {

        const quantity = req.query.quantity
            ? Number(req.query.quantity)
            : 10;

        const shipments = await mockService.generateShipments(quantity);

        return res.status(200).json({
            status: "success",
            count: shipments.length,
            payload: shipments,
        });

    } catch (error) {

        return res.status(400).json({
            status: "error",
            message: error.message,
        });

    }

}

async createShipments(req, res) {

    try {

        const quantity = req.query.quantity
            ? Number(req.query.quantity)
            : 10;

        const shipments = await mockService.createShipments(quantity);

        return res.status(201).json({
            status: "success",
            message: "Envíos de prueba creados correctamente.",
            count: shipments.length,
            payload: shipments,
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