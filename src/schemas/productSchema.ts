import Joi from "joi";

export const productSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  price: Joi.number().min(0).required(),
  image: Joi.string().uri().required(),
  sizeOptions: Joi.string().valid('S', 'M', 'L').required(),
  quantity: Joi.number().integer().min(0).required(),
  description: Joi.string().max(200),
  additionalImage: Joi.string().uri().required()
})

export const idSchema = Joi.object({
  id: Joi.number().integer().required()
})