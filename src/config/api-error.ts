export class ApiError<E, D> extends Error {
  public readonly success = false;
  public readonly status: number;
  public readonly error: E[];
  public readonly data: D[];
  public readonly code: string;
  constructor(
    status = 500,
    message = 'Something went wrong',
    error: E[] = [],
    data: D[] = [],
    code = 'SERVER_ERROR',
    stack?: string
  ) {
    super(message);
    this.status = status;
    this.name = this.constructor.name;
    this.error = error;
    this.data = data;
    this.code = code;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export class BadRequestError<E, D> extends ApiError<E, D> {
  constructor(
    message = 'Bad request',
    error: E[] = [],
    data: D[] = [],
    stack?: string
  ) {
    super(400, message, error, data, 'BAD_REQUEST', stack);
  }
}

export class UnauthorizedError<E, D> extends ApiError<E, D> {
  constructor(
    message = 'Unauthorized request',
    error: E[] = [],
    data: D[] = [],
    stack?: string
  ) {
    super(401, message, error, data, 'UNAUTHORIZED', stack);
  }
}

export class ForbiddenError<E, D> extends ApiError<E, D> {
  constructor(
    message = 'Forbidden request',
    error: E[] = [],
    data: D[] = [],
    stack?: string
  ) {
    super(403, message, error, data, 'FORBIDDEN', stack);
  }
}

export class NotFoundError<E, D> extends ApiError<E, D> {
  constructor(
    message = 'Resource not found',
    error: E[] = [],
    data: D[] = [],
    stack?: string
  ) {
    super(404, message, error, data, 'NOT_FOUND', stack);
  }
}

export class ConflictError<E, D> extends ApiError<E, D> {
  constructor(
    message = 'Resource already exists',
    error: E[] = [],
    data: D[] = [],
    stack?: string
  ) {
    super(409, message, error, data, 'CONFLICT', stack);
  }
}

export class ValidationError<E, D> extends ApiError<E, D> {
  constructor(
    message = 'Validation failed',
    error: E[] = [],
    data: D[] = [],
    stack?: string
  ) {
    super(422, message, error, data, 'VALIDATION_ERROR', stack);
  }
}

export class InternalServerError<E, D> extends ApiError<E, D> {
  constructor(
    message = 'Internal server error',
    error: E[] = [],
    data: D[] = [],
    stack?: string
  ) {
    super(500, message, error, data, 'SERVER_ERROR', stack);
  }
}

export class TooManyRequests<E, D> extends ApiError<E, D> {
  constructor(
    message = 'Too many requests',
    error: E[] = [],
    data: D[] = [],
    stack?: string
  ) {
    super(429, message, error, data, 'TOO_MANY_REQUESTS', stack);
  }
}
