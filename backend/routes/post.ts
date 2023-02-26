import express from "express";
import { createComment, likeComment } from "../controllers/comments";
import {
  createPost,
  deletePost,
  editPost,
  getAllPosts,
  getPost,
  likePost,
  reportPost,
  savePost,
} from "../controllers/post";
import { isAuth } from "../middleware/isAuth";

const postRouter = express.Router();

postRouter.get("/allposts", getAllPosts);

postRouter.get("/getpost/:id", getPost);

postRouter.use(isAuth);

postRouter.post("/newpost", createPost);

postRouter.post("/newcomment", createComment);

postRouter.post("/likecomment", likeComment);

postRouter.post("/likepost", likePost);

postRouter.post("/savepost", savePost);

postRouter.post("/deletepost", deletePost);

postRouter.patch("/editpost", editPost);

postRouter.post("/reportpost", reportPost);

export { postRouter };
