import express from "express";
import { EditUserData, getUserData } from "../controllers/user";
import { isAuth } from "../middleware/isAuth";
import { UserPatchValidation } from "../validation/user";

const userRouter = express.Router();

userRouter.get("/getuserdata/:username", getUserData);

userRouter.use(isAuth);

userRouter.patch("/edit", UserPatchValidation(), EditUserData);

export { userRouter };
