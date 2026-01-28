import type { Course } from '../../generated/prisma/client';

export type UpdateCourseDetails = Partial<
  Pick<Course, 'title' | 'description' | 'price'>
>;
