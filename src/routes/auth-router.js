import { Router } from 'express';
import controller from '../controllers/auth-controller.js';

const authRouter = new Router();

authRouter.route('/login').post(controller.login);

authRouter.route('/signup').post(controller.signup);

export default authRouter;
