import jwt from 'jsonwebtoken';
import createHttpError from 'http-errors';
import { env } from '../utils/env.js';

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next(createHttpError(401, 'Authorization header missing'));
  }

  const token = authHeader.split(' ')[1]; // Assuming Bearer token

  try {
    const decoded = jwt.verify(token, env('JWT_SECRET'));
    req.user = decoded; // Add decoded user information to req object
    next();
  } catch (error) {
    return next(createHttpError(401, 'Invalid token'));
  }
};

export default authenticate; // Default export
