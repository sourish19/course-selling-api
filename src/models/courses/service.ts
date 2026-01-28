import { prisma } from '../../lib/prisma';
import {
  ConflictError,
  InternalServerError,
  NotFoundError,
} from '../../config/api-error';
import type { CreateCourseSchemaType } from './validation';
import type USER from '../../types/auth';
import type { UpdateCourseDetails } from './types';

export const createCourseService = async (
  user: USER,
  courseData: CreateCourseSchemaType
) => {
  const courseAlreadyExists = await prisma.course.findFirst({
    where: {
      title: courseData.title,
      description: courseData.description,
      price: courseData.price,
      instructorId: user.id,
    },
  });

  if (courseAlreadyExists) throw new ConflictError();

  const createCourse = await prisma.course.create({
    data: {
      title: courseData.title,
      description: courseData.description,
      price: courseData.price,
      instructorId: user.id,
    },
  });

  if (!createCourse) throw new InternalServerError();

  return createCourse;
};

/*
First check cookies 
then check the role 
then validate course data 
pass the user & course data to the service 
create a course using prisma.course.create

*/

export const getAllCoursesService = async () => {
  const courses = await prisma.course.findMany();

  if (!courses) throw new NotFoundError();

  return courses;
};

export const getCourseByIdService = async (id: string) => {
  const course = await prisma.course.findFirst({
    where: {
      id,
    },
  });

  if (!course) throw new NotFoundError();

  return course;
};

export const updateCourseByIdService = async (
  user: USER,
  id: string,
  data: UpdateCourseDetails
) => {
  const course = await prisma.course.update({
    where: {
      id,
      instructorId: user.id,
    },
    data,
  });

  if (!course) throw new NotFoundError();

  return course;
};

export const deleteCourseByIdService = async (user: USER, id: string) => {
  const course = await prisma.course.delete({
    where: {
      id,
      instructorId: user.id,
    },
  });

  if (!course) throw new InternalServerError();

  return course;
};
