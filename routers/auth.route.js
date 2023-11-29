import { Router } from "express";
const authRouter = Router();

import { register, login } from "../controllers/auth.controller.js";

authRouter.post("/register", register);

authRouter.post("/login", login);

export { authRouter };
