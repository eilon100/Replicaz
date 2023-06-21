import jwt from 'jsonwebtoken';
import { RequestHandler } from 'express';
import { decodedToken } from '../../../types/decodedToken';
import User from '../../../db/modal/user';
const bcrypt = require('bcryptjs');
export const newPassword: RequestHandler = async (req, res, next) => {
  try {
    const { password, token } = req.body;
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as decodedToken;

    const mainUser = await User.findById(decodedToken?.userId);

    if (!mainUser) {
      return res.status(404).json({ error: 'Could not find user..' });
    }

    const tokenValid = decodedToken?.hashedPassword === mainUser.hashedPassword;

    if (!tokenValid) {
      return res
        .status(404)
        .json({ error: 'Reset password link is not valid' });
    }

    const isPasswordSame = await bcrypt.compare(
      password,
      mainUser.hashedPassword
    );

    if (isPasswordSame) {
      return res
        .status(400)
        .json({ error: 'Please dont use your old password ' });
    }
    const hashedPassword = await bcrypt.hash(password, 12);

    mainUser.hashedPassword = hashedPassword;
    await mainUser.save().then(() => {
      return res
        .status(200)
        .json({ message: 'Your password has been updated!' });
    });
  } catch (error) {
    return res
      .status(410)
      .json({ error: 'Reset password times out please try again' });
  }
};
