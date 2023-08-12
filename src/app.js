import express from 'express';
import commentRouter from './routes/comment-router.js';
import postRouter from './routes/post-router.js';
import userRouter from './routes/user-router.js';

const app = express();

app.use(express.json());

app.use('/users', userRouter);
app.use('/posts', postRouter);
app.use('/comments', commentRouter);
export default app;
