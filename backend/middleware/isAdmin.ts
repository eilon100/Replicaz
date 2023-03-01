import User from "../modal/user";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import { RequestHandler } from "express";
import { decodedToken } from "../types/decodedToken";

export const isAdmin: RequestHandler = async (req, res, next) => {
  dotenv.config();
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(400).json({ error: "token is invalid" });
    }
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as decodedToken;

    const { role } = await User.findById(decodedToken.userId, "role -_id");
    if (role !== "admin") {
      return res.status(403).json({ error: "Not an admin" });
    }
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (error: any) {
    return res.status(403).json({ error: error.message || "Not admin" });
  }
};
