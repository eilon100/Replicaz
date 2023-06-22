import express from 'express';
import {
  editUserData,
  getUserPosts,
  getUserData,
  getSavedPosts,
  reportUser,
  getUserNotifications,
  makeNotificationSeen,
} from '../controllers/user';
import { isAuth } from '../middleware/isAuth';
import { UserPatchValidation } from '../validation/user';

const userRouter = express.Router();

userRouter.get('/getuserdata/:username', getUserData);

userRouter.get('/posts', getUserPosts);

userRouter.patch('/edit', isAuth, UserPatchValidation(), editUserData);

userRouter.get('/savedposts', isAuth, getSavedPosts);

userRouter.get('/notifications', isAuth, getUserNotifications);

userRouter.patch('/notificationseen', isAuth, makeNotificationSeen);

userRouter.post('/reportuser', isAuth, reportUser);

export { userRouter };
