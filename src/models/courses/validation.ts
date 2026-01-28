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

export type CreateCourseSchemaType = z.infer<typeof CreateCourseSchema>;
