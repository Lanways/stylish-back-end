import Joi from "joi";

export const orderSchema = Joi.object({
  order: Joi.object({
    totalPrice: Joi.number().precision(2).required(),
    status: Joi.string().valid('Pending', 'Completed', 'Cancelled').required()
  }),
  shipping: Joi.object({
    recipient: Joi.string().required(),
    address: Joi.string().required(),
    telephone: Joi.string().required()
  }),
  payment: Joi.object({
    amount: Joi.number().precision(2).required(),
    provider: Joi.string().required(),
    status: Joi.string().valid('Pending', 'Completed', 'Failed').required()
  }),
  orderItems: Joi.array().items(Joi.object({
    skuId: Joi.number().integer().required(),
    quantity: Joi.number().integer().min(1).required()
  })).required(),
  shippingFeeId: Joi.number().integer().optional()
})
