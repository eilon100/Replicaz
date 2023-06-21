import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import crypto from 'crypto';
import pendingUsers from '../db/modal/pendingUsers';
import sgMail from '@sendgrid/mail';
import User from '../db/modal/user';
import jwt from 'jsonwebtoken';
import { signUpEmail } from '../utills/SG-mails';
import mongoose from 'mongoose';
const bcrypt = require('bcryptjs');

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    let errorArray: string[] = [];
    errors.array().map((error) => {
      errorArray.push(error.msg);
    });
    return res.status(400).json({ error: errorArray[0] });
  }

  const API_KEY: string = process.env.SG_API!;
  sgMail.setApiKey(API_KEY);

  const { userName, firstName, lastName, email, password, phone, birthDate } =
    req.body;

  // hash password
  const hashedPassword = await bcrypt.hash(password, 12);

  const newUser = new pendingUsers({
    userName,
    email,
    firstName,
    lastName,
    phone,
    birthDate,
    emailToken: crypto.randomBytes(64).toString('hex'),
    hashedPassword,
    emailVerified: false,
  });
  const message = signUpEmail(newUser.email, newUser.emailToken);
  const signUpUser = await mongoose.startSession();
  signUpUser.startTransaction();
  newUser
    .save({ session: signUpUser })
    .then(async () => {
      try {
        sgMail.send(message);
        await signUpUser.commitTransaction();
        return res.status(200).json({ msg: 'please check your email ' });
      } catch (error) {
        console.log(error);
        await signUpUser.abortTransaction();
        return res.status(400).json({ error: 'Error on sending email ' });
      }
    })
    .catch(async (err: any) => {
      await signUpUser.abortTransaction();
      if (err.code == 11000) {
        return res.status(400).json({
          error: 'Already registered please check your email for verification',
        });
      } else
        return res
          .status(400)
          .json({ error: "Error on '/auth/signup': " + err });
    });
};

export const activateAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.body.token;
  const pendingUser = await pendingUsers.findOne({
    emailToken: token,
  });

  if (!pendingUser) {
    return res
      .status(400)
      .json({ error: 'Verification link times up please register again' });
  }

  const newUser = new User({
    userName: pendingUser.userName,
    firstName: pendingUser.firstName,
    lastName: pendingUser.lastName,
    email: pendingUser.email,
    phone: pendingUser.phone,
    birthDate: pendingUser.birthDate,
    hashedPassword: pendingUser.hashedPassword,
    image: `https://ui-avatars.com/api/?background=random&name=${pendingUser.firstName}+${pendingUser.lastName}`,
    emailVerified: true,
  });

  await pendingUser.remove();
  await newUser
    .save()
    .then(() => {
      return res.status(200).json({ message: 'Verification completed' });
    })
    .catch((err: any) => {
      return res
        .status(400)
        .json({ error: "Error on '/activateAccount': " + err });
    });
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  try {
    const loadedUser = await User.findOne({ email: email });

    if (!loadedUser) {
      return res.status(401).json({ error: 'Email is not registered' });
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      loadedUser.hashedPassword
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({ error: 'Password is incorrect' });
    }
    const token = jwt.sign(
      {
        email: loadedUser,
        userId: loadedUser._id.toString(),
      },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );

    const userData = {
      userId: loadedUser._id,
      userName: loadedUser.userName,
      email: loadedUser.email,
      userImage: loadedUser.image,
      role: loadedUser.role,
    };

    return res.status(200).json({
      message: 'Logged in successfully',
      userData,
      token,
    });
  } catch (error) {
    return res.status(401).json({ message: 'Logged in failed' });
  }
};
