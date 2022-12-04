import express from "express";
import {
  deleteComment,
  editComment,
  likeComment,
} from "../controllers/comments";
import { isAuth } from "../middleware/isAuth";

const commentRouter = express.Router();

commentRouter.use(isAuth);

commentRouter.post("/likecomment", likeComment);

commentRouter.patch("/editcomment", editComment);

commentRouter.post("/deletecomment", deleteComment);

export { commentRouter };
