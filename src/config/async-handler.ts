import type { Request, Response, NextFunction, RequestHandler } from 'express';

type THandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<unknown>;

const async_Handler =
  (requestHandler: THandler): RequestHandler =>
  (req, res, next) =>
    Promise.resolve(requestHandler(req, res, next)).catch(next);

export default async_Handler;
