import Logger from '../utils/Logger';
import { RequestHandler } from 'express';

/**
 * Custom logging middleware for Express. It uses the same Logging instance of the application and log the incoming requests in ~APACHE style.
 * @param req Request object of the incoming HTTP request
 * @param __ Response object of the incoming HTTP request
 * @param next Next function in the chain.
 */
export const LoggingMiddleware: RequestHandler = (req, __, next) => {
    Logger.info(`HTTP ${req.method} ${req.url}`)
    next();
};