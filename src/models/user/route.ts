import { Router } from 'express';
import { signup_Handler, signin_Handler, logout_Handler } from './handler';
import auth_Middleware from '../../middlewares/auth-middleware';

const router = Router();

router.route('/auth/signup').post(signup_Handler);
router.route('/auth/sigin').post(signin_Handler);
router.route('/auth/logout').post(auth_Middleware,logout_Handler);
