import mockService from "../services/mock.service.js";

class MockController {

    async generateUsers(req, res, next) {

        try {

            const quantity = req.query.quantity
                ? Number(req.query.quantity)
                : 10;

            const users =
                mockService.generateUsers(quantity);

            return res.status(200).json({
                status: "success",
                count: users.length,
                payload: users,
            });

        } catch (error) {

            next(error);

        }

    }

    async createUsers(req, res, next) {

        try {

            const quantity = req.query.quantity
                ? Number(req.query.quantity)
                : 10;

            const users =
                await mockService.createUsers(quantity);

            return res.status(201).json({
                status: "success",
                message:
                    "Usuarios de prueba creados correctamente.",
                count: users.length,
                payload: users,
            });

        } catch (error) {

            next(error);

        }

    }

    async generateDeliverers(req, res, next) {

        try {

            const quantity = req.query.quantity
                ? Number(req.query.quantity)
                : 10;

            const deliverers =
                mockService.generateDeliverers(quantity);

            return res.status(200).json({
                status: "success",
                count: deliverers.length,
                payload: deliverers,
            });

        } catch (error) {

            next(error);

        }

    }

    async createDeliverers(req, res, next) {

        try {

            const quantity = req.query.quantity
                ? Number(req.query.quantity)
                : 10;

            const deliverers =
                await mockService.createDeliverers(quantity);

            return res.status(201).json({
                status: "success",
                message:
                    "Repartidores de prueba creados correctamente.",
                count: deliverers.length,
                payload: deliverers,
            });

        } catch (error) {

            next(error);

        }

    }

    async generateOrders(req, res, next) {

        try {

            const quantity = req.query.quantity
                ? Number(req.query.quantity)
                : 10;

            const orders =
                await mockService.generateOrders(quantity);

            return res.status(200).json({
                status: "success",
                count: orders.length,
                payload: orders,
            });

        } catch (error) {

            next(error);

        }

    }

    async createOrders(req, res, next) {

        try {

            const quantity = req.query.quantity
                ? Number(req.query.quantity)
                : 10;

            const orders =
                await mockService.createOrders(quantity);

            return res.status(201).json({
                status: "success",
                message:
                    "Pedidos de prueba creados correctamente.",
                count: orders.length,
                payload: orders,
            });

        } catch (error) {

            next(error);

        }

    }

    async generateShipments(req, res, next) {

        try {

            const quantity = req.query.quantity
                ? Number(req.query.quantity)
                : 10;

            const shipments =
                await mockService.generateShipments(quantity);

            return res.status(200).json({
                status: "success",
                count: shipments.length,
                payload: shipments,
            });

        } catch (error) {

            next(error);

        }

    }

    async createShipments(req, res, next) {

        try {

            const quantity = req.query.quantity
                ? Number(req.query.quantity)
                : 10;

            const shipments =
                await mockService.createShipments(quantity);

            return res.status(201).json({
                status: "success",
                message:
                    "Envíos de prueba creados correctamente.",
                count: shipments.length,
                payload: shipments,
            });

        } catch (error) {

            next(error);

        }

    }

}

export default new MockController();