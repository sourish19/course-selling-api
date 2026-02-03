import { prisma } from '../../lib/prisma';
import {
  ConflictError,
  ForbiddenError,
  InternalServerError,
  UnauthorizedError,
} from '../../config/api-error';
import { comparePassword, hashPassword } from '../../lib/password';
import type { Signup, FindUserParams, Signin } from './types';
import { logger } from '../../lib/winston-logger';

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
    throw error;
  }
};

export const signupService = async ({
  name,
  email,
  password,
  role,
}: Signup) => {
  const validUser = await findUserService({ email, role });

  if (validUser) throw new ConflictError('Email already exists');

  const hashedPassword = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
      role,
    },
  });

  if (!user) throw new InternalServerError();

  return user;
};

export const signinService = async ({ email, password, role }: Signin) => {
  const validUser = await findUserService({ email, role });

  if (!validUser) throw new ForbiddenError();

  const isPasswordValid = await comparePassword(validUser.password, password);

  if (!isPasswordValid) throw new UnauthorizedError('Invalid credentials');

  return validUser;
};
