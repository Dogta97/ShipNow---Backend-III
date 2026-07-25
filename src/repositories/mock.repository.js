import User from "../models/user.js";

class MockRepository {

    async createUsers(users) {

        return await User.insertMany(users);

    }

}

export default new MockRepository();