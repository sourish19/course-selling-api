import type { Request, Response, NextFunction, RequestHandler } from 'express';

const async_Handler = async (
  requestHandler: RequestHandler
): Promise<unknown> => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(requestHandler).catch(next);
  };
};

export default async_Handler;
