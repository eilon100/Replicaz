import { Router } from 'express';
import {
  addNewItem,
  getAllItems,
  getItemsData,
} from '../controllers/community';
import { isAdmin } from '../middleware/isAdmin';

const communityRouter = Router();
communityRouter.get('/getallitems', getAllItems);

communityRouter.get('/itemsdata/:page', getItemsData);

communityRouter.use(isAdmin);

communityRouter.post('/addnewitem', addNewItem);

export { communityRouter };
