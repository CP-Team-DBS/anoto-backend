import { Request, ResponseToolkit } from '@hapi/hapi';
import { TestSchema } from '../schemas/testSchema';
import { TestRepository } from '../repositories/TestRepository';
import { errorResponse, successResponse } from '../utils/response';

const testRepo = new TestRepository();

export const getResult = async (request: Request, h: ResponseToolkit) => {
  try {
    const result = await testRepo.getResult(
      request.payload as TestSchema,
      request,
    );

    return h.response(successResponse('Test Result', { result })).code(200);
  } catch (error) {
    if (error instanceof Error)
      return h.response(errorResponse(error.message, 500)).code(500);

    return h
      .response(errorResponse('Terjadi kesalahan pada server', 500))
      .code(500);
  }
};
