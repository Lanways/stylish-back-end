import express from 'express'
import shippingFeeController from '../../controllers/shippingFee-controller'

const router = express.Router()

router.get('/', shippingFeeController.getShippingFee)

export default router

// #swagger.start
/*
    #swagger.path = '/api/shippingFee/'
    #swagger.tags = ['ShippingFee']
    #swagger.method = 'get'
    #swagger.description = '查詢運輸費用.'
    #swagger.produces = ['application/json']
*/
/*  #swagger.parameters['country'] = {
        in: 'query',
        type: 'string',
    }
*/
/*  #swagger.parameters['paymentMethod'] = {
        in: 'query',
        type: 'string',
    }
*/
/*  #swagger.parameters['shippingMethod'] = {
        in: 'query',
        type: 'string',
    }
*/
/* #swagger.responses[200] = { schema: { $ref: '#/definitions/getProductById'} } */
/* #swagger.responses[500] = { description: "internal Server Error" } */
// #swagger.end