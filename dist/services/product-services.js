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
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../db/models");
const prodcutServices = {
    getProducts: (req, cb) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const products = yield models_1.Product.findAll();
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
            const product = yield models_1.Product.findByPk(productId);
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
    })
};
exports.default = prodcutServices;
