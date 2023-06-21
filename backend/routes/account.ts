import { Router } from 'express';
import {
  newPassword,
  resetPassword,
  getAccountData,
} from '../controllers/account';
import { isAuth } from '../middleware/isAuth';
import { UserNewPasswordValidation } from '../validation/account';

const accountRouter = Router();

accountRouter.post('/resetpassword', resetPassword);

accountRouter.post('/newpassword', UserNewPasswordValidation(), newPassword);

accountRouter.use(isAuth);

accountRouter.get('/getaccountdata', getAccountData);

export { accountRouter };
