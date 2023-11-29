import { Router } from "express";
const getProfitForUserAllTimeRouter = Router();
import { getProfitForUserAllTime } from "../controllers/profitChartAllTime.controller.js";

getProfitForUserAllTimeRouter.get(
  "/user/trades/profit/:userId",
  getProfitForUserAllTime
);

export { getProfitForUserAllTimeRouter };
