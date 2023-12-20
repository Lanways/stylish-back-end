"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_services_1 = __importDefault(require("../services/product-services"));
const Helpers_1 = require("../helpers/Helpers");
const productSchema_1 = require("../schemas/productSchema");
const productController = {
    getProducts: (req, res, next) => {
        product_services_1.default.getProducts(req, (error, data) => error ? next(error) : res.status(200).json((0, Helpers_1.ResponseData)('200', 'OK', data)));
    },
    getProduct: (req, res, next) => {
        const productId = req.params.id;
        product_services_1.default.getProduct(productId, (error, data) => error ? next(error) : res.status(200).json((0, Helpers_1.ResponseData)('200', 'OK', data)));
    },
    postProduct: (req, res, next) => {
        const { error, value } = productSchema_1.productSchema.validate(req.body);
        if (error) {
            return res.status(400).json((0, Helpers_1.ResponseData)('400', error.details[0].message, null));
        }
        const { name, price, image, sizeOptions, quantity, description, additionalImage } = value;
        product_services_1.default.postProduct(name, price, image, sizeOptions, quantity, description, additionalImage, (error, data) => error ? next(error) : res.status(200).json((0, Helpers_1.ResponseData)('200', 'OK', data)));
    }
};
exports.default = productController;
