import mongoose from "mongoose";

import {
    SHIPMENT_STATUS,
} from "../constants/index.js";

const receiptSchema =
    new mongoose.Schema(
        {
            originalName: {
                type: String,
                required: true,
            },

            filename: {
                type: String,
                required: true,
            },

            path: {
                type: String,
                required: true,
            },

            mimetype: {
                type: String,
                required: true,
            },

            size: {
                type: Number,
                required: true,
            },

            documentType: {
                type: String,
                default: "RECEIPT",
            },

            uploadedAt: {
                type: Date,
                default: Date.now,
            },
        },
        {
            _id: false,
        }
    );

const shipmentSchema =
    new mongoose.Schema(
        {
            trackingNumber: {
                type: String,
                required: true,
                unique: true,
                trim: true,
            },

            order: {
                type:
                    mongoose.Schema.Types.ObjectId,
                ref: "Order",
                required: true,
            },

            deliverer: {
                type:
                    mongoose.Schema.Types.ObjectId,
                ref: "User",
                default: null,
            },

            origin: {
                type: String,
                required: true,
                trim: true,
            },

            destination: {
                type: String,
                required: true,
                trim: true,
            },

            weight: {
                type: Number,
                required: true,
                min: 0,
            },

            status: {
                type: String,
                enum:
                    Object.values(
                        SHIPMENT_STATUS
                    ),
                default:
                    SHIPMENT_STATUS.PENDING,
            },

            receipt: {
                type: receiptSchema,
                default: null,
            },
        },
        {
            timestamps: true,
        }
    );

const Shipment =
    mongoose.model(
        "Shipment",
        shipmentSchema
    );

export default Shipment;