import { Router } from "express";
const getMonthlyTradeStatsRoute = Router();
import { getMonthlyTradeStatsController } from "../controllers/getMonthlyTradeStatistics.controller.js";

getMonthlyTradeStatsRoute.get("/", getMonthlyTradeStatsController);

export { getMonthlyTradeStatsRoute };
