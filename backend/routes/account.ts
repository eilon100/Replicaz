import express from "express";
import { newPassword, resetPassword } from "../controllers/account";
import { UserNewPasswordValidation } from "../validation/account";

const accountRouter = express.Router();

accountRouter.post("/resetpassword", resetPassword);

accountRouter.post("/newpassword", UserNewPasswordValidation(), newPassword);

export { accountRouter };
