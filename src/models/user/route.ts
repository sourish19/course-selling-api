import { Router } from 'express';
import { signup, signin, logout } from './handler';
import { SignupSchema, SigninSchema } from './validation';
import authMiddleware from '../../middlewares/auth-middleware';
import validationMiddleware from '../../middlewares/validation-middleware';

const router = Router();

router.route('/auth/signup').post(validationMiddleware(SignupSchema), signup);
router.route('/auth/sigin').post(validationMiddleware(SigninSchema), signin);
router.route('/auth/logout').post(authMiddleware, logout);
