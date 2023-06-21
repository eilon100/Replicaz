import { RequestHandler } from "express";
import User from "../../../db/modal/user";

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
