import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'; // Add cookie-parser for handling cookies
import contactsRouter from './routers/contacts.js';
import authRouter from './routers/auth.js'; // Import the new auth router
import { env } from './utils/env.js';
import errorHandler from './middlewares/errorHandler.js';
import notFoundHandler from './middlewares/notFoundHandler.js';
import authenticate from './middlewares/authenticate.js'; // Middleware to protect routes

dotenv.config();
const PORT = Number(env('PORT', '3000'));

export const setupServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(cookieParser());
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );
  app.use('/auth', authRouter);
  app.use('/contacts', authenticate, contactsRouter);
  app.use('*', notFoundHandler);
  app.use(errorHandler);
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
