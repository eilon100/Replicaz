import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import crypto from "crypto";
import pendingUsers from "../modal/pendingUsers";
import sgMail from "@sendgrid/mail";
import User from "../modal/user";
import jwt from "jsonwebtoken";
import { signUpEmail } from "../utills/SG-mails";
const bcrypt = require("bcryptjs");

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
    emailToken: crypto.randomBytes(64).toString("hex"),
    hashedPassword,
    emailVerified: false,
  });
  const message = signUpEmail(newUser.email, newUser.emailToken);

  newUser
    .save()
    .then(() => {
      try {
        sgMail.send(message);
        return res.status(200).json({ msg: "please check your email " });
      } catch (error) {
        return res.status(400).json({ error: "Error on verify email " });
      }
    })
    .catch((err: any) => {
      if (err.code == 11000) {
        return res.status(400).json({
          error: "Already registered please check your email for verification",
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
  console.log(token);
  console.log(req.body);
  const pendingUser = await pendingUsers.findOne({
    emailToken: token,
  });
  console.log(pendingUser);
  if (!pendingUser) {
    return res
      .status(400)
      .json({ error: "Verification link times up please register again" });
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
      return res.status(200).json({ message: "Verification completed" });
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
      return res.status(401).json({ error: "Email is not registered" });
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      loadedUser.hashedPassword
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({ error: "Password is incorrect" });
    }
    const token = jwt.sign(
      {
        email: loadedUser,
        userId: loadedUser._id.toString(),
      },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    const userData = {
      userId: loadedUser._id,
      userName: loadedUser.userName,
      email: loadedUser.email,
      userImage: loadedUser.image,
      role: loadedUser.role,
    };

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.cookie("userData", JSON.stringify(userData), {
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Logged in successfully",
    });
  } catch (error) {
    return res.status(401).json({ message: "Logged in failed" });
  }
};

export const logout = (req: Request, res: Response, next: NextFunction) => {
  const cookies = req.cookies;

  try {
    if (!cookies.token) {
      return res.status(401).json({ message: "unauthorize" });
    }
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
    });
    res.clearCookie("userData", {
      // httpOnly: true,
      secure: true,
    });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    return res
      .status(424)
      .json({ message: "Something went wrong, please try again" });
  }
};
