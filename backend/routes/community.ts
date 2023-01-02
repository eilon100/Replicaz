import express from "express";
import { addNewItem, getAllItems } from "../controllers/community";
import { isAuth } from "../middleware/isAuth";

const communityRouter = express.Router();
communityRouter.get("/getallitems", getAllItems);

communityRouter.use(isAuth);

communityRouter.post("/addnewitem", addNewItem);

export { communityRouter };
