import { EmotionsSchema, JournalResultSchema } from '../schemas/journalSchema';

export type JournalResponse = {
  emotions: EmotionsSchema;
  insight: string;
  validation: string;
  saran: string[];
};

export class JournalResource {
  static make(result: JournalResultSchema): JournalResponse {
    return {
      emotions: result.predicted_emotions,
      insight: result.insight,
      validation: result.validation,
      saran: result.saran,
    };
  }
}
