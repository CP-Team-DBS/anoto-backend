import { Request, ResponseToolkit } from '@hapi/hapi';
import { TestimonialRepository } from '../repositories/TestimonialRepository';
import { TestimonialResource } from '../resources/TestimonialResource';
import { successResponse } from '../utils/response';

const testimonialRepo = new TestimonialRepository();

export const getTestimonials = async (request: Request, h: ResponseToolkit) => {
  const testimonials = await testimonialRepo.findAll();

  return h
    .response(
      successResponse('Testimonials fetched successfully', {
        testimonials: TestimonialResource.collection(testimonials),
      }),
    )
    .code(200);
};

export const createTestimonial = async (
  request: Request,
  h: ResponseToolkit,
) => {
  const { name, text } = request.payload as { name: string; text: string };
  const testimonial = await testimonialRepo.create(name, text);

  return h
    .response(
      successResponse('Testimonial created successfully', {
        testimonial: TestimonialResource.toJSON(testimonial),
      }),
    )
    .code(201);
};
