import express from "express";
import { activateAccount, login, signup } from "../controllers/auth";
import { UserSignUpValidation } from "../validation/auth";

const authRouter = express.Router();

authRouter.post("/signup", UserSignUpValidation(), signup);

authRouter.post("/login", login);

authRouter.post("/activate", activateAccount);

export { authRouter };
