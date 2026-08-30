import mongoose from "mongoose";
import { USER_ROLES } from "../constants/index.js";

const documentSchema = new mongoose.Schema(
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
            required: true,
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

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        role: {
            type: String,
            enum: Object.values(USER_ROLES),
            default: USER_ROLES.USER,
        },

        documents: {
            type: [documentSchema],
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);

export default User;