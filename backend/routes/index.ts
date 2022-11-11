import express from "express";
import { accountRouter } from "./account";
import { authRouter } from "./auth";
import { postRouter } from "./post";

const router = express.Router();

router.use("/auth", authRouter);

router.use("/account", accountRouter);

router.use("/post", postRouter);

export { router };
