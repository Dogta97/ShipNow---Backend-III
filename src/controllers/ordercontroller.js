import orderService from "../services/orderservice.js";

class OrderController {

    async getAllOrders(req, res, next) {
        try {

            const orders =
                await orderService.getAllOrders();

            res.status(200).json(orders);

        } catch (error) {
            next(error);
        }
    }

    async getOrderById(req, res, next) {
        try {

            const { id } = req.params;

            const order =
                await orderService.getOrderById(id);

            res.status(200).json(order);

        } catch (error) {
            next(error);
        }
    }

    async createOrder(req, res, next) {
        try {

            const order =
                await orderService.createOrder(
                    req.body
                );

            res.status(201).json(order);

        } catch (error) {
            next(error);
        }
    }

    async updateOrderStatus(req, res, next) {
        try {

            const { id } = req.params;
            const { status } = req.body;

            const order =
                await orderService.updateOrderStatus(
                    id,
                    status
                );

            res.status(200).json(order);

        } catch (error) {
            next(error);
        }
    }
}

export default new OrderController();