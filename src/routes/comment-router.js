import { Router } from 'express';
import controller from '../controllers/comment-controller.js';

const commentRouter = new Router();

commentRouter
	.route('/')
	.get(controller.getAll)
	.post(controller.createOne);

commentRouter
	.route('/:id')
	.get(controller.getOne)
	.delete(controller.deleteOne);

export default commentRouter;
