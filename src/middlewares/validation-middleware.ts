import * as z from 'zod';
import { logger } from '../lib/winston-logger';
import { ValidationError } from '../config/api-error';
import type { Request, Response, NextFunction, RequestHandler } from 'express';

const validationMiddleware = (schema: z.ZodType): RequestHandler => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (result.success) return next();
    if (result.error instanceof z.ZodError) {
      logger.warn(result.error);
      throw new ValidationError(
        'Validation Error',
        [z.flattenError(result.error).fieldErrors],
        []
      );
    }
  };
};

export default validationMiddleware;
