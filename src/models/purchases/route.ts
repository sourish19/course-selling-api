import { Router } from 'express';
import { getAllPurchasedCourses, purchaseCourse } from './handler';
import authMiddleware from '../../middlewares/auth-middleware';
import validationMiddleware from '../../middlewares/validation-middleware';
import { CreatePurchaseDetailsSchema } from './validation';

const router = Router();

router
  .route('/purchases')
  .post(
    authMiddleware,
    validationMiddleware(CreatePurchaseDetailsSchema),
    purchaseCourse
  );
router
  .route('/users/:id/purchases')
  .get(authMiddleware, getAllPurchasedCourses);

export default router;
