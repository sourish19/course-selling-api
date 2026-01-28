import type { Request, Response } from 'express';
import { logger } from '../lib/winston-logger';
import { ApiError } from '../config/api-error';

const globalErrorMiddleware = async (
  error: unknown,
  req: Request,
  res: Response
) => {
  if (error instanceof ApiError) {
    res.status(error.status).json({
      success: error.success,
      message: error.message,
      code: error.code,
      error: error.error,
      data: error.data,
    });
    return;
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
    data: [],
  });
};

export default globalErrorMiddleware;
