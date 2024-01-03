import express from "express";
import categoryController from "../../controllers/category-controller";
const router = express.Router()

router.get('/:id', categoryController.getCategory)
router.put('/:id', categoryController.putCategory)
router.delete('/:id', categoryController.removeCategory)
router.get('/', categoryController.getCategories)
router.post('/', categoryController.postCategory)

// #swagger.start
/*
    #swagger.path = '/api/category/{id}'
    #swagger.tags = ['Category']
    #swagger.method = 'get'
    #swagger.description = '查詢類別資訊.'
    #swagger.produces = ['application/json']
*/
/*  #swagger.parameters['id'] = {
        in: 'path',
        type: 'integer',
        description: 'Category ID.'
    }
*/
/* #swagger.responses[200] = { schema: { $ref: '#/definitions/getCategoryById'} } */
/* #swagger.responses[404] = { description: "category does not exist" } */
// #swagger.end

// #swagger.start
/*
    #swagger.path = '/api/category/'
    #swagger.tags = ['Category']
    #swagger.method = 'get'
    #swagger.description = '查詢所有類別.'
    #swagger.produces = ['application/json']
*/
/* #swagger.responses[200] = { schema: { $ref: '#/definitions/getCategories'} } */
// #swagger.end

// #swagger.start
/*
    #swagger.path = '/api/category/'
    #swagger.tags = ['Category']
    #swagger.method = 'post'
    #swagger.description = '新增類別.'
    #swagger.produces = ['application/json']
*/
/* #swagger.parameters['body'] = {
    in: 'body',
    description: 'Category data.',
    required: true,
    schema: { $ref: '#/definitions/categoryBody' }
} */
/* #swagger.responses[200] = { schema: { $ref: '#/definitions/postCategory' } } */
/* #swagger.responses[400] = { description: "The request data is malformed or missing necessary information" } */
// #swagger.responses[409] = { description: "category does exist" }
// #swagger.end

// #swagger.start
/*
    #swagger.path = '/api/category/{id}'
    #swagger.tags = ['Category']
    #swagger.method = 'put'
    #swagger.description = '修改類別.'
    #swagger.produces = ['application/json']
*/
/* #swagger.parameters['body'] = {
    in: 'body',
    description: 'Category data.',
    required: true,
    schema: { $ref: '#/definitions/categoryBody' }
} */
/*  #swagger.parameters['id'] = {
        in: 'path',
        type: 'integer',
        description: 'Category ID.'
    }
*/
/* #swagger.responses[200] = { schema: { $ref: '#/definitions/postCategory' } } */
/* #swagger.responses[400] = { description: "The request data is malformed or missing necessary information" } */
// #swagger.responses[409] = { description: "category does exist" }
// #swagger.responses[404] = { description: "category does not exist" }
// #swagger.end

// #swagger.start
/*
    #swagger.path = '/api/category/{id}'
    #swagger.tags = ['Category']
    #swagger.method = 'delete'
    #swagger.description = '刪除類別.'
    #swagger.produces = ['application/json']
*/
/* #swagger.parameters['id'] = {
    in: 'path',
    type: 'integer',
    description: 'Category ID.'
} */
/* #swagger.responses[200] = { schema: { $ref: '#/definitions/getCategoryById' } } */
/* #swagger.responses[400] = { description: "The request data is malformed or missing necessary information" } */
// #swagger.responses[404] = { description: "category does not exist" }
// #swagger.responses[500] = { description: "category not found" }
// #swagger.end
export default router