import * as z from 'zod';
import { logger } from '../lib/winston-logger';

const EnvSchema = z.object({
  PORT: z.coerce.number().int().positive(),
  NODE_ENV: z.enum(['development', 'production']),
  JWT_SECRET: z.string().min(1, { error: 'JWT_SECRET is required' }),
  JWT_EXP: z
    .string()
    .min(1, { error: 'JWT_EXP is required' })
    .regex(/^\d+[smhd]$/, 'Invalid JWT expiry format'),
  DATABASE_URL: z.string().min(1, { error: 'DATABASE_URL is required' }),
});

const parsedData = EnvSchema.safeParse(process.env);

if (!parsedData.success) {
  logger.error('Invalid environment variables');
  logger.error(z.treeifyError(parsedData.error));
  process.exit(1);
}

export const ENV = parsedData.data;
