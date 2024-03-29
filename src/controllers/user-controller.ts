import { Request, Response, NextFunction } from "express"
import { userSchema, putUserSchema } from "../schemas/userSchema"
import { idSchema, paginationSchema } from '../schemas/commonSchema'
import { ResponseData } from "../helpers/Helpers"
import userService from "../services/user-service"
import helpers from "../helpers/Helpers"

const userController = {
  signUp: (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = userSchema.validate(req.body)
    if (error) {
      return res.status(400).json(ResponseData('400', error.details[0].message, null))
    }
    const { name, account, email, password, phone, address } = value
    userService.signUp(name, account, email, password, phone, address, (error, data) => error ? next(error) : res.status(200).json(ResponseData('200', 'OK', data)))
  },
  signIn: (req: Request, res: Response, next: NextFunction) => {
    const user = helpers.getUser(req)
    userService.signIn(user, (error, data) => {
      if (error) {
        return next(error)
      }
      if (!req.isLocalStrategy) {
        res.cookie('token', data?.token, {
          secure: true,
          httpOnly: true,
          sameSite: 'none',
          expires: new Date(Date.now() + 60 * 60 * 1000)
        })
        return res.redirect('https://app.ezstylish.com?isAuthenticated=true')
      }
      res.status(200).json(ResponseData('200', 'OK', data))
    })
  },
  getUser: (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = idSchema.validate(req.params)
    if (error) {
      return res.status(400).json(ResponseData('400', error.details[0].message, null))
    }
    const { id: userId } = value
    userService.getUser(userId, (error, data) => error ? next(error) : res.status(200).json(ResponseData('200', 'OK', data)))
  },
  getUsers: (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = paginationSchema.validate(req.query)
    if (error) {
      return res.status(400).json(ResponseData('400', error.details[0].message, null))
    }
    const { page, limit } = value
    userService.getUsers(page, limit, (error, data) => error ? next(error) : res.status(200).json(ResponseData('200', 'OK', data)))
  },
  putUser: (req: Request, res: Response, next: NextFunction) => {
    const bodyValidation = putUserSchema.validate(req.body)
    const paramsVaildation = idSchema.validate(req.params)
    if (paramsVaildation.error) {
      return res.status(400).json(ResponseData('400', paramsVaildation.error.details[0].message, null))
    }
    if (bodyValidation.error) {
      return res.status(400).json(ResponseData('400', bodyValidation.error.details[0].message, null))
    }
    const { id: userId } = paramsVaildation.value
    if (helpers.getUser(req) && helpers.getUser(req)?.id !== userId) {
      return res.status(403).json(ResponseData('403', 'Forbidden', null));
    }
    const { name, account, password, address } = bodyValidation.value
    userService.putUser(userId, name, account, password, address, (error, data) => error ? next(error) : res.status(200).json(ResponseData('200', 'OK', data)))
  },
  removeUser: (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = idSchema.validate(req.params)
    if (error) {
      return res.status(400).json(ResponseData('400', error.details[0].message, null))
    }
    const { id: userId } = value
    userService.removeUser(userId, (error, data) => error ? next(error) : res.status(200).json(ResponseData('200', 'OK', data)))
  },
  getToken: (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.cookies.token
      if (!token) return res.status(400).json(ResponseData('400', 'token does not exist', null))
      return res.status(200).json(ResponseData('200', 'OK', token))
    } catch (error) {
      next(error)
    }
  }
}

export default userController