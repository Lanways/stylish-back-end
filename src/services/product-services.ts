import { Request } from "express"
import { Product } from "../db/models"
import { ProductOutput } from "../db/models/product"
import { callbackType } from "../helpers/cbHelpers"

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
  }
}

export default prodcutServices

