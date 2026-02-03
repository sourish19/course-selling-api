import { BadRequestError } from '../../config/api-error';
import ApiResponse from '../../config/api-response';
import asyncHandler from '../../config/async-handler';
import { createLessonService, getLessonService } from './service';
import type { UpdateLessonDetails } from './types';

export const createLesson = asyncHandler(async (req, res) => {
  const user = req.user;
  const data: UpdateLessonDetails = req.body;

  const lesson = await createLessonService(user, data);
  res
    .status(201)
    .json(new ApiResponse(200, 'Lesson created successfully', lesson));
});

export const getLesson = asyncHandler(async (req, res) => {
  const { courseId } = req.params;

  if (!courseId) throw new BadRequestError();

  const lessons = await getLessonService(courseId as string);

  res.status(200).json(new ApiResponse(200, 'Fetched Lessons', lessons));
});
