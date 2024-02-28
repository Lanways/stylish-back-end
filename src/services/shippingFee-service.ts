import db from "../db/models"
import { ShippingFeeOutput } from "../db/models/shippingFee"
import { callbackType } from "../helpers/Helpers"
import { CustomError } from "../middleware/error-handler"

const shippingFeeService = {

  getShippingFee: async (isQueryEmpty: boolean, country: string, paymentMethod: string, shippingMethod: string, cb: callbackType<ShippingFeeOutput>) => {
    try {
      let whereCondition = {}
      if (!isQueryEmpty) {
        whereCondition = {
          country: country,
          paymentMethod: paymentMethod,
          shippingMethod: shippingMethod
        }
      }
      const shippingFee = await db.ShippingFee.findAll({
        where: whereCondition
      })
      if (shippingFee.length === 0) return cb(new CustomError('Internal Server Error', 500))
      return cb(null, shippingFee)
    } catch (error: unknown) {
      if (error instanceof Error)
        cb(error)
    }
  }
}

export default shippingFeeService