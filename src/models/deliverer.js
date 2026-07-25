import mongoose from "mongoose";

const delivererSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },

        vehicle: {
            type: String,
            required: true,
            trim: true,
        },

        available: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

const Deliverer = mongoose.model("Deliverer", delivererSchema);

export default Deliverer;