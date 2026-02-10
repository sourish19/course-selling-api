import * as z from 'zod';
import { logger } from '../lib/winston-logger';
import { ValidationError } from '../config/api-error';
import type { Request, Response, NextFunction, RequestHandler } from 'express';

type ValidationSource = 'body' | 'params' | 'query';

// * Instead of using req.validateQuery I can use this approach which overwrites req.query which isnot good
// const updateQuery = <T>(req: Request, value: T) => {
//   Object.defineProperty(req, 'query', {
//     ...Object.getOwnPropertyDescriptor(req, 'query'),
//     writable: false,
//     value,
//   });
// };

const validationMiddleware =
  (schema: z.ZodType, source: ValidationSource = 'body'): RequestHandler =>
  async (req: Request, _res: Response, next: NextFunction) => {
    const data = req[source];
    const result = schema.safeParse(data);
    if (result.success) {
      if (source === 'query') req.validatedQuery = result.data;
      return next();
    }
    if (result.error instanceof z.ZodError) {
      logger.warn(result.error);
      throw new ValidationError('Validation Error', [
        z.flattenError(result.error).fieldErrors,
      ]);
    }
  };

export default validationMiddleware;
