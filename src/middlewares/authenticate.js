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

    const [bearer, token] = authorizationHeader.split(' ');
    if (bearer !== 'Bearer') {
      throw createHttpError(401, 'Authorization header must be of Bearer type');
    }

    if (!token) {
      throw createHttpError(401, 'Token is missing');
    }

    const decoded = jwt.verify(token, env('JWT_SECRET'));

    const user = await UserCollection.findById(decoded.id);
    if (!user) {
      throw createHttpError(401, 'User not found');
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export default authenticate;
