import express from "express";
import { EditUserData, getUserData } from "../controllers/user";
import { isAuth } from "../middleware/isAuth";

const userRouter = express.Router();

userRouter.get("/getuserdata/:username", getUserData);

userRouter.use(isAuth);

userRouter.patch("/edit", EditUserData);

export { userRouter };
