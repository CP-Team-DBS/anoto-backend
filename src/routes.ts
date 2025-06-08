import { ServerRoute } from '@hapi/hapi';
import * as testimonialHandler from './handlers/testimonalHandler';

export default [
  {
    path: '/testimonials',
    method: 'GET',
    handler: testimonialHandler.getTestimonials,
  },
] as ServerRoute[];
