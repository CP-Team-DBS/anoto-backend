import Joi from 'joi';

export const journalValidator = Joi.object({
  text: Joi.string().required(),
}).label('Journal Schema');
