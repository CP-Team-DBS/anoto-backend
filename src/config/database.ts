import { DataSource } from 'typeorm';
import { Testimonial } from '../entities/Testimonial';
import { Statistic } from '../entities/Statistic';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: true,
  entities: [Testimonial, Statistic],
});
