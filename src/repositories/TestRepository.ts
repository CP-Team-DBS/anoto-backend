import { TestSchema } from '../schemas/testSchema';
import request from '../utils/request';

type TestResult = {
  total_score: number;
  anxiety_level: string;
  anxiety_label_encoded: number;
  message: string;
};

export class TestRepository {
  async getResult(data: TestSchema): Promise<TestResult> {
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

    return (await response.json()) as TestResult;
  }
}
