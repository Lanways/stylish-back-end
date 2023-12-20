import { Request } from "express"
import { ProductOutput } from "../db/models/product"
import { callbackType } from "../helpers/Helpers"
import db from "../db/models"
import { CustomError } from "../middleware/error-handler"

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
  },
  postProduct: async (name: string, price: number, image: string, sizeOptions: string, quantity: number, description: string, additionalImage: string, cb: callbackType<ProductOutput>) => {
    try {
      const product = await db.Product.findOne({
        where: { name }
      })
      if (product) cb(new CustomError('product is exist', 409))
      
      const createdProduct = await db.Product.create({
        name,
        price,
        image,
        sizeOptions,
        quantity,
        description,
        additionalImage,
      })
      return cb(null, createdProduct)
    } catch (error) {
      if (error instanceof Error) {
        cb(error)
      }
    }
  }

}

export default prodcutServices

