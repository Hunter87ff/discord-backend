import e from 'express';
import { appConfig } from '@/config';
import connectDB from '@/ext/db';
import {logger} from "@/ext/logger";
import routes from '@routes/router';
import middleware from '@middlewares/v1/index.midleware';

export default class DiscordBackendApp {
    public app: e.Application;

    constructor(){
        this.app = e();
        this.app.use(e.json());
        this.app.use(middleware)
        this.app.use("/", routes)
        this.app.get("/t", (req, res) => {
            res.send("Hello, this is Discord Backend API!");
        });
    }

    async start(){
        this.app.listen(appConfig.port, async ()=>{
            await connectDB();
            logger.info(`Server started at : ${appConfig.endpoint}`);
        })
    }
}