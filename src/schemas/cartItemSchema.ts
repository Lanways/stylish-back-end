import Joi from "joi";

export const cartItemSchema = Joi.object({
  productId: Joi.number().integer().positive().required(),
  quantity: Joi.number().integer().positive().required()
})

export const cartItemQuantity = Joi.object({
  quantity: Joi.number().integer().positive().required()
})