import { callbackType } from "../helpers/Helpers"
import { CartOutput } from "../db/models/cart"
import db from "../db/models"
import { CustomError } from "../middleware/error-handler"

const cartService = {
  postCart: async (userId: number, cb: callbackType<CartOutput>) => {
    try {
      const user = await db.User.findByPk(userId)
      if (!user) return cb(new CustomError('user does not exist', 404))
      const cartExisting = await db.Cart.findOne({ where: { userId: userId } })
      if (cartExisting) {
        return cb(new CustomError('User already has a cart', 400))
      }
      const cart = await db.Cart.create({
        userId: userId
      })
      return cb(null, cart)
    } catch (error: unknown) {
      if (error instanceof Error) {
        return cb(error)
      }
    }
  },
  getCart: async (user: typeof db.User, cb: callbackType<CartOutput>) => {
    try {
      let cart = await db.Cart.findOne({
        where: { userId: user.id },
        include: [{
          model: db.CartItem,
          as: 'CartItems'
        }]
      })
      if (!cart) {
        const res = await db.Cart.create({
          userId: user.id
        })
        cart = res
      }
      cb(null, cart)
    } catch (error: unknown) {
      if (error instanceof Error) {
        return cb(error)
      }
    }
  }
}

export default cartService