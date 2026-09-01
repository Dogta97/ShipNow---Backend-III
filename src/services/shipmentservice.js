import shipmentRepository from "../repositories/shipmentrepository.js";

import AppError from "../errors/AppError.js";

import { ERROR_TYPES } from "../errors/errorDictionary.js";

import {
    SHIPMENT_STATUS,
} from "../constants/index.js";

class ShipmentService {

    async getAllShipments(
        query = {}
    ) {

        const page =
            Number(query.page) || 1;

        const limit =
            Number(query.limit) || 10;

        const {
            status,
        } = query;

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
                SHIPMENT_STATUS
            ).includes(status)
        ) {

            throw new AppError(
                ERROR_TYPES.INVALID_STATUS
            );
        }

        const {
            shipments,
            totalDocs,
        } =
            await shipmentRepository.getAll({
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

            payload: shipments,

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

    async getShipmentById(id) {

        const shipment =
            await shipmentRepository.getById(
                id
            );

        if (!shipment) {

            throw new AppError(
                ERROR_TYPES.SHIPMENT_NOT_FOUND
            );
        }

        return shipment;
    }

    async createShipment(
        shipmentData
    ) {

        if (
            !shipmentData.trackingNumber ||
            !shipmentData.origin ||
            !shipmentData.destination
        ) {

            throw new AppError(
                ERROR_TYPES.INVALID_DATA
            );
        }

        const shipmentExists =
            await shipmentRepository.getByTrackingNumber(
                shipmentData.trackingNumber
            );

        if (shipmentExists) {

            throw new AppError(
                ERROR_TYPES.TRACKING_NUMBER_ALREADY_EXISTS
            );
        }

        return await shipmentRepository.create(
            shipmentData
        );
    }

    async updateShipment(
        id,
        shipmentData
    ) {

        const shipment =
            await shipmentRepository.update(
                id,
                shipmentData
            );

        if (!shipment) {

            throw new AppError(
                ERROR_TYPES.SHIPMENT_NOT_FOUND
            );
        }

        return shipment;
    }

    async deleteShipment(id) {

        const shipment =
            await shipmentRepository.delete(
                id
            );

        if (!shipment) {

            throw new AppError(
                ERROR_TYPES.SHIPMENT_NOT_FOUND
            );
        }

        return shipment;
    }
}

export default new ShipmentService();