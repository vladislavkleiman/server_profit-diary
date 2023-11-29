import { Router } from "express";
const getTradesRouter = Router();
import { getTradesController } from "../controllers/getTradesFromDB.controller.js";

getTradesRouter.get("/", getTradesController);

export { getTradesRouter };
