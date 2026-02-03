import { Router } from 'express';
import {
  createCourse,
  getCourseById,
  getAllCourses,
  deleteCourseById,
  updateCourseById,
} from './handler';
import { CreateCourseSchema } from './validation';
import validationMiddleware from '../../middlewares/validation-middleware';
import authMiddleware from '../../middlewares/auth-middleware';
import authorizeRole from '../../middlewares/authorize-role-middleware';

const router = Router();

// only user whose role is INSTRUCTOR can hit these three endpoints
router
  .route('/courses')
  .post(
    authMiddleware,
    authorizeRole,
    validationMiddleware(CreateCourseSchema),
    createCourse
  );
router
  .route('/courses/:id')
  .patch(authMiddleware, authorizeRole, updateCourseById);
router
  .route('/courses/:id')
  .delete(authMiddleware, authorizeRole, deleteCourseById);

// These two are public endpoints
router.route('/courses').get(getAllCourses);
router.route('/courses/:id').get(getCourseById);

export default router;
