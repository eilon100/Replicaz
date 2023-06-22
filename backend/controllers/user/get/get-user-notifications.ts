import { RequestHandler } from "express";
import User from "../../../db/modal/user";

export const getUserNotifications: RequestHandler = async (req, res, next) => {
  const { p: page }: any = req.query || 0;
  const postsPerPage = 5;
  const { seen }: any = req.query;
  const notificationFilter = seen === 'true' ? true : false;
  const filter = [
    {
      path: 'notifications',
      populate: {
        path: 'sentUserId',
        select: '-_id userName image',
      },
    },
    {
      path: 'notifications',
      populate: {
        path: 'postId',
        select: 'title',
      },
    },
  ];

  try {
    User.find(
      {
        _id: req.userData.userId,
      },
      {
        notifications: 1,
      }
    )
      .populate(filter)
      .exec((err, notificationsArr) => {
        if (err) {
          return res
            .status(500)
            .json({ message: 'Could not fetch the notifications' });
        } else {
          if (notificationsArr[0]) {
            const filteredObjects =
              notificationsArr[0].notifications.filter((obj: any) =>
                notificationFilter ? obj : obj.seen === false
              );
            const reversedDocs = filteredObjects.reverse();
            const skippedAndLimitedDocs = reversedDocs.slice(
              page * postsPerPage,
              page * postsPerPage + postsPerPage
            );
            return res.status(200).send(skippedAndLimitedDocs);
          } else {
            return res.status(200).send([]);
          }
        }
      });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: 'Could not fetch the notifications' });
  }
};
