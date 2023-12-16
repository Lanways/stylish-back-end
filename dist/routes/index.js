"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const products_1 = __importDefault(require("./modules/products"));
const error_handler_1 = require("../middleware/error-handler");
const router = express_1.default.Router();
router.use('/api/product', products_1.default);
router.use('/', error_handler_1.apiErrorHandler);
exports.default = router;
