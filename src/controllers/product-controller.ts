import { Request, Response, NextFunction } from "express"
import productServices from "../services/product-services"
import { ResponseData } from "../helpers/Helpers"

const productController = {
  getProducts: (req: Request, res: Response, next: NextFunction) => {
    productServices.getProducts(req, (error, data) => error ? next(error) : res.status(200).json(ResponseData('200', 'OK', data)))
  }
}

export default productController