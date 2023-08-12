import { Router } from 'express';
import controller from '../controllers/post-controller.js';

const postRouter = new Router();

postRouter
	.route('/')
	.get(controller.getAll)
	.post(controller.createOne);

postRouter
	.route('/:id')
	.get(controller.getOne)
	.delete(controller.deleteOne);

export default postRouter;
