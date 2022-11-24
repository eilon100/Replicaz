import express from "express";
import { createComment } from "../controllers/comments";
import {
  createPost,
  deletePost,
  editPost,
  getAllPosts,
  getPost,
  likePost,
  savePost,
} from "../controllers/post";
import { isAuth } from "../middleware/isAuth";

const postRouter = express.Router();

postRouter.get("/allposts", getAllPosts);

postRouter.get("/getpost/:id", getPost);

postRouter.use(isAuth);

postRouter.post("/newpost", createPost);

postRouter.post("/newcomment", createComment);

postRouter.post("/likepost", likePost);

postRouter.post("/savepost", savePost);

postRouter.post("/deletepost", deletePost);

postRouter.patch("/editpost", editPost);

export { postRouter };
