import { RequestHandler } from 'express';
import User from '../../../db/modal/user';
import { BadRequestError } from '../../../errors/bad-request';

export const getAccountData: RequestHandler = async (req, res, next) => {
  try {
    const user = await User.findById(req.userData.userId);
    if (!user) {
      throw new BadRequestError('Could not find the user');
    }
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
