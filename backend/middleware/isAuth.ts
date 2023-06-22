import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { RequestHandler } from 'express';
import { decodedToken } from '../types/decodedToken';
import User from '../db/modal/user';
import { BadRequestError } from '../errors/bad-request';

export const isAuth: RequestHandler = async (req, res, next) => {
  try {
    const token = req?.headers?.authorization?.split(' ')[1];

    if (!token) {
      throw new BadRequestError('token is invalid');
    }
    const decodedToken = verifyToken(token);
    const user = await User.findById(decodedToken.userId, 'role -_id');
    if (!user) {
      throw new BadRequestError('user not exists');
    }
    req.userData = { userId: decodedToken.userId, role: user.role };
    next();
  } catch (error: any) {
    next(error);
  }
};

function verifyToken(token: string) {
  try {
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as decodedToken;

    return decodedToken;
  } catch (error) {
    throw new BadRequestError('token is invalid');
  }
}
