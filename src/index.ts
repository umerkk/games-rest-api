import * as http from 'http';
import Express, { NextFunction } from 'express';
import Cors from 'cors';
import Helmet from 'helmet';
import Compression from 'compression';
import Logger from './utils/Logger'
import ApplicationRoutes from './common/routes';
import { BaseRoute } from './common/routes/BaseRoute';
import DatabaseAdapter from './common/database/DatabaseAdapter';
import { LoggingMiddleware } from './middlewares/LoggingMiddleware';

// Core components instantiation
const APP = Express();
const SERVER: http.Server = http.createServer(APP);
const PORT = 8080; // default port to listen

(async () => {
    try {
        // Express Middlewars

        // Enable CORS for all origins - In prod, this needs to be configured with strict URLs.
        APP.use(Cors({
            methods: ['GET','POST'],
        }));
        APP.use(LoggingMiddleware);
        APP.use(Helmet());
        APP.use(Compression());
        APP.use(Express.json());

        // Bootstrapping sequence
        ApplicationRoutes.init(APP);
        await DatabaseAdapter.init();

        // start the Express server
        SERVER.listen(PORT, () => {
            ApplicationRoutes.appRoutes.forEach((route: BaseRoute) => Logger.debug(`Route added for ${route.routeName}`));
            Logger.info(`server started at http://localhost:${PORT}`);
        });
    } catch (e) {
        Logger.info(`Error occured while starting the server ${e}`);
    }
})();