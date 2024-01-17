import { Request, Response, NextFunction } from "express"
import cartService from "../services/cart-service"
import { userIdSchema } from "../schemas/commonSchema"
import { ResponseData } from "../helpers/Helpers"

const cartController = {
  postCart: (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = userIdSchema.validate(req.user?.id)
    if (error) {
      return res.status(400).json(ResponseData('400', error.details[0].message, null))
    }
    const userId = value
    cartService.postCart(userId, (error, data) => error ? next(error) : res.status(200).json(ResponseData('200', 'OK', data)))
  },
  getCart: (req: Request, res: Response, next: NextFunction) => {
    const user = req.user
    cartService.getCart(user, (error, data) => error ? next(error) : res.status(200).json(ResponseData('200', 'OK', data)))
  }
}

export default cartController