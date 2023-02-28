import express from "express";
import { editUserData, getUserPosts, getUserData, getSavedPosts, reportUser, getUserNotifications, makeNotificationSeen } from "../controllers/user";
import { isAuth } from "../middleware/isAuth";
import { UserPatchValidation } from "../validation/user";

const userRouter = express.Router();

userRouter.get("/getuserdata/:username", getUserData);

userRouter.get("/posts", getUserPosts);

userRouter.use(isAuth);

userRouter.patch("/edit", UserPatchValidation(), editUserData);

userRouter.get("/savedposts", getSavedPosts);

userRouter.get("/notifications", getUserNotifications);

userRouter.patch("/notificationseen", makeNotificationSeen);

userRouter.post("/reportuser", reportUser);

export { userRouter };
