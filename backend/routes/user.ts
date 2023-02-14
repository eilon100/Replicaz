import express from "express";
import { editUserData, getUserData } from "../controllers/user";
import { isAuth } from "../middleware/isAuth";
import { UserPatchValidation } from "../validation/user";

const userRouter = express.Router();

userRouter.get("/getuserdata/:username", getUserData);

userRouter.use(isAuth);

userRouter.patch("/edit", UserPatchValidation(), editUserData);

export { userRouter };
