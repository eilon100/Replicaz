import express from 'express';
import { router } from './routes';
import dotenv from 'dotenv';
require('express-async-errors');
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { errorHandler } from './middleware/error-handler';
import { NotFoundError } from './errors/not-found-error';

dotenv.config();

const app = express();

app.use(express.json({ limit: '10mb' })); // application/json
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(
  cors({
    origin: process.env.SITE_URL,
    methods: ['OPTIONS', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'Authorization',
      'Access-Control-Request-Headers',
      'Access-Control-Request-Method',
      'Access-Control-Allow-Headers',
    ],
  })
);
app.use(cookieParser());

app.use('/', router);

app.use(errorHandler);

app.all('*', () => {
  throw new NotFoundError('Not Found');
});

export { app };
