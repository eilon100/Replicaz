import { Request, RequestHandler } from 'express';
import crypto from 'crypto';
import sgMail from '@sendgrid/mail';
import mongoose, { MongooseError } from 'mongoose';
import { signUpEmail } from '../../../utills/SG-mails';
import PendingUsers from '../../../db/modal/pendingUsers';
import { BadRequestError } from '../../../errors/bad-request';
const bcrypt = require('bcryptjs');

export const register: RequestHandler = async (req, res, next) => {
  const API_KEY: string = process.env.SG_API!;
  sgMail.setApiKey(API_KEY);
  const { password } = req.body;

  try {
    const hashedPassword = await createHashedPassword(password);
    const existingRegisterUser = await PendingUsers.findOne({
      email: req.body.email,
    });

    if (existingRegisterUser) {
      throw new BadRequestError(
        'Already registered please check your email for verification'
      );
    }
    const newUser = await createPendingUser({
      request: req.body,
      hashedPassword,
    });

    const message = signUpEmail(newUser.email, newUser.emailToken);

    sgMail.send(message);
    newUser.save();

    return res.status(201).json({ msg: 'please check your email ' });
  } catch (error: any) {
    next(error);
  }
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
