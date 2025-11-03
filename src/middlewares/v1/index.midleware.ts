import e from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import type { Request, Response } from "express";


declare module "express-serve-static-core" {
    interface Response {
        handler: {
            ok : (res : Response, message: string, data?: any) => void;
            success: (res: Response, message: string, data?: any) => void;
            error: (res: Response, message: string, code?: number) => void;
        };
    }

}

async function v1Middleware(req: Request, res: Response, next: e.NextFunction) {
    req.app.use(cors());
    req.app.use(cookieParser());
    next();
}