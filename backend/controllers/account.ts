import { Request, Response, NextFunction } from 'express';
import User from '../db/modal/user';
import sgMail from '@sendgrid/mail';
import jwt from 'jsonwebtoken';
const bcrypt = require('bcryptjs');
import { decodedToken } from '../types/decodedToken';
import { resetPasswordEmail } from '../utills/SG-mails';
import { RequestHandler } from 'express';

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
export const getAccountData: RequestHandler = async (req, res, next) => {
  try {
    const user = await User.findById(req.userData.userId);
    if (!user) {
      return res.status(404).json({ error: 'Could not find the user' });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error on '/account/getuserdata': " + error });
  }
};
