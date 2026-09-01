import productRepository from "../repositories/product.repository.js";

import { PRODUCT_STATUS } from "../constants/index.js";

import AppError from "../errors/AppError.js";

import { ERROR_TYPES } from "../errors/errorDictionary.js";

class ProductService {

    async getAllProducts(
        query = {}
    ) {

        const page =
            Number(query.page) || 1;

        const limit =
            Number(query.limit) || 10;

        const { status } = query;

        if (
            !Number.isInteger(page) ||
            page <= 0
        ) {
            throw new AppError(
                ERROR_TYPES.INVALID_DATA
            );
        }

        if (
            !Number.isInteger(limit) ||
            limit <= 0 ||
            limit > 100
        ) {
            throw new AppError(
                ERROR_TYPES.INVALID_DATA
            );
        }

        if (
            status &&
            !Object.values(
                PRODUCT_STATUS
            ).includes(status)
        ) {
            throw new AppError(
                ERROR_TYPES.INVALID_DATA
            );
        }

        const {
            products,
            totalDocs,
        } =
            await productRepository.getAll({
                page,
                limit,
                status,
            });

        const totalPages =
            Math.ceil(
                totalDocs / limit
            );

        return {
            status: "success",

            payload: products,

            pagination: {
                page,
                limit,
                totalDocs,
                totalPages,

                hasNextPage:
                    page < totalPages,

                hasPrevPage:
                    page > 1,
            },
        };
    }

    async getProductById(id) {

        const product =
            await productRepository.getById(
                id
            );

        if (!product) {
            throw new AppError(
                ERROR_TYPES.PRODUCT_NOT_FOUND
            );
        }

        return product;
    }

    async createProduct(productData) {

        if (
            !productData.name ||
            !productData.name.trim() ||
            !productData.description ||
            !productData.description.trim() ||
            productData.price === undefined ||
            productData.stock === undefined
        ) {
            throw new AppError(
                ERROR_TYPES.INVALID_PRODUCT_DATA
            );
        }

        if (
            typeof productData.price !==
                "number" ||
            productData.price < 0
        ) {
            throw new AppError(
                ERROR_TYPES.INVALID_PRODUCT_DATA
            );
        }

        if (
            !Number.isInteger(
                productData.stock
            ) ||
            productData.stock < 0
        ) {
            throw new AppError(
                ERROR_TYPES.INVALID_PRODUCT_DATA
            );
        }

        if (productData.stock === 0) {

            productData.status =
                PRODUCT_STATUS.OUT_OF_STOCK;

        } else {

            productData.status =
                PRODUCT_STATUS.AVAILABLE;
        }

        return await productRepository.create(
            productData
        );
    }
}

export default new ProductService();