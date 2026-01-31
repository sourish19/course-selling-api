import type { NextFunction, Request, Response } from 'express';
import { logger } from '../lib/winston-logger';
import { ApiError } from '../config/api-error';

const globalErrorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof ApiError) {
    res.status(error.status).json({
      success: error.success,
      message: error.message,
      code: error.code,
      error: error.error,
    });
    next();
  }
  logger.error('Unhandled error', error);

  let message = 'Internal Server Error';
  if (error instanceof Error) {
    message = error.message;
  }

  res.status(500).json({
    success: false,
    message,
    code: 'INTERNAL_SERVER_ERROR',
    error: [],
  });

  next();
};

export default globalErrorMiddleware;
