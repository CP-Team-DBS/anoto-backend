type ResponseSuccess<T extends object = object> = {
  error: false;
  message: string;
  data?: T;
};

type ResponseError = {
  error: true;
  statusCode: number;
  message: string;
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

export function errorResponse(
  message: string,
  statusCode: number,
): ResponseError {
  return {
    error: true,
    statusCode,
    message,
  };
}
