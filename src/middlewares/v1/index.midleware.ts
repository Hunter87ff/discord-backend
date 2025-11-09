import e from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { Logger } from "@/ext/logger";
import { ResponseHandler } from "@/ext/response";
import { Sanitizer } from "@/ext/sanitize";
import type { Request, Response } from "express";


declare module "express-serve-static-core" {
    interface Response {
        logger: Logger;
        responseHandler: ResponseHandler;
        sanitizer: Sanitizer;
    }
}

async function v1Middleware(req: Request, res: Response, next: e.NextFunction) {
    req.app.use(cors());
    req.app.use(cookieParser());
    res.logger = Logger.instance;
    res.responseHandler = new ResponseHandler();
    res.sanitizer = Sanitizer;
    next();
}