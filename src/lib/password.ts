import * as argon2 from 'argon2';
import { logger } from './winston-logger';

export const hashPassword = async (password: string) => {
  try {
    const hashPassword = await argon2.hash(password);
    return hashPassword;
  } catch (error) {
    logger.error('Error hashing password', error);
    throw error;
  }
};

export const comparePassword = async (
  password: string,
  hashedPassword: string
) => {
  try {
    const verifyPassword = await argon2.verify(password, hashedPassword);

    if (!verifyPassword) return false;

    return true;
  } catch (error) {
    logger.error('Error comparing password', error);
    throw error;
  }
};
