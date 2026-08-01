import User from "../models/user.js";
import Order from "../models/order.js";

class MockRepository {

    async createUsers(users) {
        return await User.insertMany(users);

    }

     async createDeliverers(deliverers) {
        return await User.insertMany(deliverers);
    }

    async createOrders(orders) {
        return await Order.insertMany(orders);
    }


}

export default new MockRepository();