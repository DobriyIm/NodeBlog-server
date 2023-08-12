import express from 'express';
import postRouter from './routes/post-router.js';
import userRouter from './routes/user-router.js';

const app = express();

app.use(express.json());

app.use('/users', userRouter);
app.use('/posts', postRouter);

export default app;
