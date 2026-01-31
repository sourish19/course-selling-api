import type { SigninTypeValidation, SignupTypeValidation } from './validation';

export type Signup = SignupTypeValidation;
export type Signin = SigninTypeValidation;
export type FindUserParams = Pick<SignupTypeValidation, 'email' | 'role'>;
