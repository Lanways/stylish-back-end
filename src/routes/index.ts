import express from "express";
import products from './modules/products'
import { apiErrorHandler } from "../middleware/error-handler";

const router = express.Router()

router.use('/api/product', products)

router.use('/', apiErrorHandler)

export default router