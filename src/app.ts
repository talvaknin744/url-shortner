import express from "express";
import 'express-async-error';
import { applyMiddleware, applyRoutes} from './utils';
import middleware from './middleware';
import errorHandlers from './middleware/errorHandlers';
import routes from './services';
import {container} from './container';

import {ILogger} from "./container";

const logger: ILogger = container.resolve("logger")

process.on("uncaughtException", e => {
    logger.error({
        message: "uncaughtException",
        extra: e
    })
    process.exit(1)
})

process.on("unhandledRejection", e => {
    logger.error({
        message: "unhandledRejection",
        extra: e
    })
    process.exit(1)
})

const router = express();
applyMiddleware(middleware, router);
applyRoutes(routes, router);
applyMiddleware(errorHandlers, router);


export default router;

