import type { Lesson } from '../../generated/prisma/client';

export type UpdateLessonDetails = Pick<Lesson, "title" | "content" | "courseId">
