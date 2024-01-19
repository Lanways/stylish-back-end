import { Request, Response, NextFunction } from "express"
import { cartItemQuantity, cartItemSchema } from "../schemas/cartItemSchema"
import { ResponseData } from "../helpers/Helpers"
import cartItemService from "../services/cartItem-service"
import { idSchema } from "../schemas/commonSchema"

const cartItemController = {
  postCartItem: (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = cartItemSchema.validate(req.body)
    if (error) {
      return res.status(400).json(ResponseData('400', error.details[0].message, null))
    }
    const { skuId, quantity } = value
    const user = req.user
    cartItemService.postCartItem(user, skuId, quantity, (error, data) => error ? next(error) : res.status(200).json(ResponseData('200', 'OK', data)))
  },
  putCartItem: (req: Request, res: Response, next: NextFunction) => {
    const user = req.user
    const { error: idError, value: idValue } = idSchema.validate(req.params)
    if (idError) {
      return res.status(400).json(ResponseData('400', idError.details[0].message, null))
    }
    const { error: quantityError, value: quantityValue } = cartItemQuantity.validate(req.body)
    if (quantityError) {
      return res.status(400).json(ResponseData('400', quantityError.details[0].message, null))
    }
    const { id: cartItemId } = idValue
    const { quantity } = quantityValue
    cartItemService.putCartItem(user, cartItemId, quantity, (error, data) => error ? next(error) : res.status(200).json(ResponseData('200', 'OK', data)))
  },
  removeCartItem: (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = idSchema.validate(req.params)
    if (error) {
      return res.status(400).json(ResponseData('400', error.details[0].message, null))
    }
    const { id: cartItemId } = value
    const user = req.user
    cartItemService.removeCartItem(cartItemId, user, (error, data) => error ? next(error) : res.status(200).json(ResponseData('200', 'OK', data)))
  }
}

export default cartItemController