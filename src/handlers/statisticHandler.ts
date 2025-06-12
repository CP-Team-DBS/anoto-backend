import { Request, ResponseToolkit } from '@hapi/hapi';
import { StatisticRepository } from '../repositories/StatisticRepository';

import { successResponse } from '../utils/response';

const statisticRepo = new StatisticRepository();

export const getStatistics = async (request: Request, h: ResponseToolkit) => {
  const stats = await statisticRepo.getStats();

  return h.response(
    successResponse('Statistics fetched successfully', { stats }),
  );
};
