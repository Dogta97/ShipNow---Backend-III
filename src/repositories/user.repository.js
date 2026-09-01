import User from "../models/user.js";

class UserRepository {

    async getAll({
        page = 1,
        limit = 10,
        role,
    }) {

        const filter = {};

        if (role) {
            filter.role = role;
        }

        const skip =
            (page - 1) * limit;

        const [
            users,
            totalDocs,
        ] = await Promise.all([

            User.find(filter)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit),

            User.countDocuments(filter),

        ]);

        return {
            users,
            totalDocs,
        };
    }

    async getById(id) {

        return await User.findById(id);
    }

    async create(userData) {

        return await User.create(
            userData
        );
    }

    async update(
        id,
        userData
    ) {

        return await User.findByIdAndUpdate(
            id,
            userData,
            {
                returnDocument: "after",
                runValidators: true,
            }
        );
    }

    async delete(id) {

        return await User.findByIdAndDelete(
            id
        );
    }

    async addDocument(
        id,
        documentMetadata
    ) {

        return await User.findByIdAndUpdate(
            id,
            {
                $push: {
                    documents:
                        documentMetadata,
                },
            },
            {
                returnDocument: "after",
                runValidators: true,
            }
        );
    }
}

export default new UserRepository();