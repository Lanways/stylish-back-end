import Joi from "joi"

export const baseUserSchema = Joi.object({
  name: Joi.string().min(3).max(50).allow(null).optional(),
  account: Joi.string().allow(null).optional(),
  address: Joi.string().allow(null).optional(),
})

export const userSchema = baseUserSchema.keys({
  phone: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(20).required()
})

export const putUserSchema = baseUserSchema.keys({
  password: Joi.string().min(8).max(20).required()
})



export const singInSchema = baseUserSchema