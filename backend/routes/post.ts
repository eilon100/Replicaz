import express from "express";
import { createComment } from "../controllers/comments";
import {
  createPost,
  getAllPosts,
  getPost,
  likePost,
} from "../controllers/post";
import { isAuth } from "../middleware/is-auth";

const postRouter = express.Router();

postRouter.get("/allposts", getAllPosts);

postRouter.get("/getpost/:id", getPost);

postRouter.use(isAuth);

postRouter.post("/newpost", createPost);

postRouter.post("/newcomment", createComment);

postRouter.post("/likepost", likePost);

export { postRouter };
