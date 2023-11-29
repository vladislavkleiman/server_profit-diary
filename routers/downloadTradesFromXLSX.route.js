import { Router } from "express";
const downloadTradesFromXLSXRouter = Router();
import multer from "multer";
const upload = multer({ dest: "uploads/" });
import {
  insertTradeData,
  getAllTradesData,
} from "../controllers/downloadTradesFromXLSX.controller.js";

downloadTradesFromXLSXRouter.post("/", upload.single("file"), insertTradeData);
downloadTradesFromXLSXRouter.get("/data", getAllTradesData);

export { downloadTradesFromXLSXRouter };
