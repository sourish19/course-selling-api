import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';
import { ENV } from './config/env';
import { logger } from './lib/winston-logger';
import globalErrorMiddleware from './middlewares/global-error-middleware';
import userRouter from './models/user/route';
import coursesRouter from './models/courses/route';
import lessonRouter from './models/lesson/route';
import type { Request, NextFunction } from 'express';

const app = express();
const PORT = ENV.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

if (ENV.NODE_ENV !== 'production') {
  app.use((req: Request, _res, next: NextFunction) => {
    logger.debug(`${req.method} ${req.url}`);
    next();
  });
}

app.use('/', userRouter);
app.use('/', coursesRouter);
app.use('/', lessonRouter);

app.use(globalErrorMiddleware);

app.listen(PORT, () => {
  logger.info(`Server running on Port ${PORT}`);
});
