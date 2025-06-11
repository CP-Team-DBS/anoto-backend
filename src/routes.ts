import { ServerRoute } from '@hapi/hapi';
import { testimonialValidator } from './validators/testimonialValidator';
import { validate } from './utils/validate';
import * as testimonialHandler from './handlers/testimonalHandler';
import * as testimonialSchemas from './schemas/testimonialSchema';

export default [
  {
    path: '/testimonials',
    method: 'GET',
    handler: testimonialHandler.getTestimonials,
    options: {
      tags: ['api'],
      response: {
        schema: testimonialSchemas.getResponse,
      },
    },
  },
  {
    path: '/testimonials',
    method: 'POST',
    handler: testimonialHandler.createTestimonial,
    options: {
      tags: ['api'],
      response: {
        schema: testimonialSchemas.createResponse,
      },
      ...validate({
        payload: testimonialValidator,
      }),
    },
  },
] as ServerRoute[];
