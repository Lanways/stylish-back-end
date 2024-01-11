import express from "express"
import userController from "../../controllers/user-controller"
import passport from "passport"
import { authenticatedAdmin, authenticated } from "../../middleware/auth"

const router = express.Router()

router.post('/signup', userController.signUp)
router.post('/signin', passport.authenticate('local', { session: false }),
    userController.signIn)
router.get('/:id', userController.getUser)
router.put('/:id', authenticated, userController.putUser)
router.delete('/:id', authenticated, authenticatedAdmin, userController.removeUser)
router.get('/', authenticated, authenticatedAdmin, userController.getUsers)

// #swagger.start
/*
    #swagger.path = '/api/user/signup'
    #swagger.tags = ['User']
    #swagger.method = 'post'
    #swagger.description = '新增使用者.'
    #swagger.produces = ['application/json']
*/
/* #swagger.parameters['body'] = {
    in: 'body',
    description: 'User data.',
    required: true,
    schema: { $ref: '#/definitions/userBody' }
} */
/* #swagger.responses[200] = { schema: { $ref: '#/definitions/signUp' } } */
/* #swagger.responses[400] = { description: "The request data is malformed or missing necessary information" } */
// #swagger.responses[409] = { description: "user already exists" }
// #swagger.end

// #swagger.start
/*
    #swagger.path = '/api/user/signin'
    #swagger.tags = ['User']
    #swagger.method = 'post'
    #swagger.description = '使用者登入.'
    #swagger.produces = ['application/json']
*/
/* #swagger.parameters['body'] = {
    in: 'body',
    description: 'User data.',
    required: true,
    schema: { $ref: '#/definitions/signInBody' }
} */
/* #swagger.responses[200] = { schema: { $ref: '#/definitions/signIn' } } */
/* #swagger.responses[400] = { description: "The request data is malformed or missing necessary information" } */
// #swagger.responses[404] = { description: "That account is not registered!" }
// #swagger.end

// #swagger.start
/*
    #swagger.path = '/api/user/{id}'
    #swagger.tags = ['User']
    #swagger.method = 'get'
    #swagger.description = '查詢使用者.'
    #swagger.produces = ['application/json']
*/
/* #swagger.parameters['id'] = {
    in: 'path',
    description: 'User id.',
    required: true
  }
} */
/* #swagger.responses[200] = { schema: { $ref: '#/definitions/getUser' } } */
/* #swagger.responses[400] = { description: "The request data is malformed or missing necessary information" } */
// #swagger.responses[404] = { description: "user does not exists" }
// #swagger.end

// #swagger.start
/*
    #swagger.path = '/api/user/'
    #swagger.tags = ['User']
    #swagger.method = 'get'
    #swagger.description = '查詢所有使用者.'
    #swagger.produces = ['application/json']
*/

/* #swagger.security = [{
            "apiKeyAuth": []
    }] */

/* #swagger.responses[200] = { schema: { $ref: '#/definitions/getUsers' } } */
/* #swagger.responses[400] = { description: "The request data is malformed or missing necessary information" } */
// #swagger.responses[401] = { description: "User not authorized" }
// #swagger.end

// #swagger.start
/*
    #swagger.path = '/api/user/{id}'
    #swagger.tags = ['User']
    #swagger.method = 'put'
    #swagger.description = '修改使用者訊息.'
    #swagger.produces = ['application/json']
*/

/* #swagger.security = [{
            "apiKeyAuth": []
    }] */

/* #swagger.parameters['id'] = {
    in: 'path',
    description: 'User id.',
    required: true
  }
} */

/* #swagger.parameters['body'] = {
    in: 'body',
    description: 'User data.',
    required: true,
    schema: { $ref: '#/definitions/putUserBody' }
} */

/* #swagger.responses[200] = { schema: { $ref: '#/definitions/getUser' } } */
/* #swagger.responses[400] = { description: "The request data is malformed or missing necessary information" } */
// #swagger.responses[404] = { description: "user does not exists" }
// #swagger.end

// #swagger.start
/*
    #swagger.path = '/api/user/{id}'
    #swagger.tags = ['User']
    #swagger.method = 'delete'
    #swagger.description = '刪除使用者.'
    #swagger.produces = ['application/json']
*/

/* #swagger.security = [{
            "apiKeyAuth": []
    }] */

/* #swagger.parameters['id'] = {
    in: 'path',
    description: 'User id.',
    required: true
  }
} */

/* #swagger.responses[200] = { schema: { $ref: '#/definitions/getUser' } } */
/* #swagger.responses[400] = { description: "The request data is malformed or missing necessary information" } */
// #swagger.responses[404] = { description: "user does not exists" }
// #swagger.end

export default router