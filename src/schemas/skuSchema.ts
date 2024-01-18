import Joi from "joi";

export const postSkuSchema = Joi.object({
  productId: Joi.number().integer().required(),
  price: Joi.number().integer().required(),
  inventoryQuantity: Joi.number().integer().required(),
  color: Joi.string().required(),
  size: Joi.string().min(1).max(3).required()
})