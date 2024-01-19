import { Sku, SkuOutput } from "../db/models/sku"
import { callbackType } from "../helpers/Helpers"
import db from "../db/models"
import { CustomError } from "../middleware/error-handler"
import { getOffset, getPagination, Pagination } from "../helpers/pagination-helper"
import { Op } from "sequelize"

const skuService = {
  postSku: async (productId: number, price: number, inventoryQuantity: number, color: string, size: string, cb: callbackType<SkuOutput>) => {
    try {
      const skuExisting = await db.Sku.findOne({
        where: {
          productId,
          color,
          size
        }
      })
      if (skuExisting) return cb(new CustomError('sku already exists', 409))
      const productExisting = await db.Product.findByPk(productId)
      if (!productExisting) return cb(new CustomError('product does not exists', 404))

      const skuCode = `SKU-${productId}-${color}-${size}`
      const sku = await db.Sku.create({
        productId,
        skuCode,
        price,
        inventoryQuantity,
        color,
        size
      })
      return cb(null, sku)
    } catch (error: unknown) {
      if (error instanceof Error) {
        return cb(error)
      }
    }
  },
  getSku: async (skuId: number, cb: callbackType<SkuOutput>) => {
    try {
      const sku = await db.Sku.findByPk(skuId)
      if (!sku) return cb(new CustomError('sku does not exists', 404))
      return cb(null, sku)
    } catch (error: unknown) {
      if (error instanceof Error) {
        return cb(error)
      }
    }
  },
  getSkus: async (page: number, limit: number, cb: callbackType<{ skus: SkuOutput[], pagination: Pagination }>) => {
    try {
      const offset = getOffset(limit, page)
      const skus = await db.Sku.findAll({
        limit,
        offset
      })
      const total = await db.Sku.count()
      const pagination = getPagination(limit, page, total)
      return cb(null, {
        skus,
        pagination
      })
    } catch (error: unknown) {
      if (error instanceof Error) {
        return cb(error)
      }
    }
  },
  putSku: async (skuId: number, productId: number, price: number, inventoryQuantity: number, color: string, size: string, cb: callbackType<SkuOutput>) => {
    try {
      const product = await db.Product.findByPk(productId)
      if (!product) return cb(new CustomError('product does not exists', 404))
      const sku = await db.Sku.findByPk(skuId)
      if (!sku) return cb(new CustomError('sku does not exists', 404))
      const skuExisting = await db.Sku.findOne({
        where: {
          productId,
          color,
          size,
          id: { [Op.ne]: skuId }
        }
      })
      if (skuExisting) return cb(new CustomError('sku already exists', 409))
      const skuCode = `SKU-${productId}-${color}-${size}`
      const updateSku = await sku.update({
        productId,
        skuCode,
        price,
        inventoryQuantity,
        color,
        size
      })
      return cb(null, updateSku)
    } catch (error: unknown) {
      if (error instanceof Error) {
        return cb(error)
      }
    }
  },
  removeSku: async (skuId: number, cb: callbackType<string>) => {
    try {
      const sku = await db.Sku.findByPk(skuId)
      if (!sku) return cb(new CustomError('sku does not exists', 404))
      await sku.destroy()
      return cb(null, 'Sku removed successfully')
    } catch (error: unknown) {
      if (error instanceof Error) {
        return cb(error)
      }
    }

  }
}

export default skuService