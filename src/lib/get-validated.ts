import type { Request } from 'express';

// * In this file I can add this kind of function for body as well as for params when required

export const getValidatedQuery = <T>(req: Request): T =>
  req.validatedQuery as T;
