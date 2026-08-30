import User from "../models/user.js";

class UserRepository {

    async getAll() {
        return await User.find()
            .sort({ createdAt: -1 });
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