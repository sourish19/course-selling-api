import { Router } from 'express';
import { getAllPurchasedCourses, purchaseCourse } from './handler';
import authMiddleware from '../../middlewares/auth-middleware';

const router = Router();

router.route('/purchases').post(authMiddleware, purchaseCourse);
router
  .route('/users/:id/purchases')
  .get(authMiddleware, getAllPurchasedCourses);

  export default router