"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const configSchema = joi_1.default.object({
    PORT: joi_1.default.number().required().default(8080),
    URI: joi_1.default.string().uri().required(),
});
const CONFIG_DIR = process.env.CONFIG_DIR || '/app/var/secrets';
const fileName = 'server';
const filePath = path_1.default.join(CONFIG_DIR, `${fileName}.json`);
const jsonData = JSON.parse(fs_1.default.readFileSync(filePath, 'utf8'));
const { error, value } = configSchema.validate(jsonData);
if (error) {
    throw new Error(`Configuration for ${name} did not conform to schema:${JSON.stringify(error, null, 2)}`);
}
console.log(filePath, JSON.stringify(value));
exports.default = value;
