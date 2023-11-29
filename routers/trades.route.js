import { Router } from "express";
const tradesRouter = Router();
import { loadTradesController } from "../controllers/tradesController.js";

tradesRouter.post("/loadTrades", loadTradesController);

export { tradesRouter };
