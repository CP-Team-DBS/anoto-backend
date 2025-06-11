import { ServerRoute } from '@hapi/hapi';
import { testimonialValidator } from './validators/testimonialValidator';
import { testValidator } from './validators/testValidator';
import { validate } from './utils/validate';
import * as testimonialHandler from './handlers/testimonalHandler';
import * as testimonialSchemas from './schemas/testimonialSchema';
import * as testHandler from './handlers/testHandler';
import * as testSchemas from './schemas/testSchema';

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
  {
    path: '/test',
    method: 'POST',
    handler: testHandler.getResult,
    options: {
      tags: ['api'],
      response: {
        schema: testSchemas.getResponse,
      },
      ...validate({
        payload: testValidator,
      }),
    },
  },
] as ServerRoute[];
