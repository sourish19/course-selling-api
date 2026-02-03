import { UnauthorizedError } from '../config/api-error';
import asyncHandler from '../config/async-handler';
import { Role } from '../config/auth-constants';

const authorizeRole = asyncHandler(async (req, _res, next) => {
  const { role } = req.user;
  
  if (role === Role.INSTRUCTOR) return next();

  throw new UnauthorizedError();
});

export default authorizeRole;
