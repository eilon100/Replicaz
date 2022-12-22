import express from "express";
import { accountRouter } from "./account";
import { authRouter } from "./auth";
import { postRouter } from "./post";
import { commentRouter } from "./comment";
import { communityRouter } from "./community";

const router = express.Router();

router.use("/auth", authRouter);

router.use("/account", accountRouter);

router.use("/post", postRouter);

router.use("/comment", commentRouter);

router.use("/community", communityRouter);

export { router };
