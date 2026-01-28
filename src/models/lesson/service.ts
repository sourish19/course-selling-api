import { prisma } from '../../lib/prisma';
import type User from '../../types/auth';
import {
  InternalServerError,
  NotFoundError,
  UnauthorizedError,
} from '../../config/api-error';
import type { Lesson } from '../../generated/prisma/client';

export const createLessonService = async (user: User, data: Lesson) => {
  // * This is for checkinhg if the course is created by original instructor
  const isValidCourse = prisma.course.findFirst({
    where: {
      id: data.courseId,
      instructorId: user.id,
    },
  });

  if (!isValidCourse) throw new UnauthorizedError();

  const lesson = await prisma.lesson.create({
    data: {
      title: data.title,
      content: data.content,
      courseId: data.courseId,
    },
  });

  if (!lesson) throw new InternalServerError();

  return lesson;
};

export const getLessonService = async (courseId: string) => {
  const lessons = await prisma.lesson.findMany({
    where: {
      courseId,
    },
  });

  if (!lessons) throw new NotFoundError();

  return lessons;
};
