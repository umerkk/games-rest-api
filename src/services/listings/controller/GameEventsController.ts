import Logger from '../../../utils/Logger';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import GameEventsDAL from '../dal/GameEventsDAL';
import GameEvent from '../types/GameEvent';

export default class GameEventsController {
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

    public static async getListingById(req: Request, res: Response): Promise<Response<GameEvent | string> | undefined> {
        try {
            validationResult(req).throw();
            const result = await GameEventsDAL.getOne(req.params.id as string);
            res.json(result);
        } catch (err) {
            return res.status(500).json(`Error: ${JSON.stringify(err)}}`)
        }
    }

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