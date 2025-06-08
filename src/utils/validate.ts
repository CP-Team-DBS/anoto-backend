import { Request, ResponseToolkit, Lifecycle } from '@hapi/hapi';
import { ObjectSchema } from 'joi';
import { errorResponse } from './response';

interface ValidationError {
  details: {
    message: string;
    path: string[];
  }[];
}

type ValidateSchemas = {
  payload?: ObjectSchema;
  params?: ObjectSchema;
  query?: ObjectSchema;
};

export function validate(schemas: ValidateSchemas) {
  const handleValidationError = (
    err: ValidationError,
    h: ResponseToolkit,
  ): Lifecycle.ReturnValue => {
    const errorsByField: Record<string, string> = {};

    err.details.forEach((detail) => {
      const field = detail.path.join('.');
      if (!errorsByField[field]) {
        errorsByField[field] = detail.message;
      }
    });

    return h
      .response(
        errorResponse('validation error', 422, {
          validations: errorsByField,
        }),
      )
      .code(422)
      .takeover();
  };

  const handleGenericError = (h: ResponseToolkit): Lifecycle.ReturnValue => {
    return h
      .response(
        errorResponse('validation error', 422, {
          validations: ['Validation failed.'],
        }),
      )
      .code(422)
      .takeover();
  };

  return {
    validate: {
      ...schemas,
      options: {
        abortEarly: false,
      },
      failAction: async (
        _: Request,
        h: ResponseToolkit,
        err: Lifecycle.ReturnValue,
      ): Promise<Lifecycle.ReturnValue> => {
        if (!(err instanceof Error && 'details' in err)) {
          return handleGenericError(h);
        }

        return handleValidationError(err as ValidationError, h);
      },
    },
  };
}
