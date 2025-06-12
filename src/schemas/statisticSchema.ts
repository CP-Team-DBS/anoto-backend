import Joi from 'joi';
import { createResponseSchema } from '../utils/schema';

const statisticObject = Joi.object({
  total: Joi.number().example(100),
  anxiety: Joi.number().example(50),
  percentage: Joi.number().example(50),
}).label('Statistic Object');

export const getResponse = createResponseSchema(
  'Statistics fetched successfully',
  statisticObject,
  'stats',
).label('Get Statistics Response');
