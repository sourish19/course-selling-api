export class ApiError<E> extends Error {
  public readonly success = false;
  public readonly status: number;
  public readonly error: E[];
  public readonly code: string;
  constructor(
    status = 500,
    message = 'Something went wrong',
    error: E[] = [],
    code = 'SERVER_ERROR',
    stack?: string
  ) {
    super(message);
    this.status = status;
    this.name = this.constructor.name;
    this.error = error;
    this.code = code;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export class BadRequestError<E> extends ApiError<E> {
  constructor(message = 'Bad request', error: E[] = [], stack?: string) {
    super(400, message, error, 'BAD_REQUEST', stack);
  }
}

export class UnauthorizedError<E> extends ApiError<E> {
  constructor(
    message = 'Unauthorized request',
    error: E[] = [],
    stack?: string
  ) {
    super(401, message, error, 'UNAUTHORIZED', stack);
  }
}

export class ForbiddenError<E> extends ApiError<E> {
  constructor(message = 'Forbidden request', error: E[] = [], stack?: string) {
    super(403, message, error, 'FORBIDDEN', stack);
  }
}

export class NotFoundError<E> extends ApiError<E> {
  constructor(message = 'Resource not found', error: E[] = [], stack?: string) {
    super(404, message, error, 'NOT_FOUND', stack);
  }
}

export class ConflictError<E> extends ApiError<E> {
  constructor(
    message = 'Resource already exists',
    error: E[] = [],
    stack?: string
  ) {
    super(409, message, error, 'CONFLICT', stack);
  }
}

export class ValidationError<E> extends ApiError<E> {
  constructor(message = 'Validation failed', error: E[] = [], stack?: string) {
    super(422, message, error, 'VALIDATION_ERROR', stack);
  }
}

export class InternalServerError<E> extends ApiError<E> {
  constructor(
    message = 'Internal server error',
    error: E[] = [],
    stack?: string
  ) {
    super(500, message, error, 'SERVER_ERROR', stack);
  }
}

export class TooManyRequests<E> extends ApiError<E> {
  constructor(message = 'Too many requests', error: E[] = [], stack?: string) {
    super(429, message, error, 'TOO_MANY_REQUESTS', stack);
  }
}
