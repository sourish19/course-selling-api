import type { Request, Response, NextFunction, RequestHandler } from 'express';

type THandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<unknown>;

const asyncHandler =
  (requestHandler: THandler): RequestHandler =>
  (req, res, next) =>
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));

export default asyncHandler;
