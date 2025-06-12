import Joi from 'joi';
import { createResponseSchema } from '../utils/schema';

export type EmotionItem = {
  name: string;
  score: number;
};

export type JournalSchema = {
  text: string;
};

export type EmotionsSchema = EmotionItem[];

export type JournalResultSchema = {
  predicted_emotions: EmotionsSchema;
  insight: string;
  validation: string;
  saran: string[];
};

const journalObject = Joi.object({
  emotions: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().example('anxiety'),
        score: Joi.number().example(2),
      }),
    )
    .example([
      { name: 'nervousness', score: 3 },
      { name: 'anxiety', score: 2 },
      { name: 'fear', score: 1 },
    ]),
  insight: Joi.string().example(
    'gelisah lumayan, kesedihan sedikit, rasa malu lumayan',
  ),
  validation: Joi.string().example(
    'Rasanya berat ya lagi ngerasain gelisah dan malu, aku ngerti kok,  kadang kita memang butuh waktu untuk melewati perasaan kayak gini.',
  ),
  saran: Joi.array().example([
    'Lakukan aktivitas yang menenangkan, seperti mendengarkan musik yang menenangkan, membaca buku, atau mandi air hangat.',
    'Hubungi orang terdekat yang Anda percayai dan bicarakan perasaan Anda.  Jangan ragu untuk meminta dukungan.',
  ]),
}).label('Journal Object');

export const getResponse = createResponseSchema(
  'Journal Result fetched successfully',
  journalObject,
  'result',
).label('Get Journal Result Response');
