import productService from "../services/productservice.js";

class ProductController {

    async getAllProducts(req, res, next) {

        try {

            const products =
                await productService.getAllProducts();

            res.status(200).json(products);

        } catch (error) {

            next(error);

        }

    }

    async getProductById(req, res, next) {

        try {

            const { id } = req.params;

            const product =
                await productService.getProductById(id);

            res.status(200).json(product);

        } catch (error) {

            next(error);

        }

    }

    async createProduct(req, res, next) {

        try {

            const product =
                await productService.createProduct(req.body);

            res.status(201).json(product);

        } catch (error) {

            next(error);

        }

    }

}

export default new ProductController();