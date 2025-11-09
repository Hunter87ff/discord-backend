import e from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { logger } from "@/ext/logger";
import { models} from "@/models/index.model";
import { ResponseHandler } from "@/ext/response";
import { Sanitizer } from "@/ext/sanitize";
import type { Request, Response } from "express";


declare module "express-serve-static-core" {
    interface Response {
        logger: typeof logger;
        handler: ResponseHandler;
        sanitizer: Sanitizer;
        models: typeof models;
    }
}

export default async function middleware(req: Request, res: Response, next: e.NextFunction) {
    req.app.use(cors());
    req.app.use(e.json());
    req.app.use(cookieParser());
    res.logger = logger;
    res.handler = new ResponseHandler();
    res.sanitizer = Sanitizer;
    res.models = models;
    next();
}