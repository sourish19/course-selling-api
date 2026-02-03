import { ForbiddenError } from '../../config/api-error';
import ApiResponse from '../../config/api-response';
import asyncHandler from '../../config/async-handler';
import {
  getAllPurchasedCoursesService,
  purchaseCourseService,
} from './service';
import type { updatePurchaseDetails } from './types';

export const purchaseCourse = asyncHandler(async (req, res) => {
  const user = req.user;
  const data: updatePurchaseDetails = req.body;

  const coursePurchased = await purchaseCourseService(user, data);

  res
    .status(200)
    .json(new ApiResponse(200, 'Course purchased', coursePurchased));
});

export const getAllPurchasedCourses = asyncHandler(async (req, res) => {
  const user = req.user;
  const userId = req.params.id as string;

  if (!userId || userId !== user.id) throw new ForbiddenError();

  const purchasedCourses = await getAllPurchasedCoursesService(userId);

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        purchasedCourses.length !== 0
          ? 'Purchased courses fetched'
          : 'No courses purchased',
        purchasedCourses
      )
    );
});
