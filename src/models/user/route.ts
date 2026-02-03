import { Router } from 'express';
import { signup, signin, logout, getUser } from './handler';
import { SignupSchema, SigninSchema } from './validation';
import authMiddleware from '../../middlewares/auth-middleware';
import validationMiddleware from '../../middlewares/validation-middleware';

const router = Router();

router.route('/auth/signup').post(validationMiddleware(SignupSchema), signup);
router.route('/auth/signin').post(validationMiddleware(SigninSchema), signin);
router.route('/auth/logout').post(authMiddleware, logout);
router.route('/auth/me').get(authMiddleware, getUser);

export default router;
