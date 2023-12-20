"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = __importDefault(require("../db/models"));
const error_handler_1 = require("../middleware/error-handler");
const prodcutServices = {
    getProducts: (req, cb) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const products = yield models_1.default.Product.findAll();
            return cb(null, products);
        }
        catch (error) {
            if (error instanceof Error) {
                cb(error);
            }
        }
    }),
    getProduct: (productId, cb) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const product = yield models_1.default.Product.findByPk(productId);
            if (!product) {
                return cb(new Error('product is not exist'));
            }
            return cb(null, product);
        }
        catch (error) {
            if (error instanceof Error) {
                cb(error);
            }
        }
    }),
    postProduct: (name, price, image, sizeOptions, quantity, description, additionalImage, cb) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const product = yield models_1.default.Product.findOne({
                where: { name }
            });
            if (product)
                cb(new error_handler_1.CustomError('product is exist', 409));
            const createdProduct = yield models_1.default.Product.create({
                name,
                price,
                image,
                sizeOptions,
                quantity,
                description,
                additionalImage,
            });
            return cb(null, createdProduct);
        }
        catch (error) {
            if (error instanceof Error) {
                cb(error);
            }
        }
    })
};
exports.default = prodcutServices;
