import { ServerRoute } from '@hapi/hapi';
import { testimonialValidator } from './validators/testimonialValidator';
import { testValidator } from './validators/testValidator';
import { validate } from './utils/validate';
import * as testimonialHandler from './handlers/testimonalHandler';
import * as testimonialSchemas from './schemas/testimonialSchema';
import * as testHandler from './handlers/testHandler';
import * as testSchemas from './schemas/testSchema';
import * as journalHandler from './handlers/journalHandler';
import * as journalSchemas from './schemas/journalSchema';
import * as statisticSchemas from './schemas/statisticSchema';
import * as statisticHandler from './handlers/statisticHandler';
import { journalValidator } from './validators/journalValidator';

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
  {
    path: '/journals',
    method: 'POST',
    handler: journalHandler.getResult,
    options: {
      tags: ['api'],
      response: {
        schema: journalSchemas.getResponse,
      },
      ...validate({
        payload: journalValidator,
      }),
    },
  },
  {
    path: '/statistics',
    method: 'GET',
    handler: statisticHandler.getStatistics,
    options: {
      tags: ['api'],
      response: {
        schema: statisticSchemas.getResponse,
      },
    },
  },
] as ServerRoute[];
