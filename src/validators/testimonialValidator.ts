import Joi from 'joi';

export const testimonialValidator = Joi.object({
  name: Joi.string().required().max(100),
  text: Joi.string().required(),
});
