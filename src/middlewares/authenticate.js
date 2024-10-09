import jwt from 'jsonwebtoken';
import createHttpError from 'http-errors';
import UserCollection from '../db/models/user.js';

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw createHttpError(401, 'Authorization header missing or malformed');
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, SECRET_KEY);

    const user = await UserCollection.findById(decoded.id);
    if (!user) {
      throw createHttpError(401, 'User not found');
    }

    req.user = user;
    next();
  } catch (error) {
    next(createHttpError(401, 'Invalid or expired access token'));
  }
};
