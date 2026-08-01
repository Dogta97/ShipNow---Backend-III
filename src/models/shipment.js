import mongoose from "mongoose";
import { SHIPMENT_STATUS } from "../constants/index.js";

const shipmentSchema = new mongoose.Schema(
    {
        trackingNumber: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        order: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order",
            required: true,
        },

        deliverer: {
            type: mongoose.Schema.Types.ObjectId,
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
            enum: Object.values(SHIPMENT_STATUS),
            default: SHIPMENT_STATUS.PENDING,
        },
    },
    {
        timestamps: true,
    }
);

const Shipment = mongoose.model("Shipment", shipmentSchema);

export default Shipment;