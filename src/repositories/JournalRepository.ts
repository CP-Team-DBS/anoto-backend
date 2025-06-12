import request from '../utils/request';
import { JournalResultSchema } from '../schemas/journalSchema';

export class JournalRepository {
  async getResult(word: string) {
    const response = await request(
      `${process.env.JOURNAL_API_URL}/process-journal`,
      'POST',
      {
        journal_text: word,
      },
    );
    const rawResult = await response.json();
    const emotions = rawResult.predicted_emotions as Record<string, number>;
    const sortedEmotions = Object.entries(emotions)
      .filter(([, value]) => value > 0)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([name, score]) => ({ name, score }));

    const result: JournalResultSchema = {
      ...rawResult,
      predicted_emotions: sortedEmotions,
      saran: rawResult.saran
        .split('\n')
        .map((item: string) => item.replace(/^\d+\.\s*/, ''))
        .filter((item: string) => item.trim() !== ''),
    };

    return result;
  }
}
