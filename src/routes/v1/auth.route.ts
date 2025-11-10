import { Router } from "express";
import AuthController from "@/controllers/auth.controller";

const authRouter = Router();

authRouter.post('/signup', AuthController.signup);
authRouter.get('/verify', AuthController.verify);
authRouter.post('/login', AuthController.login);

export default authRouter;