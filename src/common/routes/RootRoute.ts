import { Application, Request, Response } from 'express';
import { BaseRoute } from './BaseRoute';

export default class ListingRoute extends BaseRoute {
    constructor(expressApp: Application) {
        super(expressApp, 'RootRoute');
    }

    registerRoutes() {
        this.app.route('/').get((_: Request, res: Response) => res.status(200).send('Heartbeat OK'));
    }
}