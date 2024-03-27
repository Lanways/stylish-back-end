import express from 'express'
import orderController from '../../controllers/order-controller'
import { authenticated, authenticatedAdmin } from '../../middleware/auth'
const router = express.Router()

router.get('/check/:id', orderController.checkOrder)
router.post('/encryption', orderController.orderEncryption)
router.post('/newebpay_notify', orderController.PaymentCallback)
router.post('/', authenticated, orderController.postOrder)
router.get('/', authenticated, authenticatedAdmin, orderController.getOrders)

export default router

// #swagger.start
/*
    #swagger.path = '/api/order/'
    #swagger.tags = ['Order']
    #swagger.method = 'post'
    #swagger.description = '新增訂單.'
    #swagger.produces = ['application/json']
*/

/* #swagger.security = [{
            "apiKeyAuth": []
    }] */

/*  #swagger.parameters['body'] = {
        in: 'body',
        type: 'string',
        required: true,
        schema: { $ref: '#/definitions/postOrderBody' }
    }
*/

/* #swagger.responses[200] = { schema: { $ref: '#/definitions/postOrderRes'} } */
/* #swagger.responses[409] = { description: "A similar pending order already exists" } */
// #swagger.end

// #swagger.start
/*
    #swagger.path = '/api/order/'
    #swagger.tags = ['Order']
    #swagger.method = 'get'
    #swagger.description = '查詢訂單.'
    #swagger.produces = ['application/json']
*/

/* #swagger.security = [{
            "apiKeyAuth": []
    }] */

/* #swagger.responses[200] = { schema: { $ref: '#/definitions/getOrders'} } */
/* #swagger.responses[500] = { description: "internal server error" } */
// #swagger.end