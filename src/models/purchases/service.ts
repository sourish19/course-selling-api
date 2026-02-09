import {
  ConflictError,
  ForbiddenError,
  NotFoundError,
} from '../../config/api-error';
import { prisma } from '../../lib/prisma';
import prismaError from '../../lib/prisma-error';
import type User from '../../types/auth';
import type { updatePurchaseDetails } from './types';

export const purchaseCourseService = async (
  user: User,
  data: updatePurchaseDetails
) => {
  try {
    // * Start thr transaction...
    return await prisma.$transaction(async (tx) => {
      // * Check if the course already exists
      const foundCourse = await tx.course.findUnique({
        where: {
          id: data.courseId,
        },
      });

      if (!foundCourse) throw new NotFoundError('Course dosent exists');

      // * Checking if the user is not the instructor of this course
      const isInstructor = foundCourse.instructorId === user.id;

      if (isInstructor) throw new ForbiddenError();

      // * Check if this user already have this course
      const alreadyPurchased = await tx.purchase.findFirst({
        where: {
          userId: user.id,
          courseId: data.courseId,
        },
      });

      if (alreadyPurchased) throw new ConflictError('Already purchased');

      const purchase = await tx.purchase.create({
        data: {
          userId: user.id,
          courseId: data.courseId,
        },
      });

      return purchase;
    });
    // * End the transaction....
  } catch (error) {
    prismaError(error);
  }
};

export const getAllPurchasedCoursesService = async (userId: string) => {
  try {
    return await prisma.purchase.findMany({
      where: {
        userId,
      },
      include: {
        course: true,
      },
    });
  } catch (error) {
    prismaError(error);
  }
};
