import express from 'express'
const router = express.Router()
import skuController from '../../controllers/sku-controller'
import { authenticated, authenticatedAdmin } from '../../middleware/auth'

router.get('/:id', authenticated, authenticatedAdmin, skuController.getSku)
router.put('/:id', authenticated, authenticatedAdmin, skuController.putSku)
router.delete('/:id', authenticated, authenticatedAdmin, skuController.removeSku)
router.get('/', authenticated, authenticatedAdmin, skuController.getSkus)
router.post('/', authenticated, authenticatedAdmin, skuController.postSku)

// #swagger.start
/*
    #swagger.path = '/api/sku/{id}'
    #swagger.tags = ['Sku']
    #swagger.method = 'get'
    #swagger.description = '查看Sku.'
    #swagger.produces = ['application/json']
*/
/* #swagger.security = [{
            "apiKeyAuth": []
    }] */
/*  #swagger.parameters['id'] = {
        in: 'path',
        type: 'integer',
        description: 'Sku ID.'
    }
*/
/* #swagger.responses[200] = { schema: { $ref: '#/definitions/getSku' } } */
/* #swagger.responses[400] = { description: "The request data is malformed or missing necessary information" } */
/* #swagger.responses[404] = { description: 'sku does not exists' } */
// #swagger.end

// #swagger.start
/*
    #swagger.path = '/api/sku/{id}'
    #swagger.tags = ['Sku']
    #swagger.method = 'put'
    #swagger.description = '修改Sku.'
    #swagger.produces = ['application/json']
*/
/* #swagger.security = [{
            "apiKeyAuth": []
    }] */
/*  #swagger.parameters['id'] = {
        in: 'path',
        type: 'integer',
        description: 'Sku ID.'
    }
*/
/* #swagger.parameters['body'] = {
    in: 'body',
    description: 'Sku data.',
    required: true,
    schema: { $ref: '#/definitions/skuPutBody' }
} */
/* #swagger.responses[200] = { schema: { $ref: '#/definitions/getSku' } } */
/* #swagger.responses[400] = { description: "The request data is malformed or missing necessary information" } */
/* #swagger.responses[404] = { description: 'sku does not exists' } */
// #swagger.end

// #swagger.start
/*
    #swagger.path = '/api/sku/{id}'
    #swagger.tags = ['Sku']
    #swagger.method = 'delete'
    #swagger.description = '刪除Sku.'
    #swagger.produces = ['application/json']
*/
/* #swagger.security = [{
            "apiKeyAuth": []
    }] */
/*  #swagger.parameters['id'] = {
        in: 'path',
        type: 'integer',
        description: 'Sku ID.'
    }
*/
/* #swagger.responses[200] = { description: "Sku removed successfully" } */
/* #swagger.responses[400] = { description: "The request data is malformed or missing necessary information" } */
/* #swagger.responses[404] = { description: 'sku does not exists' } */
// #swagger.end

// #swagger.start
/*
    #swagger.path = '/api/sku/'
    #swagger.tags = ['Sku']
    #swagger.method = 'get'
    #swagger.description = '查看所有Sku.'
    #swagger.produces = ['application/json']
*/
/* #swagger.security = [{
            "apiKeyAuth": []
    }] */
/*
    #swagger.parameters['page'] = {
        in: 'query',
        type: 'integer',
        description: 'default 1'
    }
*/
/*
    #swagger.parameters['limit'] = {
        in: 'query',
        type: 'integer',
        description: 'default 10'
    }
*/
/* #swagger.responses[200] = { schema: { $ref: '#/definitions/getSkus' } } */
/* #swagger.responses[400] = { description: "The request data is malformed or missing necessary information" } */
/* #swagger.responses[404] = { description: 'sku does not exists' } */
// #swagger.end

// #swagger.start
/*
    #swagger.path = '/api/sku/'
    #swagger.tags = ['Sku']
    #swagger.method = 'post'
    #swagger.description = '新增Sku.'
    #swagger.produces = ['application/json']
*/
/* #swagger.security = [{
            "apiKeyAuth": []
    }] */

/* #swagger.parameters['body'] = {
    in: 'body',
    description: 'Sku data.',
    required: true,
    schema: { $ref: '#/definitions/skuPutBody' }
} */
/* #swagger.responses[200] = { schema: { $ref: '#/definitions/getSku' } } */
/* #swagger.responses[400] = { description: "The request data is malformed or missing necessary information" } */
/* #swagger.responses[409] = { description: 'sku already exists' } */
// #swagger.end
export default router