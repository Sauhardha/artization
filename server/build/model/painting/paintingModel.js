"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const paintingSchema_1 = __importDefault(require("./paintingSchema"));
const Painting = mongoose_1.default.model('Paintings', paintingSchema_1.default);
exports.default = Painting;
