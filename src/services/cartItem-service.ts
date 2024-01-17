import { CartItemOutput } from "../db/models/cartItem"
import { callbackType } from "../helpers/Helpers"
import db from "../db/models"
import { CustomError } from "../middleware/error-handler"
const cartItemService = {
  postCartItem: async (user: typeof db.User, productId: number, quantity: number, cb: callbackType<CartItemOutput>) => {
    try {
      let cart = await db.Cart.findOne({ where: { userId: user.id } })
      if (!cart) {
        const res = await db.Cart.create({
          userId: user.id
        })
        cart = res
      }
      const productExisting = await db.Product.findByPk(productId)
      if (!productExisting) return cb(new CustomError('product does not exist', 404))

      const existingItem = await db.CartItem.findOne({ where: { cartId: cart.id, productId: productExisting.id } })
      if (existingItem) {
        existingItem.quantity += quantity
        await existingItem.save()
        return cb(null, existingItem)
      } else {
        const item = await db.CartItem.create({
          cartId: cart.id,
          productId: productExisting.id,
          quantity: quantity
        })
        return cb(null, item)
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        return cb(error)
      }
    }
  },
  putCartItem: async (user: typeof db.User, cartItemId: number, quantity: number, cb: callbackType<CartItemOutput>) => {
    try {
      const cartItem = await db.CartItem.findOne({
        where: { id: cartItemId },
        include: [{
          model: db.Cart,
          where: { userId: user.id }
        }]
      })
      if (!cartItem) return cb(new CustomError('CartItem not found or does not belong to the user', 404))
      const putItem = await cartItem.update({ quantity })
      return cb(null, putItem)
    } catch (error: unknown) {
      if (error instanceof Error) {
        return cb(error)
      }
    }
  },
  removeCartItem: async (cartItemId: number, user: typeof db.User, cb: callbackType<string>) => {
    try {
      const cartItem = await db.CartItem.findOne({
        where: { id: cartItemId },
        include: [{
          model: db.Cart,
          where: { userId: user.id }
        }]
      })
      if (!cartItem) return cb(new CustomError('CartItem not found or does not belong to the user', 404))
      await cartItem.destroy()
      return cb(null, 'CartItem removed successfully')
    } catch (error: unknown) {
      if (error instanceof Error) {
        return cb(error)
      }
    }
  }
}

export default cartItemService