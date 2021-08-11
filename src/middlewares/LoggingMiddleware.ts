import Logger from '../utils/Logger';
import { RequestHandler } from 'express';
export const LoggingMiddleware: RequestHandler = (req, __, next) => {
    Logger.info(`HTTP ${req.method} ${req.url}`)
    next();
};