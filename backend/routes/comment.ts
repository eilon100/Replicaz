import { Router } from 'express';
import {
  deleteComment,
  editComment,
  likeComment,
  reportComment,
} from '../controllers/comments';
import { isAuth } from '../middleware/isAuth';

const commentRouter = Router();

commentRouter.post('/likecomment', isAuth, likeComment);

commentRouter.patch('/editcomment', isAuth, editComment);

commentRouter.post('/deletecomment', isAuth, deleteComment);

commentRouter.post('/reportcomment', isAuth, reportComment);

export { commentRouter };
