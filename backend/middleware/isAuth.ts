import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import { RequestHandler } from "express";
import { decodedToken } from "../types/decodedToken";

export const isAuth: RequestHandler = (req, res, next) => {
  dotenv.config();
  try {
    const token = req?.headers?.authorization?.split(" ")[1];
    console.log(req?.headers);
    if (!token) {
      return res.status(400).json({ error: "token is invalid" });
    }
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as decodedToken;

    req.userData = { userId: decodedToken.userId };
    next();
  } catch (error: any) {
    return res
      .status(403)
      .json({ error: error.message || "Authentication failed" });
  }
};
