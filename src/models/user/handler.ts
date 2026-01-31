import ApiResponse from '../../config/api-response';
import asyncHandler from '../../config/async-handler';
import { generateJwtToken } from '../../lib/jwt';
import sanatizeUser from '../../lib/sanatize';
import { signinService, signupService } from './service';
import cookie_Options from '../../config/cookies';
import type { Signin, Signup } from './types';
import { UnauthorizedError } from '../../config/api-error';

export const signup = asyncHandler(async (req, res) => {
  const user: Signup = req.body;

  const userSignup = await signupService(user);

  const sanatizedUser = sanatizeUser(userSignup);

  res
    .status(201)
    .json(new ApiResponse(201, 'User created successfully', sanatizedUser));
});

export const signin = asyncHandler(async (req, res) => {
  const { email, password, role }: Signin = req.body;

  const userSignin = await signinService({ email, password, role });

  const generateToken = generateJwtToken({
    id: userSignin.id,
    role,
  });

  const sanatizedUser = sanatizeUser(userSignin);

  res
    .status(200)
    .cookie('token', generateToken, cookie_Options)
    .json(new ApiResponse(200, 'Signin successfull', sanatizedUser));
});

export const logout = asyncHandler(async (req, res) => {
  if (!req.user) throw new UnauthorizedError();

  res.status(200).clearCookie('token', cookie_Options);
});
