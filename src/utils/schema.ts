import Joi from 'joi';

export function createResponseSchema<T extends Joi.Schema>(
  message: string,
  dataSchema: T,
  dataKey: string,
) {
  return Joi.object({
    error: Joi.boolean().example(false),
    message: Joi.string().example(message),
    data: {
      [dataKey]: dataSchema,
    },
  });
}
