import async_Handler from '../../config/async-handler';
import { signin_Service, signup_Service } from './service';
import type { SIGNIN, SIGNUP } from './types';

export const signup_Handler = async_Handler(async (req, res) => {
  const { name, email, password, role }: SIGNUP = req.body;

  const signup = await signup_Service({ name, email, password, role });
});

export const signin_Handler = async_Handler(async (req, res) => {
  const { email, password, role }: SIGNUP = req.body;

  const signin = await signup_Service({ email, password, role });
});
