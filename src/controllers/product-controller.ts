import { Request, Response, NextFunction } from "express"
import productServices from "../services/product-services"
import { ResponseData } from "../helpers/Helpers"
import { productSchema, idSchema } from "../schemas/productSchema"

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
    const { name, price, image, sizeOptions, quantity, description, additionalImage, categoryId } = value

    productServices.postProduct(
      name,
      price,
      image,
      sizeOptions,
      quantity,
      description,
      additionalImage,
      categoryId,
      (error, data) => error ? next(error) : res.status(200).json(ResponseData('200', 'OK', data)))
  },
  removeProduct: (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = idSchema.validate({ id: req.params.id })
    if (error) {
      return res.status(400).json(ResponseData('400', error.details[0].message, null))
    }
    const { id: productId } = value
    productServices.removeProduct(productId, (error, data) => error ? next(error) : res.status(200).json(ResponseData('200', 'OK', data)))
  },
  putProduct: (req: Request, res: Response, next: NextFunction) => {
    const bodyValidation = productSchema.validate(req.body)
    const paramsValidation = idSchema.validate({ id: req.params.id })
    if (bodyValidation.error) return res.status(400).json(ResponseData('400', bodyValidation.error.details[0].message, null))
    if (paramsValidation.error) return res.status(400).json(ResponseData('400', paramsValidation.error.details[0].message, null))
    const { name, price, image, sizeOptions, quantity, description, additionalImage, categoryId } = bodyValidation.value
    const { id: productId } = paramsValidation.value
    productServices.putProduct(
      productId,
      name,
      price,
      image,
      sizeOptions,
      quantity,
      description,
      additionalImage,
      categoryId,
      (error, data) => error ? next(error) : res.status(200).json(ResponseData('200', 'OK', data)))
  }
}

export default productController