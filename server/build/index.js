"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./config"));
const mangoDB_1 = require("./db/mangoDB");
/**
 * Initialise MongoDB
 * Then start server
 */
(0, mangoDB_1.DB)().then(() => {
    app_1.default.listen(config_1.default.PORT, () => {
        console.log(`[Server]: Server listening on port ${config_1.default.PORT}`);
    });
});
