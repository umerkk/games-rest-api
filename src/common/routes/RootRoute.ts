import { Application, Request, Response, static as expressStatic } from 'express';
import path from 'path';
import { BaseRoute } from './BaseRoute';

export default class ListingRoute extends BaseRoute {
    constructor(expressApp: Application) {
        super(expressApp, 'RootRoute');
    }

    registerRoutes() {
        this.app.use(expressStatic(path.resolve('./') + '/build/renderer'));
        this.app.route('/').get((_: Request, res: Response) => res.status(200).send('Heartbeat OK'));
        this.app.route('/ui').get((_: Request, res: Response) => res.sendFile(path.resolve('./' + '/build/renderer/index.html')));
    }
}