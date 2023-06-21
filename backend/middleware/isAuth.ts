import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { RequestHandler } from 'express';
import { decodedToken } from '../types/decodedToken';
import User from '../db/modal/user';

export const isAuth: RequestHandler = async (req, res, next) => {
  dotenv.config();
  try {
    const token = req?.headers?.authorization?.split(' ')[1];

    if (!token) {
      return res.status(400).json({ error: 'token is invalid' });
    }
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as decodedToken;
    const user = await User.findById(decodedToken.userId);
    if (!user) {
      return res.status(404).json({ error: 'Could not find the user' });
    }
    req.userData = { userId: decodedToken.userId, role: user.role };
    next();
  } catch (error: any) {
    return res
      .status(403)
      .json({ error: error.message || 'Authentication failed' });
  }
};
