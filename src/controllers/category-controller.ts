import { Request, Response, NextFunction } from "express"
import categoryService from "../services/category-service"
import { ResponseData } from "../helpers/Helpers"
import { idSchema } from "../schemas/productSchema"
import { categorySchema } from "../schemas/categorySchema"

const categoryController = {
  getCategories: (req: Request, res: Response, next: NextFunction) => {
    categoryService.getCategories((error, data) => error ? next(error) : res.status(200).json(ResponseData('200', 'OK', data)))
  },
  getCategory: (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = idSchema.validate(req.params)
    if (error) {
      res.status(400).json(ResponseData('400', error.details[0].message, null))
    }
    const categoryId = value.id
    categoryService.getCategory(categoryId, (error, data) => error ? next(error) : res.status(200).json(ResponseData('200', 'OK', data)))
  },
  postCategory: (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = categorySchema.validate(req.body)
    if (error) {
      return res.status(400).json(ResponseData('400', error.details[0].message, null))
    }
    const name = value.name
    categoryService.postCategory(name, (error, data) => error ? next(error) : res.status(200).json(ResponseData('200', 'OK', data)))
  },
  putCategory: (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = categorySchema.validate(req.body)
    const categoryValidation = idSchema.validate(req.params)
    if (categoryValidation.error) {
      return res.status(400).json(ResponseData('400', categoryValidation.error.details[0].message, null))
    }
    if (error) {
      return res.status(400).json(ResponseData('400', error.details[0].message, null))
    }
    const categoryId = categoryValidation.value.id
    const name = value.name
    categoryService.putCategory(name, categoryId, (error, data) => error ? next(error) : res.status(200).json(ResponseData('200', 'OK', data)))
  },
  removeCategory: (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = idSchema.validate(req.params)
    if (error) return res.status(400).json(ResponseData('400', error.details[0].message, null))
    const categoryId = value.id
    categoryService.removeCategory(categoryId, (error, data) => error ? next(error) : res.status(200).json(ResponseData('200', 'OK', data)))
  }
}

export default categoryController