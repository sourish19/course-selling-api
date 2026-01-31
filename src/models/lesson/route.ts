import { Router } from 'express';
import { createLesson, getLesson } from './handler';
import validationMiddleware from '../../middlewares/validation-middleware';
import { CreateLessonSchema } from './validation';
import authMiddleware from '../../middlewares/auth-middleware';
import authorizeRole from '../../middlewares/authorize-role-middleware';

const router = Router();

router
  .route('/lessons')
  .post(
    authMiddleware,
    authorizeRole,
    validationMiddleware(CreateLessonSchema),
    createLesson
  );
router.route('/courses/:courseId/lessons').get(getLesson);

export default router;
