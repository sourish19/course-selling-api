import * as z from 'zod';

export const CreateCourseSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, { error: 'Title is required' })
    .max(100, { error: 'Title must be at most 100 characters' }),

  description: z
    .string()
    .trim()
    .max(1000, { error: 'Description must be at most 1000 characters' })
    .optional(),

  price: z.coerce.number().positive({ error: 'Price must be greater than 0' }),
});

export const PaginatedSchema = z.object({
  page: z
    .string()
    .optional()
    .transform((val) => (val ? Number(val) : 1))
    .refine((val) => Number.isInteger(val) && val > 0, {
      message: 'page must be a positive integer',
    }),
  limit: z
    .string()
    .optional()
    .transform((val) => (val ? Number(val) : 10))
    .refine((val) => Number.isInteger(val) && val > 0, {
      message: 'limit must be a positive integer',
    }),
});

export type CreateCourseSchemaType = z.infer<typeof CreateCourseSchema>;
export type PaginatedSchemaType = z.infer<typeof PaginatedSchema>;
