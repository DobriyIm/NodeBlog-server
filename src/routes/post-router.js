import { Router } from 'express';
import { authenticate } from '../controllers/auth-controller.js';
import controller from '../controllers/post-controller.js';

const postRouter = new Router();

postRouter
	.route('/')
	.get(controller.getAll)
	.post(authenticate, controller.createOne);

postRouter
	.route('/:id')
	.get(controller.getOne)
	.delete(authenticate, controller.deleteOne);

export default postRouter;
