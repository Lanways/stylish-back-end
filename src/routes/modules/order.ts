import express from 'express'
import orderController from '../../controllers/order-controller'
import { authenticated, authenticatedAdmin } from '../../middleware/auth'
const router = express.Router()

router.post('/', authenticated, orderController.postOrder)
router.get('/', authenticated, authenticatedAdmin, orderController.getOrders)
export default router