import Product from "../models/product.js";

class ProductRepository {

    async getAll() {
        return await Product.find()
            .sort({ createdAt: -1 });
    }

    async getById(id) {
        return await Product.findById(id);
    }

    async create(productData) {
        return await Product.create(productData);
    }

}

export default new ProductRepository();