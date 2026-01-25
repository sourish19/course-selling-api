import ApiResponse from '../../config/api-response';
import async_Handler from '../../config/async-handler';
import { generate_Token } from '../../lib/jwt';
import sanatize_User from '../../lib/sanatize';
import { signin_Service, signup_Service } from './service';
import cookie_Options from '../../config/cookies';
import type { SIGNIN, SIGNUP } from './types';
import { UnauthorizedError } from '../../config/api-error';

export const signup_Handler = async_Handler(async (req, res) => {
  const { name, email, password, role }: SIGNUP = req.body;

  const userSignup = await signup_Service({ name, email, password, role });

  const sanatizedUser = sanatize_User(userSignup);

  res
    .status(201)
    .json(new ApiResponse(201, 'User created successfully', sanatizedUser));
});

export const signin_Handler = async_Handler(async (req, res) => {
  const { email, password, role }: SIGNIN = req.body;

  const userSignin = await signin_Service({ email, password, role });

  const generateToken = generate_Token({ id: userSignin.id, role });

  res.status(200).cookie('token', generateToken, cookie_Options);
});

export const logout_Handler = async_Handler(async (req, res) => {
  if (!req.user) throw new UnauthorizedError();

  res.status(200).clearCookie('token', cookie_Options);
});
