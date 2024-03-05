import express from 'express'
const router = express.Router()
import passport from '../../config/passport'
import userController from '../../controllers/user-controller'

router.get('/google', passport.authenticate('google', {
  scope: ['email', 'profile']
}))

router.get('/google/callback',
  passport.authenticate('google', { session: false }),
  (req, res, next) => {
    req.isLocalStrategy = false
    next()
  }, userController.signIn
)

export default router

// #swagger.start
/*
    #swagger.path = '/api/auth/google'
    #swagger.tags = ['Auth']
    #swagger.method = 'get'
    #swagger.description = 'Google驗證.'
    #swagger.produces = ['application/json']
*/
// #swagger.end

// #swagger.start
/*
    #swagger.path = '/api/auth/google/callback'
    #swagger.tags = ['Auth']
    #swagger.method = 'get'
    #swagger.description = 'for Google callback.'
    #swagger.produces = ['application/json']
*/
// #swagger.end