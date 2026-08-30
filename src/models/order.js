import mongoose from "mongoose";
import {
    ORDER_PRIORITY,
    ORDER_STATUS,
} from "../constants/index.js";

const receiptSchema = new mongoose.Schema(
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

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        products: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },

                quantity: {
                    type: Number,
                    required: true,
                    min: 1,
                },
            },
        ],

        status: {
            type: String,
            enum: Object.values(ORDER_STATUS),
            default: ORDER_STATUS.PENDING,
        },

        priority: {
            type: String,
            enum: Object.values(ORDER_PRIORITY),
            default: ORDER_PRIORITY.NORMAL,
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

const Order = mongoose.model("Order", orderSchema);

export default Order;