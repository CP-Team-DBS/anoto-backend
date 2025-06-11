import { Testimonial } from '../entities/Testimonial';

export class TestimonialResource {
  static toJSON(testi: Testimonial): TestimonialResource {
    return {
      id: testi.id,
      name: testi.name,
      text: testi.text,
      rating: testi.rating,
      createdAt: testi.createdAt.toISOString(),
      updatedAt: testi.updatedAt.toISOString(),
    };
  }

  static collection(testimonials: Testimonial[]): TestimonialResource[] {
    return testimonials.map(TestimonialResource.toJSON);
  }
}
