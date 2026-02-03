import { BadRequestError } from '../../config/api-error';
import ApiResponse from '../../config/api-response';
import asyncHandler from '../../config/async-handler';
import {
  createCourseService,
  getAllCoursesService,
  getCourseByIdService,
  updateCourseByIdService,
  deleteCourseByIdService,
} from './service';
import type { UpdateCourseDetails } from './types';
import type { CreateCourseSchemaType } from './validation';

export const createCourse = asyncHandler(async (req, res) => {
  const user = req.user;
  const courseData: CreateCourseSchemaType = req.body;

  const course = await createCourseService(user, courseData);

  res
    .status(200)
    .json(new ApiResponse(200, 'Course created successfully', course));
});

export const getAllCourses = asyncHandler(async (req, res) => {
  console.log('Hiiiuiuiu');
  const getCourses = await getAllCoursesService();

  res.status(200).json(new ApiResponse(200, 'Fetched all courses', getCourses));
});

export const getCourseById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) throw new BadRequestError();

  const getCourses = await getCourseByIdService(id as string);

  res.status(200).json(new ApiResponse(200, 'Fetched course', getCourses));
});

export const updateCourseById = asyncHandler(async (req, res) => {
  const user = req.user;
  const { id } = req.params;
  const data: UpdateCourseDetails = req.body;

  if (!id) throw new BadRequestError();

  const updatedCourse = await updateCourseByIdService(user, id as string, data);

  res
    .status(200)
    .json(new ApiResponse(200, 'Course updated successfully', updatedCourse));
});

export const deleteCourseById = asyncHandler(async (req, res) => {
  const user = req.user;
  const { id } = req.params;

  if (!id) throw new BadRequestError();

  await deleteCourseByIdService(user, id as string);

  res.status(200).json(new ApiResponse(200, 'Course deleted', {}));
});
