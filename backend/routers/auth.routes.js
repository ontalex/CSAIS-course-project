import { Router } from "express";
import authControllers from "../controllers/auth.controllers.js";

export const authRouter = Router();

authRouter.post( "/auth/login", authControllers.auth );
authRouter.post( "/auth/check", authControllers.check );