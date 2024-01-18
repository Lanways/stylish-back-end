import Joi from "joi";
import { paginationSchema } from "./commonSchema";

export const productSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  price: Joi.number().min(0).required(),
  image: Joi.string().uri().required(),
  description: Joi.string().max(200).allow(null).optional(),
  additionalImage: Joi.string().uri().required(),
  categoryId: Joi.number().integer().required()
})

export const productQuerySchema = paginationSchema.keys({
  categoryId: Joi.number().integer().allow(null).optional()
})