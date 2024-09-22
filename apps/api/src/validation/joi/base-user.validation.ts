import Joi from 'joi';

export const baseUserSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.number(),
}).options({
  abortEarly: false,
});
