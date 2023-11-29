import { Router } from "express";
const getAllTimeUserTradeStatisticsRoute = Router();
import { getAllTimeTradeStatistics } from "../controllers/getAllTimeUserTradeStatistics.controller.js";

getAllTimeUserTradeStatisticsRoute.get(
  "/user/:userId/trade-statistics",
  getAllTimeTradeStatistics
);

export { getAllTimeUserTradeStatisticsRoute };
