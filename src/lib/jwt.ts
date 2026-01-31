import jwt from 'jsonwebtoken';
import { ENV } from '../config/env';
import type { User } from '../generated/prisma/client';
import { logger } from './winston-logger';

export const generateJwtToken = ({ id, role }: Pick<User, 'id' | 'role'>) => {
  try {
    const token = jwt.sign({ id, role }, ENV.JWT_SECRET, {
      expiresIn: ENV.JWT_EXP,
    });
    return token;
  } catch (error) {
    logger.error('Error occured in generating JWT token', error);
    throw error;
  }
};
