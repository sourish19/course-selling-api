import { prisma } from '../../lib/prisma';
import {
  ConflictError,
  ForbiddenError,
  UnauthorizedError,
} from '../../config/api-error';
import { comparePassword, hashPassword } from '../../lib/password';
import type { Signup, FindUserParams, Signin } from './types';
import { logger } from '../../lib/winston-logger';
import prismaError from '../../lib/prisma-error';

export const findUserService = async ({ email, role }: FindUserParams) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email,
        role,
      },
    });

    if (!user) return null;

    return user;
  } catch (error) {
    logger.error('Failed to find user', { email, error });
    prismaError(error);
  }
};

export const signupService = async ({
  name,
  email,
  password,
  role,
}: Signup) => {
  try {
    const validUser = await findUserService({ email, role });

    if (validUser) throw new ConflictError('Email already exists');

    const hashedPassword = await hashPassword(password);

    return await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role,
      },
    });
  } catch (error) {
    prismaError(error);
  }
};

export const signinService = async ({ email, password, role }: Signin) => {
  try {
    const validUser = await findUserService({ email, role });

    if (!validUser) throw new ForbiddenError();

    const isPasswordValid = await comparePassword(validUser.password, password);

    if (!isPasswordValid) throw new UnauthorizedError('Invalid credentials');

    return validUser;
  } catch (error) {
    prismaError(error);
  }
};
