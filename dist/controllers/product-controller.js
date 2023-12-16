"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_services_1 = __importDefault(require("../services/product-services"));
const Helpers_1 = require("../helpers/Helpers");
const productController = {
    getProducts: (req, res, next) => {
        product_services_1.default.getProducts(req, (error, data) => error ? next(error) : res.status(200).json((0, Helpers_1.ResponseData)('200', 'OK', data)));
    },
    getProduct: (req, res, next) => {
        const productId = req.params.id;
        product_services_1.default.getProduct(productId, (error, data) => error ? next(error) : res.status(200).json((0, Helpers_1.ResponseData)('200', 'OK', data)));
    },
};
exports.default = productController;
