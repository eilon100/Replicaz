import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import User from '../../../db/modal/user';
import { BadRequestError } from '../../../errors/bad-request';
const bcrypt = require('bcryptjs');
const errorMessage = 'סיסמה או שם משתמש שגויים';

export const login: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;

  // const user = findUser(email);
  const user = await User.findOne({ email });

  if (!user) {
    throw new BadRequestError(errorMessage);
  }
  validatePassword(user, password);

  const token = createToken(user);

  const userData = {
    userId: user._id,
    userName: user.userName,
    email: user.email,
    userImage: user.image,
    role: user.role,
  };

  return res.status(200).json({
    message: 'Logged in successfully',
    userData,
    token,
  });
};

// async function findUser(email: string) {
//   return loadedUser;
// }

async function validatePassword(user: any, password: string) {
  const isPasswordMatch = await bcrypt.compare(password, user.hashedPassword);

  if (!isPasswordMatch) {
    throw new BadRequestError(errorMessage);
  }
}

function createToken(user: any) {
  const token = jwt.sign(
    {
      email: user.email,
      userId: user._id.toString(),
    },
    process.env.JWT_SECRET!,
    { expiresIn: '7d' }
  );

  return { token };
}
