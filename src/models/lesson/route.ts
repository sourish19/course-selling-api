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
// * This is a public route for now, if needed to make it private like only
// * enrolled user is able to fetch lesson then need to add a middleware & one check
router.route('/courses/:courseId/lessons').get(getLesson);

export default router;
