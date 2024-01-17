import express from "express";
import products from './modules/products'
import { apiErrorHandler } from "../middleware/error-handler";
import categories from './modules/categories'
import users from './modules/users'
import cart from './modules/cart'
import cartItem from './modules/cartItem'
const router = express.Router()

router.use('/api/product', products)
router.use('/api/category', categories)
router.use('/api/user', users)
router.use('/api/cart', cart)
router.use('/api/cartItem', cartItem)
router.use('/', apiErrorHandler)

export default router