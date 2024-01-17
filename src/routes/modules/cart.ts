import express from 'express'
const router = express.Router()
import cartController from '../../controllers/cart-controller'
import { authenticated } from '../../middleware/auth'

router.post('/', authenticated, cartController.postCart)
router.get('/', authenticated, cartController.getCart)
// #swagger.start
/*
    #swagger.path = '/api/cart/'
    #swagger.tags = ['Cart']
    #swagger.method = 'post'
    #swagger.description = '新增購屋車.'
    #swagger.produces = ['application/json']
*/
/* #swagger.security = [{
            "apiKeyAuth": []
    }] */

/* #swagger.responses[200] = { schema: { $ref: '#/definitions/getCart' } } */
/* #swagger.responses[400] = { description: "User already has a cart" } */
// #swagger.responses[404] = { description: "user does not exist" }
// #swagger.end

// #swagger.start
/*
    #swagger.path = '/api/cart/'
    #swagger.tags = ['Cart']
    #swagger.method = 'get'
    #swagger.description = '查詢購屋車.'
    #swagger.produces = ['application/json']
*/
/* #swagger.security = [{
            "apiKeyAuth": []
    }] */

/* #swagger.responses[200] = { schema: { $ref: '#/definitions/getCart' } } */
/* #swagger.responses[400] = { description: "The request data is malformed or missing necessary information" } */
// #swagger.end
export default router