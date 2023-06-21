import sgMail from '@sendgrid/mail';
import jwt from 'jsonwebtoken';
import { RequestHandler } from 'express';
import User from '../../../db/modal/user';
import { resetPasswordEmail } from '../../../utills/SG-mails';

export const resetPassword: RequestHandler = async (req, res, next) => {
  const API_KEY: string = process.env.SG_API!;
  sgMail.setApiKey(API_KEY);

  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(422).json({ error: 'Email is not registered' });
  }

  const resetToken = jwt.sign(
    { userId: user._id, hashedPassword: user.hashedPassword },
    process.env.JWT_SECRET!,
    {
      expiresIn: '5m',
    }
  );

  const message = resetPasswordEmail(user.email, resetToken);

  try {
    sgMail.send(message);
    return res.status(200).json({ msg: 'please check your email ' });
  } catch (error) {
    return res.status(400).json({ error: 'Error on verify email ' });
  }
};
