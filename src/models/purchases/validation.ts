import * as z from 'zod';

export const CreatePurchaseDetailsSchema = z.object({
  courseId: z.string().min(1, { error: 'CourseId is required' }),
});
