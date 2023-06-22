import { RequestHandler } from 'express';
import PendingUser from '../../../db/modal/pendingUsers';
import User from '../../../db/modal/user';
import { BadRequestError } from '../../../errors/bad-request';

export const activateAccount: RequestHandler = async (req, res, next) => {
  const { token } = req.body;
  try {
    const pendingUser = await PendingUser.findOne({
      emailToken: token,
    });

    if (!pendingUser) {
      throw new BadRequestError(
        'Verification link times up please register again'
      );
    }

    const newUser = User.build({
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
    await newUser.save();
    return res.status(200).json({ message: 'Verification completed' });
  } catch (error) {
    next(error);
  }
};
