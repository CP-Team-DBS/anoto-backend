import { Request, ResponseToolkit } from '@hapi/hapi';
import { TestimonialRepository } from '../repositories/TestimonialRepository';
import { TestimonialResource } from '../resources/TestimonialResource';

const testimonialRepo = new TestimonialRepository();

export const getTestimonials = async (request: Request, h: ResponseToolkit) => {
  const testimonials = await testimonialRepo.findAll();
  return h.response(TestimonialResource.collection(testimonials)).code(200);
};
