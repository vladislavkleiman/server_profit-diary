import express, { json } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { fileURLToPath } from "url";
import path, { dirname } from "path";
const __dirname = dirname(fileURLToPath(import.meta.url));

import { authRouter } from "./routers/auth.route.js";
import { downloadTradesFromXLSXRouter } from "./routers/downloadTradesFromXLSX.route.js";
import { tradesRouter } from "./routers/trades.route.js";
import { tradeStaticRoute } from "./routers/tradeStatic.route.js";
import { getTradesRouter } from "./routers/getTradesFromDB.route.js";
import { getMonthlyTradeStatsRoute } from "./routers/getMonthlyTradeStatistics.route.js";

import { deleteDataForDateAndUserRoute } from "./routers/deleteDataForUserAndDate.route.js";

import { getUserTradeStatisticsRoute } from "./routers/getUserTradeStatistics.route.js";

import { getAllTimeUserTradeStatisticsRoute } from "./routers/getAllTimeUserTradeStatistics.route.js";

import { getProfitForUserAllTimeRouter } from "./routers/profitChartAllTime.route.js";
import { authenticateToken } from "./controllers/authenticateToken.js";

const app = express();
app.use(cookieParser());
app.use(authenticateToken);

app.use(json());
app.use(cors());
app.use("/profitdiary/user-statistics", getUserTradeStatisticsRoute);
app.use("/profitdiary/trade-stats", getMonthlyTradeStatsRoute);
app.use("/profitdiary/daily-trades", getTradesRouter);
app.use("/profitdiary/trades-upload", downloadTradesFromXLSXRouter);
app.use("/profitdiary/trades-api", tradesRouter);
app.use("/profitdiary/trade-summary", tradeStaticRoute);
app.use("/profitdiary/delete-data", deleteDataForDateAndUserRoute);
app.use(
  "/profitdiary/all-time-user-statistics",
  getAllTimeUserTradeStatisticsRoute
);
app.use("/profitdiary/chart-profit", getProfitForUserAllTimeRouter);

app.use("/profitdiary/auth", authRouter);

app.use(express.static(path.join(__dirname, "/client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
