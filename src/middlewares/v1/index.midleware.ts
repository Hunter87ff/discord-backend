import e from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import Helper from "@/utils/helper";
import { logger } from "@/ext/logger";
import { models} from "@/models/index.model";
import { ResponseHandler } from "@/ext/response";
import { Sanitizer } from "@/ext/sanitize";
import type { Request, Response } from "express";


declare module "express-serve-static-core" {
    interface Response {
        logger: typeof logger;
        sanitizer: Sanitizer;
        models: typeof models;
        helper: typeof Helper;
        handler: typeof ResponseHandler;
    }
}

async function init(req : Request, res: Response, next: e.NextFunction) {
    res.logger = logger;
    res.models = models;
    res.helper = Helper;
    res.sanitizer = Sanitizer;
    res.handler = ResponseHandler;
    next();
}


export default async function middleware(app : e.Application) {
    app.use(init);
    app.use(cors());
    app.use(e.json());
    app.use(cookieParser());
}