import jwt, { type JwtPayload } from 'jsonwebtoken';
import asyncHandler from '../config/async-handler';
import { UnauthorizedError } from '../config/api-error';
import { ENV } from '../config/env';
import { prisma } from '../lib/prisma';
import sanatizeUser from '../lib/sanatize';

const authMiddleware = asyncHandler(async (req, res, next) => {
  const cookieToken = req.cookies?.token as string | undefined;

  const bearer = req.header('Authorization');

  // * Currently not using the header based token, otherwise just uncomment the below line
  // if(bearer?.slice(0,6).toLowerCase() !== 'bearer') throw new UnauthorizedError();

  const bearerToken = bearer?.slice(6).trim();

  // * This is wrong approach for taking token from either cookie or from header
  // * Either take it from one format or make two diff middleware
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

  req.user = sanatizeUser(user);

  next();
});

export default authMiddleware;
