"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const paintingSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "Painting name is required"]
    },
    image: {
        type: File,
        required: [true, "Paiting image is required"]
    }
}, {
    timestamps: true
});
exports.default = paintingSchema;
