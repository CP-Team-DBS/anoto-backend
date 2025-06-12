import { TestSchema } from '../schemas/testSchema';
import request from '../utils/request';
import { Request } from '@hapi/hapi';
import { StatisticRepository } from './StatisticRepository';

type TestResult = {
  total_score: number;
  anxiety_level: string;
  anxiety_label_encoded: number;
  message: string;
};

export class TestRepository {
  private statRepo: StatisticRepository;

  constructor() {
    this.statRepo = new StatisticRepository();
  }

  async getResult(data: TestSchema, req: Request): Promise<TestResult> {
    try {
      const response = await request(
        `${process.env.GAD7_API_URL}/predict`,
        'POST',
        Object.fromEntries(
          data.values.map((item) => [
            item.question.replace(/ /g, '_').toLowerCase(),
            item.answer,
          ]),
        ),
      );

      const result = (await response.json()) as TestResult;
      await this.statRepo.create(req, result.total_score);

      return result;
    } catch (error) {
      console.log(error);
      throw new Error('GAD7 API error');
    }
  }
}
