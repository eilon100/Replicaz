import jwt, { JwtPayload } from 'jsonwebtoken';
import { RequestHandler } from 'express';
import { decodedToken } from '../../../types/decodedToken';
import User from '../../../db/modal/user';
import { BadRequestError } from '../../../errors/bad-request';
const bcrypt = require('bcryptjs');
export const newPassword: RequestHandler = async (req, res, next) => {
  try {
    const { password, token } = req.body;
    const decodedToken = verifyToken(token);

    const user = await checkIfUserExists(decodedToken.userId);

    await checkIfTokenValid(decodedToken?.hashedPassword, user.hashedPassword);

    await checkIfPasswordSame(password, user.hashedPassword);

    const newHashedPassword = await bcrypt.hash(password, 12);

    user.hashedPassword = newHashedPassword;
    await user.save();
    return res.status(200).json({ message: 'Your password has been updated!' });
  } catch (error) {
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
    throw new BadRequestError('Reset Password time expired');
  }
}

async function checkIfUserExists(userId: string | JwtPayload) {
  const user = await User.findById(userId);

  if (!user) {
    throw new BadRequestError('Could not find the user');
  }
  return user;
}

async function checkIfTokenValid(
  decodedHashedPassword: string | Buffer,
  userPassword: string
) {
  const tokenValid = decodedHashedPassword === userPassword;

  if (!tokenValid) {
    throw new BadRequestError('Reset password link is not valid');
  }
}
async function checkIfPasswordSame(password: string, userPassword: string) {
  const isPasswordSame = await bcrypt.compare(password, userPassword);

  if (isPasswordSame) {
    throw new BadRequestError('Please dont use your old password ');
  }
}
