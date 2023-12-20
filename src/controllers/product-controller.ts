import { Request, Response, NextFunction } from "express"
import productServices from "../services/product-services"
import { ResponseData } from "../helpers/Helpers"
import { productSchema } from "../schemas/productSchema"

const productController = {
  getProducts: (req: Request, res: Response, next: NextFunction) => {
    productServices.getProducts(req, (error, data) => error ? next(error) : res.status(200).json(ResponseData('200', 'OK', data)))
  },
  getProduct: (req: Request, res: Response, next: NextFunction) => {
    const productId = req.params.id
    productServices.getProduct(productId, (error, data) => error ? next(error) : res.status(200).json(ResponseData('200', 'OK', data)))
  },
  postProduct: (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = productSchema.validate(req.body)
    if (error) {
      return res.status(400).json(ResponseData('400', error.details[0].message, null))
    }
    const { name, price, image, sizeOptions, quantity, description, additionalImage } = value

    productServices.postProduct(
      name,
      price,
      image,
      sizeOptions,
      quantity,
      description,
      additionalImage, (error, data) => error ? next(error) : res.status(200).json(ResponseData('200', 'OK', data)))
  }
}

export default productController