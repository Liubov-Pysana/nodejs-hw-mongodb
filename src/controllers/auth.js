import createHttpError from 'http-errors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserCollection from '../db/models/user.js';
import SessionCollection from '../db/models/session.js';

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';

export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await UserCollection.findOne({ email });
    if (existingUser) {
      throw createHttpError(409, 'Email in use');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await UserCollection.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      status: 201,
      message: 'Successfully registered a user!',
      data: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await UserCollection.findOne({ email });
    if (!user) {
      throw createHttpError(401, 'Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw createHttpError(401, 'Invalid email or password');
    }

    const accessToken = jwt.sign({ id: user._id }, SECRET_KEY, {
      expiresIn: '15m',
    });
    const refreshToken = jwt.sign({ id: user._id }, SECRET_KEY, {
      expiresIn: '30d',
    });

    await SessionCollection.create({
      userId: user._id,
      accessToken,
      refreshToken,
      accessTokenValidUntil: new Date(Date.now() + 15 * 60 * 1000),
      refreshTokenValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    });

    res.cookie('refreshToken', refreshToken, { httpOnly: true });

    res.status(200).json({
      status: 200,
      message: 'Successfully logged in a user!',
      data: {
        accessToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const refreshSession = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      throw createHttpError(401, 'Refresh token is missing');
    }

    const session = await SessionCollection.findOne({ refreshToken });
    if (!session) {
      throw createHttpError(401, 'Invalid refresh token');
    }

    const { id } = jwt.verify(refreshToken, SECRET_KEY);
    const accessToken = jwt.sign({ id }, SECRET_KEY, { expiresIn: '15m' });

    await SessionCollection.findByIdAndUpdate(session._id, {
      accessToken,
      accessTokenValidUntil: new Date(Date.now() + 15 * 60 * 1000),
    });

    res.status(200).json({
      status: 200,
      message: 'Successfully refreshed a session!',
      data: {
        accessToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const logoutUser = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      throw createHttpError(401, 'Refresh token is missing');
    }

    const session = await SessionCollection.findOne({ refreshToken });
    if (!session) {
      throw createHttpError(401, 'Invalid refresh token');
    }

    await SessionCollection.findByIdAndDelete(session._id);

    res.clearCookie('refreshToken');
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
