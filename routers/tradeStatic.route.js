import { Router } from "express";
const tradeStaticRoute = Router();
import { getProfit } from "../controllers/calculateProfitController.js";

tradeStaticRoute.get("/summary", getProfit);

export { tradeStaticRoute };
