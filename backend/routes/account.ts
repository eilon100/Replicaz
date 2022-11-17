import express from "express";
import {
  getUserData,
  newPassword,
  resetPassword,
} from "../controllers/account";
import { isAuth } from "../middleware/isAuth";
import { UserNewPasswordValidation } from "../validation/account";

const accountRouter = express.Router();

accountRouter.post("/resetpassword", resetPassword);

accountRouter.post("/newpassword", UserNewPasswordValidation(), newPassword);

accountRouter.use(isAuth);

accountRouter.get("/getuserdata", getUserData);

export { accountRouter };
