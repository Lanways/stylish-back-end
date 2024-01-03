import Joi from "joi";

export const productSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  price: Joi.number().min(0).required(),
  image: Joi.string().uri().required(),
  sizeOptions: Joi.string().valid('S', 'M', 'L').required(),
  quantity: Joi.number().integer().min(0).required(),
  description: Joi.string().max(200).allow(null).optional(),
  additionalImage: Joi.string().uri().required(),
  categoryId: Joi.number().integer().required()
})

export const idSchema = Joi.object({
  id: Joi.number().integer().required()
})

export const productQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).default(10),
  categoryId: Joi.number().integer().allow(null).optional()
})