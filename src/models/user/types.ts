import type { SigninTypeValidation, SignupTypeValidation } from './validation';

export type SIGNUP = SignupTypeValidation;
export type SIGNIN = SigninTypeValidation;
export type FIND_USER_PARAMS = Pick<SignupTypeValidation, 'email' | 'role'>;
