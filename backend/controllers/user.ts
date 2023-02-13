import User from "../modal/user";
import { RequestHandler } from "express";

export const getUserData: RequestHandler = async (req, res, next) => {
  const { username } = req.params;

  try {
    const user = await User.findOne(
      { userName: username },
      { hashedPassword: 0, emailVerified: 0, savedPosts: 0, updatedAt: 0 }
    );
    if (!user) {
      return res.status(404).json({ error: "Could not find the user" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error on '/account/getuserdata': " + error });
  }
};
export const EditUserData: RequestHandler = async (req, res, next) => {
  const data = req.body;

  try {
    const user = await User.findByIdAndUpdate(req.userData.userId, data);

    return res.status(200).json({
      message: "Profile updated!",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error on '/account/getuserdata': " + error });
  }
};
