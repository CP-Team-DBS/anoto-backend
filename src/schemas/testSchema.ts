import Joi from 'joi';
import { createResponseSchema } from '../utils/schema';

export type TestSchema = {
  values: {
    question: string;
    answer: string;
  }[];
};

export const TestObject = Joi.object({
  total_score: Joi.number().example(10),
  anxiety_level: Joi.string().example('Rendah'),
  anxiety_label_encoded: Joi.number().example(1),
  message: Joi.string().example(
    'Tingkat kecemasan Anda tergolong Normal. Tetap jaga keseimbangan aktivitas harian dan istirahat yang cukup.',
  ),
});

export const getResponse = createResponseSchema(
  'Test Result',
  TestObject,
  'result',
).label('Get Test Result Response');
