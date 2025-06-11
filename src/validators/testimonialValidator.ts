import Joi from 'joi';

export const testimonialValidator = Joi.object({
  name: Joi.string().required().max(100),
  text: Joi.string().required(),
  rating: Joi.number().required().min(1).max(5),
});
