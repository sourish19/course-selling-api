import jwt, { type JwtPayload } from 'jsonwebtoken';
import async_Handler from '../config/async-handler';
import { UnauthorizedError } from '../config/api-error';
import { ENV } from '../config/env';
import { prisma } from '../lib/prisma';

const auth_Middleware = async_Handler(async (req, res, next) => {
  const { token: cookieToken }: { token: string | undefined } = req.cookies;

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

export default auth_Middleware;
