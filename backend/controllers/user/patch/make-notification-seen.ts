import { RequestHandler } from "express";
import User from "../../../db/modal/user";

export const makeNotificationSeen: RequestHandler = async (req, res, next) => {
  const { notificationId } = req.body;
  try {
    User.updateOne(
      {
        _id: req.userData.userId,
        notifications: { $elemMatch: { _id: notificationId } },
      },
      { $set: { 'notifications.$.seen': true } }
    ).then(() => {
      return res.status(200).json({ message: 'notification marked as seen' });
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Could not make notifications seen' });
  }
};
