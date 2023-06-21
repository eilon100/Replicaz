import { RequestHandler } from "express";
import User from "../../../db/modal/user";
import { singleImageUpload } from "../../../utills/cloudinaryActions";

export const editUserData: RequestHandler = async (req, res, next) => {
  let data = req.body;

  try {
    if (data.image) {
      const userImage = await singleImageUpload(
        data.image,
        `user-images/profile/${req.userData.userId}`
      );

      data = { image: userImage };
    }
    const user = await User.findByIdAndUpdate(req.userData.userId, data, {
      new: true,
    });

    return res.status(200).json({
      message: 'Profile updated!',
      userImage: user.image,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error on '/user/EditUserData': " + error });
  }
};
