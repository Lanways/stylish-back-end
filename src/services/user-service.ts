import db from "../db/models"
import { UserOutput } from "../db/models/user"
import { getOffset, getPagination, Pagination } from "../helpers/pagination-helper"
import { callbackType } from "../helpers/Helpers"
import jwt from 'jsonwebtoken'
import { CustomError } from "../middleware/error-handler"
import bcrypt from 'bcryptjs'
import { secrets } from "../secret-manager"

const userService = {
  signUp: async (name: string, account: string, email: string, password: string, phone: string, address: string, cb: callbackType<UserOutput>) => {
    try {
      const userWithEmail = await db.User.findOne({ where: { email: email } })
      if (userWithEmail) {
        return cb(new CustomError('email already exists', 409))
      }
      const userWithPhone = await db.User.findOne({ where: { phone: phone } })
      if (userWithPhone) {
        return cb(new CustomError('phone already exists', 409))
      }
      const hashed: string = await bcrypt.hash(password, 10)
      const user = await db.User.create({
        name,
        account,
        email,
        password: hashed,
        phone,
        address,
      })
      const userObject = user.toJSON()
      delete userObject.password
      return cb(null, userObject)
    } catch (error: unknown) {
      if (error instanceof Error) {
        cb(error)
      }
    }
  },
  signIn: async (user: typeof db.User, cb: callbackType<{ userObject: UserOutput, token: string }>) => {
    try {
      const userObject = user.toJSON()
      delete userObject.password
      let JWT_SECRET: string
      if (process.env.NODE_ENV === "production") {
        JWT_SECRET = secrets.JWT_SECRET
      } else {
        JWT_SECRET = process.env.JWT_SECRET as string
      }
      const token = jwt.sign(userObject, JWT_SECRET, { expiresIn: '1h' })
      return cb(null, { userObject, token })
    } catch (error: unknown) {
      if (error instanceof Error) {
        return cb(error)
      }
    }
  },
  getUser: async (userId: string, cb: callbackType<UserOutput>) => {
    try {
      const user = await db.User.findByPk(userId, { raw: true })
      if (!user) return cb(new CustomError('user does not exist', 404))
      delete user.password
      return cb(null, user)
    } catch (error: unknown) {
      if (error instanceof Error) {
        return cb(error)
      }
    }
  },
  getUsers: async (page: number, limit: number, cb: callbackType<{
    users: UserOutput[], pagination: Pagination
  }>) => {
    try {
      const offset = getOffset(limit, page)
      const users = await db.User.findAll({ limit, offset })
      const total = await db.User.count()
      const pagination = getPagination(limit, page, total)
      return cb(null, { users, pagination })
    } catch (error: unknown) {
      if (error instanceof Error) {
        return cb(error)
      }
    }
  },
  putUser: async (userId: string, name: string, account: string, password: string, address: string, cb: callbackType<UserOutput>) => {
    try {
      const user = await db.User.findByPk(userId)
      if (!user) return cb(new CustomError('user does not exist', 404))
      const updateUser = await user.update({
        name,
        account,
        password,
        address
      })
      const objectUser = updateUser.toJSON()
      delete objectUser.password
      return cb(null, objectUser)
    } catch (error: unknown) {
      if (error instanceof Error) {
        return cb(error)
      }
    }
  },
  removeUser: async (userId: string, cb: callbackType<UserOutput>) => {
    try {
      const user = await db.User.findByPk(userId)
      if (!user) return cb(new CustomError('user does not exist', 404))
      const userObject = user.toJSON()
      delete userObject.password
      await user.destroy()
      return cb(null, userObject)
    } catch (error: unknown) {
      if (error instanceof Error) {
        return cb(error)
      }
    }
  }
}

export default userService