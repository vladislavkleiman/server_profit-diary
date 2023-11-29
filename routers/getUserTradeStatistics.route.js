import { Router } from "express";
const getUserTradeStatisticsRoute = Router();
import { tradeStatisticsController } from "../controllers/getUserTradeStatistics.controller.js";

getUserTradeStatisticsRoute.get(
  "/user/:userId/statistics",
  tradeStatisticsController
);

export { getUserTradeStatisticsRoute };
