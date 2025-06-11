import { TestSchema } from '../schemas/testSchema';
import request from '../utils/request';

type TestResult = {
  total_score: number;
  anxiety_level: string;
  anxiety_label_encoded: number;
  message: string;
};

export class TestRepository {
  async getResult(values: TestSchema): Promise<TestResult> {
    const response = await request(
      'https://gad7.anoto.my.id/predict',
      'POST',
      Object.fromEntries(
        values.answers.map((item) => [
          item.question.replace(/ /g, '_').toLowerCase(),
          item.answer,
        ]),
      ),
    );

    return (await response.json()) as TestResult;
  }
}
