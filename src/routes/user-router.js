import { Router } from 'express';
import controller from '../controllers/user-controllet.js';

const userRouter = new Router();

userRouter
	.route('/')
	.get(controller.getAll)
	.post(controller.createOne);

userRouter
	.route('/:id')
	.get(controller.getOne)
	.delete(controller.deleteOne);

export default userRouter;
