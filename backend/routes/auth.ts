import { Router } from 'express';
import { activateAccount, login } from '../controllers/auth';
import { register } from '../controllers/auth/post/register';
import { UserSignUpValidation } from '../validation/auth';

const authRouter = Router();

authRouter.post('/signup', UserSignUpValidation(), register);

authRouter.post('/login', login);

authRouter.post('/activate', activateAccount);

export { authRouter };
