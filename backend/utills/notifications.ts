import User from '../db/modal/user';

export const Notifications = async (
  { userId, postId, sentUserId, type }: any,
  session: any,
  action = false
) => {
  if (userId.toString() === sentUserId) return;

  const pushORpull = action ? '$push' : '$pull';
  await User.findOneAndUpdate(
    userId,
    {
      [pushORpull]: { notifications: { sentUserId, postId, type } },
    },
    { session }
  );
};
