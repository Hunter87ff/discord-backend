import e from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import type { Request, Response } from "express";


async function v1Middleware(req: Request, res: Response, next: e.NextFunction) {
    req.app.use(cors());
    req.app.use(cookieParser());
    next();
}