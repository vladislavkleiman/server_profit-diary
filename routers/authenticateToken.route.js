import { Router } from "express";
const authenticateTokenRoute = Router();

import { authenticateToken } from "../controllers/authenticateToken.js";

authenticateTokenRoute.get(
  "/protected-route",
  authenticateToken,
  (req, res) => {
    res.send("Access to protected data");
  }
);

export { authenticateTokenRoute };
