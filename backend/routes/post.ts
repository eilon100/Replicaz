import { Router } from 'express';
import { createComment, likeComment } from '../controllers/comments';
import {
  createPost,
  deletePost,
  editPost,
  getAllPosts,
  getPost,
  likePost,
  reportPost,
  savePost,
} from '../controllers/post';
import { isAuth } from '../middleware/isAuth';

const postRouter = Router();

postRouter.get('/allposts', getAllPosts);

postRouter.get('/getpost/:id', getPost);

postRouter.post('/newpost', isAuth, createPost);

postRouter.post('/newcomment', isAuth, createComment);

postRouter.post('/likecomment', isAuth, likeComment);

postRouter.post('/likepost', isAuth, likePost);

postRouter.post('/savepost', isAuth, savePost);

postRouter.post('/deletepost', isAuth, deletePost);

postRouter.patch('/editpost', isAuth, editPost);

postRouter.post('/reportpost', isAuth, reportPost);

export { postRouter };
