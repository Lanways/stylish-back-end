import { Request, Response, NextFunction } from "express"
import { postSkuSchema } from "../schemas/skuSchema"
import { ResponseData } from "../helpers/Helpers"
import skuService from "../services/sku-service"
import { idSchema, paginationSchema } from "../schemas/commonSchema"

const skuController = {
  postSku: (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = postSkuSchema.validate(req.body)
    if (error) {
      return res.status(400).json(ResponseData('400', error.details[0].message, null))
    }
    const { productId, price, inventoryQuantity, color, size } = value
    skuService.postSku(productId, price, inventoryQuantity, color, size, (error, data) => error ? next(error) : res.status(200).json(ResponseData('200', 'OK', data)))
  },
  getSku: (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = idSchema.validate(req.params)
    if (error) {
      return res.status(400).json(ResponseData('400', error.details[0].message, null))
    }
    const { id: skuId } = value
    skuService.getSku(skuId, (error, data) => error ? next(error) : res.status(200).json(ResponseData('200', 'OK', data)))
  },
  getSkus: (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = paginationSchema.validate(req.query)
    if (error) {
      return res.status(400).json(ResponseData('400', error.details[0].message, null))
    }
    const { page, limit } = value
    skuService.getSkus(page, limit, (error, data) => error ? next(error) : res.status(200).json(ResponseData('200', 'OK', data)))
  },
  putSku: (req: Request, res: Response, next: NextFunction) => {
    const { error: idError, value: idValue } = idSchema.validate(req.params)
    if (idError) {
      return res.status(400).json(ResponseData('400', idError.details[0].message, null))
    }
    const { error, value } = postSkuSchema.validate(req.body)
    if (error) {
      return res.status(400).json(ResponseData('400', error.details[0].message, null))
    }
    const { id: skuId } = idValue
    const { productId, price, inventoryQuantity, color, size } = value
    skuService.putSku(skuId, productId, price, inventoryQuantity, color, size, (error, data) => error ? next(error) : res.status(200).json(ResponseData('200', 'OK', data)))
  },
  removeSku: (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = idSchema.validate(req.params)
    if (error) {
      return res.status(400).json(ResponseData('400', error.details[0].message, null))
    }
    const { id: skuId } = value
    skuService.removeSku(skuId, (error, data) => error ? next(error) : res.status(200).json(ResponseData('200', 'OK', data)))
  }
}

export default skuController
