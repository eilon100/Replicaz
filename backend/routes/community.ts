import express from "express";
import {
  addNewItem,
  getAllItems,
  getItemsData,
} from "../controllers/community";
import { isAuth } from "../middleware/isAuth";

const communityRouter = express.Router();
communityRouter.get("/getallitems", getAllItems);

communityRouter.get("/itemsdata/:page", getItemsData);

communityRouter.use(isAuth);

communityRouter.post("/addnewitem", addNewItem);

export { communityRouter };
