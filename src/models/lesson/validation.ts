import * as z from 'zod';

export const CreateLessonSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, { error: 'Title is required' })
    .max(100, { error: 'Title must be at most 100 characters' }),
  content: z
    .string()
    .trim()
    .min(1, { error: 'Content is required' })
    .max(100, { error: 'Content must be at most 100 characters' }),
  courseId: z.string(),
});

export type CreateLessonSchemaType = z.infer<typeof CreateLessonSchema>;
