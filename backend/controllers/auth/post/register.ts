import { Request, RequestHandler } from 'express';
import { validationResult } from 'express-validator';
import crypto from 'crypto';
import sgMail from '@sendgrid/mail';
import mongoose from 'mongoose';
import pendingUsers from '../../../db/modal/pendingUsers';
import { signUpEmail } from '../../../utills/SG-mails';
import PendingUsers from '../../../db/modal/pendingUsers';
const bcrypt = require('bcryptjs');
const API_KEY: string = process.env.SG_API!;
sgMail.setApiKey(API_KEY);

export const register: RequestHandler = async (req, res, next) => {
  const { password } = req.body;
  const hashedPassword = await createHashedPassword(password);

  const newUser = await createPendingUser({
    request: req.body,
    hashedPassword,
  });

  const message = signUpEmail(newUser.email, newUser.emailToken);

  const signUpUser = await mongoose.startSession();
  signUpUser.startTransaction();
  newUser
    .save({ session: signUpUser })
    .then(async () => {
      try {
        await signUpUser.commitTransaction();
        sgMail.send(message);
        return res.status(201).json({ msg: 'please check your email ' });
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

async function createHashedPassword(password: string) {
  const hashedPassword = await bcrypt.hash(password, 12);

  return hashedPassword;
}

async function createPendingUser({
  request,
  hashedPassword,
}: {
  request: Request['body'];
  hashedPassword: string;
}) {
  const { userName, firstName, lastName, email, phone, birthDate } = request;
  const newUser = PendingUsers.build({
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
  return newUser;
}
