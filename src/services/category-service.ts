import db from "../db/models"
import { callbackType } from "../helpers/Helpers"
import { CategoryOutput } from "../db/models/category"
import { CustomError } from "../middleware/error-handler"

const categoryService = {
  getCategories: async (cb: callbackType<CategoryOutput>) => {
    try {
      const category = await db.Category.findAll()
      if (!category) return cb(new CustomError('category does not exist', 404))
      return cb(null, category)
    } catch (error: unknown) {
      if (error instanceof Error) {
        cb(error)
      }
    }
  },
  getCategory: async (categoryId: string, cb: callbackType<CategoryOutput>) => {
    try {
      const category = await db.Category.findByPk(categoryId)
      if (!category) return cb(new CustomError('category does not exist', 404))
      return cb(null, category)
    } catch (error: unknown) {
      if (error instanceof Error) {
        return cb(error)
      }
    }
  },
  postCategory: async (name: string, cb: callbackType<CategoryOutput>) => {
    try {
      const categoryExisting = await db.Category.findOne({ where: { name: name } })
      if (categoryExisting) return cb(new CustomError('category does exist', 409))
      const category = await db.Category.create({ name: name })
      return cb(null, category)
    } catch (error: unknown) {
      if (error instanceof Error) {
        return cb(error)
      }
    }

  },
  putCategory: async (name: string, categoryId: string, cb: callbackType<CategoryOutput>) => {
    try {
      const categoryExisting = await db.Category.findOne({ where: { name } })
      if (categoryExisting) return cb(new CustomError('category does exist', 409))
      const category = await db.Category.findByPk(categoryId)
      if (!category) return cb(new CustomError('category does not exist', 404))
      const updateCategory = await category.update({
        name
      })
      return cb(null, updateCategory)
    } catch (error: unknown) {
      if (error instanceof Error) {
        return cb(error)
      }
    }
  },
  removeCategory: async (categoryId: string, cb: callbackType<CategoryOutput>) => {
    try {
      const category = await db.Category.findByPk(categoryId)
      if (!category) return cb(new CustomError('category does not exist', 404))
      const uncategorized = await db.Category.findOne({ where: { name: '未分類' } })
      if (!uncategorized) return cb(new CustomError('category not found', 500))
      await db.Product.update({ categoryId: uncategorized.id }, { where: { categoryId: categoryId } })
      await category.destroy()
      return cb(null, category)
    } catch (error) {
      if (error instanceof Error) {
        return cb(error)
      }
    }
  }

}

export default categoryService