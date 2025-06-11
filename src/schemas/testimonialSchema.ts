import Joi from 'joi';
import { createResponseSchema } from '../utils/schema';

const testimonialObject = Joi.object({
  id: Joi.number().example(1),
  name: Joi.string().example('John Doe'),
  text: Joi.string().example('Great service!'),
  rating: Joi.number().example(5),
  createdAt: Joi.string().example('2024-03-20T10:00:00.000Z'),
  updatedAt: Joi.string().example('2024-03-20T10:00:00.000Z'),
});

export const getResponse = createResponseSchema(
  'Testimonials fetched successfully',
  Joi.array().items(testimonialObject),
  'testimonials',
);

export const createResponse = createResponseSchema(
  'Testimonial created successfully',
  testimonialObject,
  'testimonial',
);
