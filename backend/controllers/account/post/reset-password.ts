import sgMail from '@sendgrid/mail';
import jwt from 'jsonwebtoken';
import { RequestHandler } from 'express';
import User from '../../../db/modal/user';
import { resetPasswordEmail } from '../../../utills/SG-mails';
import { BadRequestError } from '../../../errors/bad-request';

export const resetPassword: RequestHandler = async (req, res, next) => {
  const API_KEY = process.env.SG_API!;
  sgMail.setApiKey(API_KEY);

  const { email } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      throw new BadRequestError('Could not find the user');
    }
    const resetToken = createResetToken(user._id, user.hashedPassword);

    const message = resetPasswordEmail(user.email, resetToken);

    sgMail.send(message);
    return res.status(200).json({ msg: 'please check your email ' });
  } catch (error) {
    next(error);
  }
};

function createResetToken(userId: string, hashedPassword: string) {
  try {
    const resetToken = jwt.sign(
      { userId, hashedPassword },
      process.env.JWT_SECRET!,
      {
        expiresIn: '5m',
      }
    );
    return resetToken;
  } catch (error) {
    throw new BadRequestError('failed reset password');
  }
}
