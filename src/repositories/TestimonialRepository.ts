import { Repository } from 'typeorm';
import { Testimonial } from '../entities/Testimonial';
import { AppDataSource } from '../config/database';

export class TestimonialRepository {
  private repo: Repository<Testimonial>;

  constructor() {
    this.repo = AppDataSource.getRepository(Testimonial);
  }

  async findAll(): Promise<Testimonial[]> {
    return this.repo.find();
  }

  async create(
    name: string,
    text: string,
    rating: number,
  ): Promise<Testimonial> {
    const testimonial = this.repo.create({ name, text, rating });
    return this.repo.save(testimonial);
  }
}
