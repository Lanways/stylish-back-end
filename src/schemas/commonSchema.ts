import Joi from "joi"

export const idSchema = Joi.object({
  id: Joi.number().integer().required()
})

export const paginationSchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).default(10),
})