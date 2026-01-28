import * as z from 'zod';
import asyncHandler from '../config/async-handler';
import { logger } from '../lib/winston-logger';
import { ValidationError } from '../config/api-error';

const validationMiddleware = (schema: z.ZodType) =>
  asyncHandler(async (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (result.success) next();
    else if (result.error instanceof z.ZodError) {
      logger.warn('Validation failed');
      throw new ValidationError('validation error', [
        z.flattenError(result.error).fieldErrors,
      ]);
    }
  });

export default validationMiddleware;
