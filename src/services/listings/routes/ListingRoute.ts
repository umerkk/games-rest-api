import { Application, Request, Response } from 'express';
import { BaseRoute } from '../../../common/routes/BaseRoute';
import GameEventsController from '../controller/GameEventsController';
import {addGameEventValidator, getAllValidator, getByIdValidator} from '../validator/GameEventsValidator'

export default class ListingRoute extends BaseRoute {
    constructor(expressApp: Application) {
        super(expressApp, 'ListingRoute');
    }

    /**
     * HTTP endpoints & their handlers.
     * Each endpoint must first pass the Validation defined for each endpoint.
     * Then only the request is passed to its controller.
     */
    registerRoutes() {
        this.app.route('/games')
        .get(getAllValidator, GameEventsController.getAllListings)
        .post(addGameEventValidator, GameEventsController.addListing);

        this.app.route('/games/:id')
        .get(getByIdValidator, GameEventsController.getListingById)
        .delete(getByIdValidator, GameEventsController.deleteListing);

    }
}