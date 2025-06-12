import { Request, ResponseToolkit } from '@hapi/hapi';
import { JournalRepository } from '../repositories/JournalRepository';
import { JournalSchema } from '../schemas/journalSchema';
import { successResponse } from '../utils/response';
import { JournalResource } from '../resources/JournalResource';

const journalRepo = new JournalRepository();

export const getResult = async (request: Request, h: ResponseToolkit) => {
  const data = request.payload as JournalSchema;
  const result = await journalRepo.getResult(data.text);

  return h
    .response(
      successResponse('Journal Result', {
        result: JournalResource.make(result),
      }),
    )
    .code(200);
};
