"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_controller_1 = __importDefault(require("../../controllers/product-controller"));
const router = express_1.default.Router();
router.post('/', product_controller_1.default.postProduct);
router.get('/:id', product_controller_1.default.getProduct);
router.get('/', product_controller_1.default.getProducts);
// #swagger.start
/*
    #swagger.path = '/api/product/{id}'
    #swagger.tags = ['Product']
    #swagger.method = 'get'
    #swagger.description = '查詢產品資訊.'
    #swagger.produces = ['application/json']
*/
/*  #swagger.parameters['id'] = {
        in: 'path',
        type: 'integer',
        description: 'Product ID.'
    }
*/
/* #swagger.responses[200] = { schema: { $ref: '#/definitions/getProductById'} } */
/* #swagger.responses[404] = { description: "product is not exist" } */
// #swagger.end
// #swagger.start
/*
    #swagger.path = '/api/product/'
    #swagger.tags = ['Product']
    #swagger.method = 'get'
    #swagger.description = '查詢所有產品.'
    #swagger.produces = ['application/json']
*/
/* #swagger.responses[200] = { schema: { $ref: '#/definitions/getProducts'} } */
// #swagger.end
// #swagger.start
/*
    #swagger.path = '/api/product/'
    #swagger.tags = ['Product']
    #swagger.method = 'post'
    #swagger.description = '新增產品.'
    #swagger.produces = ['application/json']
*/
/* #swagger.parameters['body'] = {
    in: 'body',
    description: 'Product data.',
    required: true,
    schema: { $ref: '#/definitions/productBody' }
} */
/* #swagger.responses[200] = { schema: { $ref: '#/definitions/postProduct' } } */
/* #swagger.responses[400] = { description: "The request data is malformed or missing necessary information" } */
// #swagger.end
exports.default = router;
