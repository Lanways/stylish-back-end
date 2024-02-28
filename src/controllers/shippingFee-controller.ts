import { object } from "joi"
import { ResponseData } from "../helpers/Helpers"
import { shippingFeeSchema } from "../schemas/shippingFeeSchema"
import shippingFeeService from "../services/shippingFee-service"
import { Request, NextFunction, Response } from "express"

const shippingFeeController = {
  
  getShippingFee: (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = shippingFeeSchema.validate(req.query)
    if (error) return res.status(400).json(ResponseData('400', error.details[0].message, null))
    const isQueryEmpty = Object.keys(value).length === 0
    const { country, paymentMethod, shippingMethod } = value
    shippingFeeService.getShippingFee(isQueryEmpty, country, paymentMethod, shippingMethod, (error, data) => error ? next(error) : res.status(200).json(ResponseData('200', 'OK', data)))
  }
}

export default shippingFeeController