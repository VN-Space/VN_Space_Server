import mongoose from "mongoose";
import { logger } from "../configs";
import { BaseController } from "../common";

export class MongooseService extends BaseController{
    private count = 0;
    constructor() {
        super()
    }
    
    public connectToDBWithRetry = (mongoURL: string) => {
        mongoose
            .connect(mongoURL)
            .then(() => {
                logger.info('[MongoDB] Connected to database system.');
            })
            .catch((err) => {
                const retrySeconds = 5;
                logger.error(
                    `[MongoDB] Cannot connect to the database system. (will retry #${++this
                        .count} after ${retrySeconds} seconds):`,
                    err
                );
                setTimeout(() => this.connectToDBWithRetry(mongoURL), retrySeconds * 1000);
            });
    };
}