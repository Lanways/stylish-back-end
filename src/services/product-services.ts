import { Request } from "express"
import { Product } from "../db/models"
import { ProductOutput } from "../db/models/product"
import { callbackType } from "../helpers/Helpers"

const prodcutServices = {
  getProducts: async (req: Request, cb: callbackType<ProductOutput[]>) => {
    try {
      const products = await Product.findAll()
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
      const product = await Product.findByPk(productId)
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

