import { ProductOutput } from "../db/models/product"
import { callbackType } from "../helpers/Helpers"
import db from "../db/models"
import { CustomError } from "../middleware/error-handler"
import { Op } from "sequelize"
import { getOffset, getPagination, Pagination } from "../helpers/pagination-helper"

const prodcutServices = {
  getProducts: async (page: number, limit: number, categoryId: number | null, cb: callbackType<{ products: ProductOutput[], pagination: Pagination }>) => {
    try {
      const offset = getOffset(limit, page)
      const categoryIdExisting = categoryId ? { categoryId: categoryId } : {}
      const products = await db.Product.findAll({
        where: categoryIdExisting,
        limit,
        offset
      })
      const total = await db.Product.count({ where: categoryIdExisting })
      const pagination = getPagination(limit, page, total)
      return cb(null,
        {
          products,
          pagination
        }
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
        return cb(new CustomError('product does not exist', 404))
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
  postProduct: async (name: string, price: number, image: string, description: string, additionalImage: string, categoryId: string, cb: callbackType<ProductOutput>) => {
    try {
      const product = await db.Product.findOne({
        where: { name }
      })
      if (product) cb(new CustomError('product already exists', 409))
      const category = await db.Category.findByPk(categoryId)
      if (!category) {
        cb(new CustomError('category does not exist', 404))
      }
      const createdProduct = await db.Product.create({
        name,
        price,
        image,
        description,
        additionalImage,
        categoryId
      })
      return cb(null, createdProduct)
    } catch (error) {
      if (error instanceof Error) {
        cb(error)
      }
    }
  },
  removeProduct: async (productId: string, cb: callbackType<ProductOutput>) => {
    try {
      const product = await db.Product.findByPk(productId)
      if (!product) return cb(new CustomError('product does not exist', 404))
      await product.destroy()
      return cb(null, product)
    } catch (error) {
      if (error instanceof Error) {
        cb(error)
      }
    }
  },
  putProduct: async (productId: string, name: string, price: number, image: string, description: string, additionalImage: string, categoryId: string, cb: callbackType<ProductOutput>) => {
    try {
      const existingProduct = await db.Product.findOne({
        where: {
          name,
          id: { [Op.ne]: productId }
        }
      })
      if (existingProduct) return cb(new CustomError('product name already exists', 409))
      const product = await db.Product.findByPk(productId)
      if (!product) return cb(new CustomError('product does not exist', 404))
      const category = await db.Category.findByPk(categoryId)
      if (!category) {
        cb(new CustomError('category does not exist', 404))
      }
      const updatedProduct = await product.update({
        name,
        price,
        image,
        description,
        additionalImage,
        categoryId
      })
      return cb(null, updatedProduct)
    } catch (error) {
      if (error instanceof Error) {
        cb(error)
      }
    }
  }

}

export default prodcutServices

