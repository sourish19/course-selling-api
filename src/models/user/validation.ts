import * as z from 'zod';
import { Role } from '../../config/auth-constants';

export const SignupSchema = z.object({
  email: z
    .string()
    .min(1, { error: 'Email is required' })
    .max(50, { error: 'Email is too long' })
    .email({ error: 'Email is not valid' })
    .trim()
    .toLowerCase(),
  name: z.string().min(1, { error: 'Email is required' }).trim().toLowerCase(),
  password: z.string().min(1, { error: 'Password is required' }),
  role: z.enum(Role),
});

export const SigninSchema = z.object({
  email: z.string().min(1, { error: 'Email is required' }),
  password: z.string().min(1, { error: 'Password is required' }),
  role: z.enum(Role).default('STUDENT'),
});

export type SignupTypeValidation = z.infer<typeof SignupSchema>;
export type SigninTypeValidation = z.infer<typeof SigninSchema>;
