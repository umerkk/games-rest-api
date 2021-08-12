import Logger from '../../../utils/Logger';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import GameEventsDAL from '../dal/GameEventsDAL';
import GameEvent from '../types/GameEvent';

/**
 * Controller class for the GameEvents listing endpoints.
 */
export default class GameEventsController {
    /**
     * Perform a wildcard select query on the database and returns the data based on the Limit & Skip parameters.
     * If parameters are not defined, a default value is used.
     * @param req - Request object of the incoming HTTP request
     * @param res - Response object of the incoming HTTP request
     * @returns - Array of GameEvents objects
     *          - Error object
     */
    public static async getAllListings(req: Request, res: Response): Promise<Response<GameEvent[] | string> | undefined> {
        try {
            validationResult(req).throw();
            const {limit, skip} = req.query;
            const result = await GameEventsDAL.getAll(Number(limit) || 5, Number(skip) || 0);
            res.json(result);
        } catch (err) {
            return res.status(500).json(`Error: ${JSON.stringify(err)}}`)
        }
    }

    /**
     * Select a single item from the database against the provided ID.
     * This function will atmost return one GameEvent object.
     * @param req - Request object of the incoming HTTP request
     * @param res - Response object of the incoming HTTP request
     * @returns - GameEvents object.
     *          - Error object
     */
    public static async getListingById(req: Request, res: Response): Promise<Response<GameEvent | string> | undefined> {
        try {
            validationResult(req).throw();
            const result = await GameEventsDAL.getOne(req.params.id as string);
            res.json(result);
        } catch (err) {
            return res.status(500).json(`Error: ${JSON.stringify(err)}}`)
        }
    }

    /**
     * Add a new item into the GameEvent listing database.
     * @param req - Request object of the incoming HTTP request.
     *              The body contains the GameEvent object (Already validated by the validation layer)
     * @param res - Response object of the incoming HTTP request
     * @returns - General success response
     *          - Error object
     */
    public static async addListing(req: Request, res: Response): Promise<Response<string> | undefined> {
        try {
            validationResult(req).throw();
            const itemToAdd = req.body as GameEvent;
            await GameEventsDAL.addNewEvent(itemToAdd);
            res.status(200).json({status: 'success'});
        } catch (err) {
            return res.status(500).json(`Error: ${JSON.stringify(err)}}`)
        }
    }

    /**
     * Delete an item from the GameEvent listing database.
     * @param req - Request object of the incoming HTTP request.
     *              The parameter contains the Mongo.ObjectID (primary key) that needs to be deleted.
     * @param res - Response object of the incoming HTTP request
     * @returns - General success response
     *          - Error object
     */
    public static async deleteListing(req: Request, res: Response): Promise<Response<string> | undefined> {
        try {
            validationResult(req).throw();
            const result = await GameEventsDAL.deleteEvent(req.params.id as string);
            if(!result) {
                throw new Error('Document not found');
            }
            res.status(200).json({status: 'success'});
        } catch (err) {
            return res.status(500).json(`Error: ${JSON.stringify(err)}}`)
        }
    }
}