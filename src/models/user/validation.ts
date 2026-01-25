import { password } from 'bun';
import * as z from 'zod';

const SignupSchema = z.object({
  email: z
    .string()
    .min(1, { error: 'Email is required' })
    .max(50, { error: 'Email is too long' })
    .email({ error: 'Email is not valid' })
    .trim()
    .toLowerCase(),
  name: z.string().min(1, { error: 'Email is required' }).trim().toLowerCase(),
  password: z.string().min(1, { error: 'Password is required' }),
  role: z.enum(['STUDENT', 'INSTRUCTOR']),
});

const SigninSchema = z.object({
  email: z.string().min(1, { error: 'Email is required' }),
  password: z.string().min(1, { error: 'Password is required' }),
});
