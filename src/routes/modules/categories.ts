import express from "express";
import categoryController from "../../controllers/category-controller";
const router = express.Router()

router.get('/:id', categoryController.getCategory)
router.put('/:id', categoryController.putCategory)
router.delete('/:id', categoryController.removeCategory)
router.get('/', categoryController.getCategories)
router.post('/', categoryController.postCategory)

export default router