import { Router } from "express";
const deleteDataForDateAndUserRoute = Router();
import { deleteDataForDateAndUser } from "../controllers/deleteDataController.js"; // Path to your controller

deleteDataForDateAndUserRoute.delete("/delete-data", deleteDataForDateAndUser);

export { deleteDataForDateAndUserRoute };
