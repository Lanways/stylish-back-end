import express from 'express'
import cartItemController from '../../controllers/cartItem-controller'
const router = express.Router()
import { authenticated } from '../../middleware/auth'
router.put('/:id', authenticated, cartItemController.putCartItem)
router.delete('/:id', authenticated, cartItemController.removeCartItem)
router.post('/', authenticated, cartItemController.postCartItem)

// #swagger.start
/*
    #swagger.path = '/api/cartItem/{id}'
    #swagger.tags = ['CartItem']
    #swagger.method = 'put'
    #swagger.description = '修改購物車物品.'
    #swagger.produces = ['application/json']
*/
/* #swagger.security = [{
            "apiKeyAuth": []
    }] */
/*  #swagger.parameters['id'] = {
        in: 'path',
        type: 'integer',
        description: 'CartItem ID.'
    }
*/
/* #swagger.parameters['body'] = {
    in: 'body',
    description: 'CartItem data.',
    required: true,
    schema: { $ref: '#/definitions/putCartItemBody' }
} */
/* #swagger.responses[200] = { schema: { $ref: '#/definitions/putCartItemRes' } } */
/* #swagger.responses[400] = { description: "The request data is malformed or missing necessary information" } */
/* #swagger.responses[404] = { description: 'CartItem not found or does not belong to the user' } */
// #swagger.end

// #swagger.start
/*
    #swagger.path = '/api/cartItem/{id}'
    #swagger.tags = ['CartItem']
    #swagger.method = 'delete'
    #swagger.description = '刪除購物車物品.'
    #swagger.produces = ['application/json']
*/
/* #swagger.security = [{
            "apiKeyAuth": []
    }] */
/*  #swagger.parameters['id'] = {
        in: 'path',
        type: 'integer',
        description: 'CartItem ID.'
    }
*/
/* #swagger.responses[200] = { description: 'CartItem removed successfully' } */
/* #swagger.responses[400] = { description: "The request data is malformed or missing necessary information" } */
/* #swagger.responses[404] = { description: 'CartItem not found or does not belong to the user' } */
// #swagger.end

// #swagger.start
/*
    #swagger.path = '/api/cartItem/'
    #swagger.tags = ['CartItem']
    #swagger.method = 'post'
    #swagger.description = '新增購物車物品.'
    #swagger.produces = ['application/json']
*/
/* #swagger.security = [{
            "apiKeyAuth": []
    }] */
/* #swagger.parameters['body'] = {
    in: 'body',
    description: 'CartItem data.',
    required: true,
    schema: { $ref: '#/definitions/postCartItemBody' }
} */
/* #swagger.responses[200] = { schema: { $ref: '#/definitions/postCartItemRes' } } */
/* #swagger.responses[400] = { description: "The request data is malformed or missing necessary information" } */
/* #swagger.responses[404] = { description: 'product does not exist' } */
// #swagger.end
export default router