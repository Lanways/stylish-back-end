import { Request } from "express"
import { ProductOutput } from "../db/models/product"
import { callbackType } from "../helpers/Helpers"
import db from "../db/models"

const prodcutServices = {
  getProducts: async (req: Request, cb: callbackType<ProductOutput[]>) => {
    try {
      const products = await db.Product.findAll()
      return cb(null,
        products
      )
    } catch (error: unknown) {
      if (error instanceof Error) {
        cb(error)
      }
    }
  },
  getProduct: async (productId: string, cb: callbackType<ProductOutput>) => {
    try {
      const product = await db.Product.findByPk(productId)
      if (!product) {
        return cb(new Error('product is not exist'))
      }
      return cb(null,
        product
      )
    } catch (error: unknown) {
      if (error instanceof Error) {
        cb(error)
      }
    }
  }
}

export default prodcutServices

