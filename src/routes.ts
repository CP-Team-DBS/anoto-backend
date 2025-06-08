import { ServerRoute } from '@hapi/hapi';
import * as testimonialHandler from './handlers/testimonalHandler';
import { testimonialValidator } from './validators/testimonialValidator';
import { validate } from './utils/validate';

export default [
  {
    path: '/testimonials',
    method: 'GET',
    handler: testimonialHandler.getTestimonials,
  },
  {
    path: '/testimonials',
    method: 'POST',
    handler: testimonialHandler.createTestimonial,
    options: {
      ...validate({
        payload: testimonialValidator,
      }),
    },
  },
] as ServerRoute[];
