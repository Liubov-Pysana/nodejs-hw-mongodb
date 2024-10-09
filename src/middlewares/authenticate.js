import jwt from 'jsonwebtoken';
import createHttpError from 'http-errors';
import { env } from '../utils/env.js';
import UserCollection from '../db/models/user.js';

const authenticate = async (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      throw createHttpError(401, 'Authorization header is missing');
    }

    const token = authorizationHeader.split(' ')[1]; // Extract the token
    if (!token) {
      throw createHttpError(401, 'Token is missing');
    }

    const decoded = jwt.verify(token, env('ACCESS_TOKEN_SECRET'));

    const user = await UserCollection.findById(decoded.userId);
    if (!user) {
      throw createHttpError(401, 'User not found');
    }

    req.user = user; // Attach the authenticated user to the request object
    next(); // Continue to the next middleware
  } catch (error) {
    next(error);
  }
};

export default authenticate; // Ensure this is a default export
