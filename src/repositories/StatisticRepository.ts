import { Repository } from 'typeorm';
import { Statistic } from '../entities/Statistic';
import { AppDataSource } from '../config/database';
import { Request } from '@hapi/hapi';

type StatsResult = {
  total: number;
  anxiety: number;
  percentage: number;
};

export class StatisticRepository {
  private repo: Repository<Statistic>;

  constructor() {
    this.repo = AppDataSource.getRepository(Statistic);
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

  async create(request: Request, score: number): Promise<void> {
    const clientIP = this.getClientIP(request);
    const existingRecord = await this.repo.findOne({
      where: { ipAddress: clientIP },
    });

    if (existingRecord) {
      existingRecord.isAnxiety = score >= 10;
      await this.repo.save(existingRecord);
    } else {
      await this.repo.save(
        this.repo.create({
          isAnxiety: score >= 10,
          ipAddress: clientIP,
        }),
      );
    }
  }

  async getStats(): Promise<StatsResult> {
    const [total, anxiety] = await Promise.all([
      this.repo.count(),
      this.repo.count({ where: { isAnxiety: true } }),
    ]);

    const percentage = total > 0 ? Math.round((anxiety / total) * 100) : 0;

    return {
      total,
      anxiety,
      percentage,
    };
  }
}
