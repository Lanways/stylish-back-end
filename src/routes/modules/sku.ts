import express from 'express'
const router = express.Router()
import skuController from '../../controllers/sku-controller'
import { authenticated, authenticatedAdmin } from '../../middleware/auth'

router.get('/:id', authenticated, authenticatedAdmin, skuController.getSku)
router.put('/:id', authenticated, authenticatedAdmin, skuController.putSku)
router.delete('/:id', authenticated, authenticatedAdmin, skuController.removeSku)
router.get('/', authenticated, authenticatedAdmin, skuController.getSkus)
router.post('/', authenticated, authenticatedAdmin, skuController.postSku)
export default router