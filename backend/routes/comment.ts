import { Router } from 'express';
import {
  deleteComment,
  editComment,
  likeComment,
  reportComment,
} from '../controllers/comments';
import { isAuth } from '../middleware/isAuth';

const commentRouter = Router();

commentRouter.use(isAuth);

commentRouter.post('/likecomment', likeComment);

commentRouter.patch('/editcomment', editComment);

commentRouter.post('/deletecomment', deleteComment);

commentRouter.post('/reportcomment', reportComment);

export { commentRouter };
