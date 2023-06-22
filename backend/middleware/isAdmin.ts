import User from '../db/modal/user';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { RequestHandler } from 'express';
import { decodedToken } from '../types/decodedToken';
import { BadRequestError } from '../errors/bad-request';
import { NotAuthorizedError } from '../errors/not-authorized-error';

export const isAdmin: RequestHandler = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new BadRequestError('token is invalid');
    }
    const decodedToken = verifyToken(token);

    const user = await User.findById(decodedToken.userId, 'role -_id');
    if (user?.role !== 'admin') {
      throw new NotAuthorizedError();
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
