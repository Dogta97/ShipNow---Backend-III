import productService from "../services/productservice.js";

class ProductController {

    async getAllProducts(req, res) {

        try {

            const products = await productService.getAllProducts();

            res.status(200).json(products);

        } catch (error) {

            res.status(500).json({
                message: error.message
            });

        }

    }

    async getProductById(req, res) {

        try {

            const { id } = req.params;

            const product = await productService.getProductById(id);

            if (!product) {
                return res.status(404).json({
                    message: "Producto no encontrado"
                });
            }

            res.status(200).json(product);

        } catch (error) {

            res.status(500).json({
                message: error.message
            });

        }

    }

    async createProduct(req, res) {

        try {

            const product = await productService.createProduct(req.body);

            res.status(201).json(product);

        } catch (error) {

            res.status(500).json({
                message: error.message
            });

        }

    }

}

export default new ProductController();