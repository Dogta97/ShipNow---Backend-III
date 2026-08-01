import productRepository from "../repositories/product.repository.js";
import { PRODUCT_STATUS } from "../constants/index.js";

class ProductService {

    async getAllProducts() {

        const products = await productRepository.getAll();

        return products;
    }

    async getProductById(id) {

        const product = await productRepository.getById(id);

        return product;
    }

    async createProduct(productData) {

        if (productData.stock === 0) {
            productData.status = PRODUCT_STATUS.OUT_OF_STOCK;
        } else {
            productData.status = PRODUCT_STATUS.AVAILABLE;
        }

        return await productRepository.create(productData);
    }

}

export default new ProductService();