import { prisma } from '../../lib/prisma';
import { ConflictError, NotFoundError } from '../../config/api-error';
import type { CreateCourseSchemaType } from './validation';
import type User from '../../types/auth';
import type { UpdateCourseDetails } from './types';
import prismaError from '../../lib/prisma-error';

export const createCourseService = async (
  user: User,
  courseData: CreateCourseSchemaType
) => {
  try {
    const courseAlreadyExists = await prisma.course.findFirst({
      where: {
        title: courseData.title,
        description: courseData.description,
        instructorId: user.id,
      },
    });

    if (courseAlreadyExists) throw new ConflictError();

    return await prisma.course.create({
      data: {
        title: courseData.title,
        description: courseData.description,
        price: courseData.price,
        instructorId: user.id,
      },
    });
  } catch (error) {
    prismaError(error);
  }
};

export const getAllCoursesService = async (page: number, limit: number) => {
  try {
    // * Since its nit a big db query, so its better to use Promis.all instead of transactions
    const { paginatedResults, totalCount } = await prisma.$transaction(
      async (tx) => {
        const paginatedResults = await tx.course.findMany({
          skip: (page - 1) * limit,
          take: limit,
          orderBy: {
            created_at: 'desc',
          },
        });

        const totalCount = await tx.course.count();

        return { paginatedResults, totalCount };
      }
    );
    return { paginatedResults, totalCount };
  } catch (error) {
    prismaError(error);
  }
};

export const getCourseByIdService = async (id: string) => {
  try {
    const course = await prisma.course.findUnique({
      where: {
        id,
      },
    });

    if (!course) throw new NotFoundError();

    return course;
  } catch (error) {
    prismaError(error);
  }
};

export const updateCourseByIdService = async (
  user: User,
  id: string,
  data: UpdateCourseDetails
) => {
  try {
    const existing = await prisma.course.findFirst({
      where: { id, instructorId: user.id },
    });

    if (!existing) throw new NotFoundError();

    return await prisma.course.update({
      where: {
        id,
        instructorId: user.id,
      },
      data,
    });
  } catch (error) {
    prismaError(error);
  }
};

export const deleteCourseByIdService = async (user: User, id: string) => {
  try {
    const existing = await prisma.course.findFirst({
      where: { id, instructorId: user.id },
    });

    if (!existing) throw new NotFoundError();

    return await prisma.course.delete({
      where: {
        id,
        instructorId: user.id,
      },
    });
  } catch (error) {
    prismaError(error);
  }
};

export const getCourseRevenueStatsService = async (user: User, id: string) => {
  try {
    const existing = await prisma.course.findFirst({
      where: {
        id,
        instructorId: user.id,
      },
      select: {
        id: true,
        price: true,
      },
    });

    if (!existing) throw new NotFoundError();

    const total_purchases = await prisma.purchase.count({
      where: {
        courseId: existing.id,
      },
    });

    return {
      total_purchases,
      totla_revenue: total_purchases * existing.price,
      course_price: existing.price,
    };
  } catch (error) {
    prismaError(error);
  }
};
