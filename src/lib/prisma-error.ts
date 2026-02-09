import { Prisma } from '../generated/prisma/client';
import {
  ConflictError,
  NotFoundError,
  BadRequestError,
  InternalServerError,
} from '../config/api-error';

// * These are the most common err that occirs in prisma
const prismaError = (error: unknown) => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2002':
        throw new ConflictError('Resource already exists');

      case 'P2025':
        throw new NotFoundError('Resource not found');

      case 'P2003':
        throw new BadRequestError('Invalid reference');

      default:
        throw new InternalServerError();
    }
  }
  // * If its not a prisma err then just throw it
  // * mostky it will be logic error from sercive
  else throw error;
};

export default prismaError;
