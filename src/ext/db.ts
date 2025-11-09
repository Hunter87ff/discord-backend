import { appConfig } from "@/config";
import {logger} from "./logger"
import mongoose from "mongoose";


async function connectDB(uri: string=appConfig.mongoUri) {
    try{
        await mongoose.connect(uri);
        logger.info("Connected to MongoDB successfully");
    }catch(err){
        logger.error("Failed to connect to MongoDB", err);
        process.exit(1);
    }
}

export default connectDB;