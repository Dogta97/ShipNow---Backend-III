import Product from "../models/product.js";

class ProductRepository {

    async getAll({
        page = 1,
        limit = 10,
        status
    }) {

        const filter = {};

        if (status) {
            filter.status = status;
        }

        const skip = (page - 1) * limit;

        const [products, totalDocs] =
            await Promise.all([

                Product.find(filter)
                    .sort({ createdAt: -1 })
                    .skip(skip)
                    .limit(limit),

                Product.countDocuments(filter),
            ]);

        return {
            products,
            totalDocs,
        };
    }

    async getById(id) {

        return await Product.findById(id);
    }

    async create(productData) {

        return await Product.create(
            productData
        );
    }
}

export default new ProductRepository();