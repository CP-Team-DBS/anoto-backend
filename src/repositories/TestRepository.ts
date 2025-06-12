import { Repository } from 'typeorm';
import { Statistic } from '../entities/Statistic';
import { TestSchema } from '../schemas/testSchema';
import request from '../utils/request';
import { AppDataSource } from '../config/database';
import { Request } from '@hapi/hapi';

type TestResult = {
  total_score: number;
  anxiety_level: string;
  anxiety_label_encoded: number;
  message: string;
};

export class TestRepository {
  private statRepo: Repository<Statistic>;

  constructor() {
    this.statRepo = AppDataSource.getRepository(Statistic);
  }

  private getClientIP(request: Request): string {
    // Cloudflare IP
    const cfIP = request.headers['cf-connecting-ip'];
    if (cfIP) return cfIP;

    const forwardedFor = request.headers['x-forwarded-for'];
    if (forwardedFor) {
      return forwardedFor.split(',')[0].trim();
    }

    return request.info.remoteAddress;
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
      const clientIP = this.getClientIP(req);

      const existingRecord = await this.statRepo.findOne({
        where: { ipAddress: clientIP },
      });

      if (existingRecord) {
        existingRecord.isAnxiety = result.total_score >= 10;
        await this.statRepo.save(existingRecord);
      } else {
        await this.statRepo.save(
          this.statRepo.create({
            isAnxiety: result.total_score >= 10,
            ipAddress: clientIP,
          }),
        );
      }

      return result;
    } catch (error) {
      console.log(error);
      throw new Error('GAD7 API error');
    }
  }
}
