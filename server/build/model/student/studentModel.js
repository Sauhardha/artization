"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const studentSchema_1 = __importDefault(require("./studentSchema"));
const Student = mongoose_1.default.model('Students', studentSchema_1.default);
exports.default = Student;
