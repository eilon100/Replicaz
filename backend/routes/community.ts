import express from "express";
import { addNewItem, getAllItems } from "../controllers/community";
import { isAuth } from "../middleware/isAuth";

const communityRouter = express.Router();

communityRouter.use(isAuth);

communityRouter.post("/addnewitem", addNewItem);

communityRouter.get("/getallitems", getAllItems);

export { communityRouter };
