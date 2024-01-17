import Joi from "joi"

export const idSchema = Joi.object({
  id: Joi.number().integer().positive().required()
})

export const paginationSchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).default(10),
})

export const userIdSchema = Joi.number().integer().positive().required()