import express from 'express'
import productController from '../../controllers/product-controller'

const router = express.Router()

router.get('/:id', productController.getProduct)
router.delete('/:id', productController.removeProduct)
router.put('/:id', productController.putProduct)
router.post('/', productController.postProduct)
router.get('/', productController.getProducts)

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
/* #swagger.responses[404] = { description: "product does not exist" } */
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
// #swagger.responses[409] = { description: "product already exists" }
// #swagger.end

// #swagger.start
/*
    #swagger.path = '/api/product/{id}'
    #swagger.tags = ['Product']
    #swagger.method = 'delete'
    #swagger.description = '移除產品.'
    #swagger.produces = ['application/json']
*/
/*  #swagger.parameters['id'] = {
        in: 'path',
        type: 'integer',
        description: 'Product ID.'
    }
*/
/* #swagger.responses[200] = { schema: { $ref: '#/definitions/removeProduct' } } */
/* #swagger.responses[404] = { description: "product does not exist" } */

// #swagger.end

// #swagger.start
/*
    #swagger.path = '/api/product/{id}'
    #swagger.tags = ['Product']
    #swagger.method = 'put'
    #swagger.description = '更新產品.'
    #swagger.produces = ['application/json']
*/
/*  #swagger.parameters['id'] = {
        in: 'path',
        type: 'integer',
        description: 'Product ID.'
    }
*/
/* #swagger.parameters['body'] = {
    in: 'body',
    description: 'Product data.',
    required: true,
    schema: { $ref: '#/definitions/productBody' }
} */
/* #swagger.responses[200] = { schema: { $ref: '#/definitions/getProductById' } } */
/* #swagger.responses[400] = { description: "The request data is malformed or missing necessary information" } */
// #swagger.responses[404] = { description: "product does not exist" }
// #swager.responses[409] = { description: "product name already exists" }
// #swagger.end
export default router