import jwt, { type JwtPayload } from 'jsonwebtoken';
import asyncHandler from '../config/async-handler';
import { UnauthorizedError } from '../config/api-error';
import { ENV } from '../config/env';
import { prisma } from '../lib/prisma';

const authMiddleware = asyncHandler(async (req, res, next) => {
  const cookieToken = req.cookies?.token as string | undefined;

  const bearer = req.header('Authorization');

  const bearerToken = bearer?.split('Bearer ')[1];

  const tokenToVerify = cookieToken || bearerToken;

  if (!tokenToVerify) throw new UnauthorizedError();

  const verifyToken = jwt.verify(tokenToVerify, ENV.JWT_SECRET) as JwtPayload;

  if (!verifyToken) throw new UnauthorizedError();

  const user = await prisma.user.findUnique({
    where: {
      id: verifyToken?.id,
    },
  });

  if (!user) throw new UnauthorizedError();

  req.user = user;

  next();
});

export default authMiddleware;
