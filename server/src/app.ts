import 'reflect-metadata';
import 'express-async-errors';
import './database';

import express, { NextFunction, Request, Response } from 'express';
import { errors } from 'celebrate';

import { routes } from './routes';
import AppError from './errors/AppError';

const app = express();

app.use(express.json());
app.use(routes);
app.use(errors());

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response
      .status(err.statusCode)
      .json({ status: 'error', message: err.message });
  }

  return response
    .status(500)
    .json({ status: 'error', message: 'Internal Server Error' });
});

export { app };
