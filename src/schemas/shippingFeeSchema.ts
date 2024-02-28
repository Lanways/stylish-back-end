import Joi from "joi";

export const shippingFeeSchema = Joi.object({
  country: Joi.string().optional(),
  paymentMethod: Joi.string().optional(),
  shippingMethod: Joi.string().optional()
})