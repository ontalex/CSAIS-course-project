import { Router } from 'express';
import authController from '../../controllers/v1/auth.controller.js';

const auth_routs = Router();

auth_routs.post("/login", authController.auth_login);
auth_routs.get("/token", authController.auth_token); // проверка действительности токена

export default auth_routs;