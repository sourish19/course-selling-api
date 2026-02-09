import { prisma } from '../../lib/prisma';
import type User from '../../types/auth';
import { NotFoundError } from '../../config/api-error';
import type { UpdateLessonDetails } from './types';
import prismaError from '../../lib/prisma-error';

export const createLessonService = async (
  user: User,
  data: UpdateLessonDetails
) => {
  try {
    // * This is for checkinhg if the course is created by original instructor
    const isValidCourse = await prisma.course.findFirst({
      where: {
        id: data.courseId,
        instructorId: user.id,
      },
    });

    if (!isValidCourse)
      throw new NotFoundError('You are not the course instructor');

    return await prisma.lesson.create({
      data: {
        title: data.title,
        content: data.content,
        courseId: data.courseId,
      },
    });
  } catch (error) {
    prismaError(error);
  }
};

export const getLessonService = async (courseId: string) => {
  try {
    return await prisma.lesson.findMany({
      where: {
        courseId,
      },
    });
  } catch (error) {
    prismaError(error);
  }
};
