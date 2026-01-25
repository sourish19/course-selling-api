import { prisma } from '../../lib/prisma';
import {
  ConflictError,
  ForbiddenError,
  InternalServerError,
  UnauthorizedError,
} from '../../config/api-error';
import { compare_Password, hash_Password } from '../../lib/password';
import type { SIGNUP, FIND_USER_PARAMS, SIGNIN } from './types';
import { logger } from '../../lib/winston-logger';

const find_User_Service = async ({ email, role }: FIND_USER_PARAMS) => {
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

export const signup_Service = async ({
  name,
  email,
  password,
  role,
}: SIGNUP) => {
  const validUser = await find_User_Service({ email, role });

  if (validUser) throw new ConflictError('Email already exists');

  const hashedPassword = await hash_Password(password);

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

export const signin_Service = async ({ email, password, role }: SIGNIN) => {
  const validUser = await find_User_Service({ email, role });

  if (!validUser) throw new ForbiddenError();

  const isPasswordValid = await compare_Password(validUser.password, password);

  if (!isPasswordValid) throw new UnauthorizedError('Invalid credentials');

  return validUser;
};
