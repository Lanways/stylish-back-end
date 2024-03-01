import { orderSchema } from "../schemas/orderSchema"
import orderService from "../services/order-service"
import { Request, Response, NextFunction } from "express"
import helpers, { ResponseData } from "../helpers/Helpers"

const orderController = {
  postOrder: (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = orderSchema.validate(req.body)
    if (error) {
      return res.status(400).json(ResponseData('400', error.details[0].message, null))
    }
    const { order, shipping, payment, orderItems, shippingFeeId } = value
    const user = helpers.getUser(req)
    if (!user) return res.status(401).json(ResponseData('401', 'unauthorized', null))
    orderService.postOrder(user, order, shipping, payment, orderItems, shippingFeeId, (error, data) => error ? next(error) : res.status(200).json(ResponseData('200', 'OK', data)))
  },
  getOrders: (req: Request, res: Response, next: NextFunction) => {
    orderService.getOrders((error, data) => error ? next(error) : res.status(200).json(ResponseData('200', 'Ok', data)))
  }
}

export default orderController