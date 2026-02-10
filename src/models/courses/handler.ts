import { BadRequestError } from '../../config/api-error';
import ApiResponse from '../../config/api-response';
import asyncHandler from '../../config/async-handler';
import { getValidatedQuery } from '../../lib/get-validated';
import {
  createCourseService,
  getAllCoursesService,
  getCourseByIdService,
  updateCourseByIdService,
  deleteCourseByIdService,
  getCourseRevenueStatsService,
} from './service';
import type { UpdateCourseDetails } from './types';
import type { CreateCourseSchemaType, PaginatedSchemaType } from './validation';

export const createCourse = asyncHandler(async (req, res) => {
  const user = req.user;
  const courseData: CreateCourseSchemaType = req.body;

  const course = await createCourseService(user, courseData);

  res
    .status(201)
    .json(new ApiResponse(201, 'Course created successfully', course));
});

export const getAllCourses = asyncHandler(async (req, res) => {
  const { page, limit } = getValidatedQuery<PaginatedSchemaType>(req);

  const paginatedResults = await getAllCoursesService(page, limit);

  res
    .status(200)
    .json(new ApiResponse(200, 'Fetched all courses', paginatedResults || {}));
});

export const getCourseById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) throw new BadRequestError();

  const course = await getCourseByIdService(id as string);

  res.status(200).json(new ApiResponse(200, 'Fetched course', course || {}));
});

export const updateCourseById = asyncHandler(async (req, res) => {
  const user = req.user;
  const { id } = req.params;
  const data: UpdateCourseDetails = req.body;

  if (!id) throw new BadRequestError();

  const updatedCourse = await updateCourseByIdService(user, id as string, data);

  res
    .status(200)
    .json(
      new ApiResponse(200, 'Course updated successfully', updatedCourse || {})
    );
});

export const deleteCourseById = asyncHandler(async (req, res) => {
  const user = req.user;
  const { id } = req.params;

  if (!id) throw new BadRequestError();

  await deleteCourseByIdService(user, id as string);

  res.status(200).json(new ApiResponse(200, 'Course deleted', {}));
});

export const getCourseRevenueStats = asyncHandler(async (req, res) => {
  const user = req.user;
  const { id } = req.params;

  if (!id) throw new BadRequestError();

  const revenue = await getCourseRevenueStatsService(user, id as string);

  res
    .status(200)
    .json(new ApiResponse(200, 'Course revenue fetched', revenue || {}));
});
