type ResponseSuccess<T extends object = object> = {
  error: false;
  message: string;
  data?: T;
};

type ResponseError<T extends object = object> = {
  error: true;
  statusCode: number;
  message: string;
  data?: T;
};

export function successResponse<T extends object>(
  message: string,
  data?: T,
): ResponseSuccess<T> {
  return {
    error: false,
    message,
    ...(data ? { data } : {}),
  };
}

export function errorResponse<T extends object = object>(
  message: string,
  statusCode: number,
  data?: T,
): ResponseError<T> {
  return {
    error: true,
    statusCode,
    message,
    ...(data ? { data } : {}),
  };
}
